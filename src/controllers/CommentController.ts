import { Request, Response } from 'express';
import { CommentService } from '../services/CommentService';

export class CommentController {
  static async addCommentToProduct(req: Request, res: Response) {
    const { userId, productId } = req.params;

    try {
      const commentData = req.body; // Предполагается, что данные комментария передаются в теле запроса
      const newComment = await CommentService.addCommentToProduct(
        Number(userId),
        Number(productId),
        commentData,
      );

      res.status(201).json(newComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
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
