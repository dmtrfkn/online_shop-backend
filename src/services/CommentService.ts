import { AppDataSource } from '../data-source';
import { Comment } from '../entity/Comment';
import { User } from '../entity/User';
import { Product } from '../entity/Product';

export class CommentService {
  // static async createComment(commentData: Partial<Comment>, userId: number, productId: number) {
  //   const commentRepository = AppDataSource.getRepository(Comment);
  //   const userRepository = AppDataSource.getRepository(User);
  //   const productRepository = AppDataSource.getRepository(Product);

  //   // Проверяем существование пользователя и продукта
  //   const user = await userRepository.findOneBy({ id: userId });
  //   const product = await productRepository.findOneBy({ id: productId });

  //   if (!user) {
  //     throw new Error('Пользователь не найден');
  //   }
  //   if (!product) {
  //     throw new Error('Продукт не найден');
  //   }

  //   // Создаем комментарий без установки связей напрямую
  //   const comment = commentRepository.create({
  //     ...commentData,
  //     user: { id: userId }, // Устанавливаем только идентификатор пользователя
  //     product: { id: productId }, // Устанавливаем только идентификатор продукта
  //   });

  //   return await commentRepository.save(comment);
  // }

  static async deleteComment(id: number) {
    const commentRepository = AppDataSource.getRepository(Comment);
    const result = await commentRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Комментарий не найден');
    }
  }

  static async addCommentToProduct(
    userId: number,
    productId: number,
    commentData: Partial<Comment>,
  ) {
    const userRepository = AppDataSource.getRepository(User);
    const productRepository = AppDataSource.getRepository(Product);
    const commentRepository = AppDataSource.getRepository(Comment);

    // Проверяем существование пользователя
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    // Проверяем существование продукта
    const product = await productRepository.findOneBy({ id: productId });
    if (!product) {
      throw new Error('Продукт не найден');
    }

    // Создаем новый комментарий
    const comment = commentRepository.create({
      ...commentData,
      user: user, // Устанавливаем связь с пользователем
      product: product, // Устанавливаем связь с продуктом
    });

    // Сохраняем комментарий в базе данных
    return await commentRepository.save(comment);
  }
}
