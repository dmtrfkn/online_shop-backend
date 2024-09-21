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

  static async getAllProducts() {
    const productRepository = AppDataSource.getRepository(Product);
    return await productRepository.find({ relations: ['comments'] }); // Загружаем связанные комментарии
  }

  // Получение одного товара по ID с комментариями
  static async getProductById(id: number) {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({
      where: { id },
      relations: ['comments'], // Загружаем связанные комментарии
    });

    if (!product) {
      throw new Error('Продукт не найден');
    }

    return product;
  }
}
