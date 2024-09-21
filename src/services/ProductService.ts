import { AppDataSource } from '../data-source';
import { Product } from '../entity/Product';
import { Comment } from '../entity/Comment';
import { CommentService } from './CommentService'; // Импортируем CommentService

export class ProductService {
  static async createProduct(productData: Partial<Product>) {
    const productRepository = AppDataSource.getRepository(Product);

    // Создаем новый продукт
    const product = productRepository.create(productData);

    return await productRepository.save(product);
  }

  static async deleteProduct(id: number) {
    const productRepository = AppDataSource.getRepository(Product);
    const result = await productRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Продукт не найден');
    }
  }
}
