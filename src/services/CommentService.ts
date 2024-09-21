import { AppDataSource } from '../data-source';
import { Comment } from '../entity/Comment';
import { User } from '../entity/User';
import { Product } from '../entity/Product';

export class CommentService {
  static async getCommentsForProduct(productId: number) {
    const commentRepository = AppDataSource.getRepository(Comment);
    return await commentRepository.find({
      where: { product: { id: productId } },
      relations: ['user', 'product'], // Загружаем связанные данные о пользователе и продукте
    });
  }

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
