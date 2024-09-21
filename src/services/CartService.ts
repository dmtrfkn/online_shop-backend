import { AppDataSource } from '../data-source';
import { Cart } from '../entity/Cart';
import { User } from '../entity/User';
import { Product } from '../entity/Product';

export class CartService {
  // Получение корзины пользователя по его идентификатору
  static async getCartByUserId(userId: number) {
    const cartRepository = AppDataSource.getRepository(Cart);

    // Находим корзину пользователя
    const cart = await cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['products'], // Загружаем продукты в корзине
    });

    if (!cart) {
      throw new Error('Корзина не найдена');
    }

    return cart;
  }

  // // Добавление продукта в корзину пользователя
  static async addProductToCart(userId: number, productId: number) {
    const cartRepository = AppDataSource.getRepository(Cart);
    const userRepository = AppDataSource.getRepository(User);
    const productRepository = AppDataSource.getRepository(Product);

    // Находим пользователя и продукт
    const user = await userRepository.findOneBy({ id: userId });
    const product = await productRepository.findOneBy({ id: productId });

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    if (!product) {
      throw new Error('Продукт не найден');
    }

    // Находим или создаем корзину пользователя
    let cart = await cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['products'],
    });

    if (!cart) {
      // Если корзина не найдена, создаем новую
      cart = new Cart();
      cart.user = user;
      cart.products = [product]; // Добавляем продукт в новую корзину
      await cartRepository.save(cart);
      return cart;
    } else {
      // Если корзина уже существует, добавляем продукт в существующую корзину
      if (!cart.products.some((p) => p.id === product.id)) {
        cart.products.push(product); // Добавляем продукт только если его нет в корзине
        await cartRepository.save(cart);
      }
      return cart; // Возвращаем обновленную корзину
    }
  }

  // Удаление продукта из корзины пользователя
  static async removeProductFromCart(userId: number, productId: number) {
    const cartRepository = AppDataSource.getRepository(Cart);

    // Находим корзину пользователя
    const cart = await cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['products'], // Загружаем продукты в корзине
    });

    if (!cart) {
      throw new Error('Корзина не найдена');
    }

    // Удаляем продукт из корзины
    cart.products = cart.products.filter((product) => product.id !== productId);

    await cartRepository.save(cart); // Сохраняем изменения

    return cart; // Возвращаем обновленную корзину
  }

  // Очистка корзины пользователя
  static async clearCart(userId: number) {
    const cartRepository = AppDataSource.getRepository(Cart);

    // Находим корзину пользователя
    const cart = await cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['products'], // Загружаем продукты в корзине
    });

    if (!cart) {
      throw new Error('Корзина не найдена');
    }

    // Очищаем продукты в корзине
    cart.products = [];

    await cartRepository.save(cart); // Сохраняем изменения

    return cart; // Возвращаем очищенную корзину
  }
}
