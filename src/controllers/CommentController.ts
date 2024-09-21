import { Request, Response } from 'express';
import { CommentService } from '../services/CommentService';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { Product } from '../entity/Product';
import { Comment } from '../entity/Comment';

export class CommentController {
  // static async addCommentToProduct(req: Request, res: Response) {
  //   const { userId, productId } = req.params;

  //   try {
  //     const commentData = req.body; // Предполагается, что данные комментария передаются в теле запроса
  //     const newComment = await CommentService.addCommentToProduct(
  //       Number(userId),
  //       Number(productId),
  //       commentData,
  //     );

  //     res.status(201).json(newComment);
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // }

  static async addCommentToProduct(req: Request, res: Response) {
    const userId = req.body.userId;
    const productId = req.body.productId;

    const userRepository = AppDataSource.getRepository(User);
    const productRepository = AppDataSource.getRepository(Product);
    const commentRepository = AppDataSource.getRepository(Comment);

    const user = await userRepository.findOneBy({ id: userId });
    const product = await productRepository.findOneBy({ id: productId });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (!product) {
      return res.status(404).json({ message: 'Продукт не найден' });
    }

    const comment = new Comment();
    comment.user = user;
    comment.product = product;

    await commentRepository.save(comment);
    return res.status(201).json(comment);
  }

  static async deleteComment(req: Request, res: Response) {
    const { id } = req.params; // Идентификатор комментария передается в параметрах

    try {
      await CommentService.deleteComment(Number(id)); // Вызываем метод удаления из CommentService
      res.status(204).send(); // Успешный ответ без содержимого
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}
