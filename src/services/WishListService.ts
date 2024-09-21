import { AppDataSource } from '../data-source';
import { WishList } from '../entity/WishList';
import { User } from '../entity/User';
import { Product } from '../entity/Product';

export class WishListService {
  // Получение списка желаемого пользователя по его идентификатору
  static async getWishListByUserId(userId: number) {
    const wishListRepository = AppDataSource.getRepository(WishList);

    // Находим список желаемого пользователя
    const wishList = await wishListRepository.findOne({
      where: { user: { id: userId } },
      relations: ['products'], // Загружаем продукты в списке желаемого
    });

    if (!wishList) {
      throw new Error('Список желаемого не найден');
    }

    return wishList;
  }

  // Добавление продукта в список желаемого пользователя
  static async addProductToWishList(userId: number, productId: number) {
    const wishListRepository = AppDataSource.getRepository(WishList);
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

    // Находим или создаем список желаемого пользователя
    let wishList = await wishListRepository.findOne({
      where: { user: { id: userId } },
      relations: ['products'],
    });

    if (!wishList) {
      // Если список не найден, создаем новый
      wishList = new WishList();
      wishList.user = user;
      wishList.products = [product]; // Добавляем продукт в новый список желаемого
      await wishListRepository.save(wishList);
      return wishList;
    } else {
      // Если список уже существует, добавляем продукт в существующий список
      if (!wishList.products.some((p) => p.id === product.id)) {
        wishList.products.push(product); // Добавляем продукт только если его нет в списке
        await wishListRepository.save(wishList);
      }
      return wishList; // Возвращаем обновленный список желаемого
    }
  }

  // Удаление продукта из списка желаемого пользователя
  static async removeProductFromWishList(userId: number, productId: number) {
    const wishListRepository = AppDataSource.getRepository(WishList);

    // Находим список желаемого пользователя
    const wishList = await wishListRepository.findOne({
      where: { user: { id: userId } },
      relations: ['products'], // Загружаем продукты в списке желаемого
    });

    if (!wishList) {
      throw new Error('Список желаемого не найден');
    }

    // Удаляем продукт из списка желаемого
    wishList.products = wishList.products.filter((product) => product.id !== productId);

    await wishListRepository.save(wishList); // Сохраняем изменения

    return wishList; // Возвращаем обновленный список желаемого
  }

  // Очистка списка желаемого пользователя
  static async clearWishList(userId: number) {
    const wishListRepository = AppDataSource.getRepository(WishList);

    // Находим список желаемого пользователя
    const wishList = await wishListRepository.findOne({
      where: { user: { id: userId } },
      relations: ['products'], // Загружаем продукты в списке желаемого
    });

    if (!wishList) {
      throw new Error('Список желаемого не найден');
    }

    // Очищаем продукты в списке желаемого
    wishList.products = [];

    await wishListRepository.save(wishList); // Сохраняем изменения

    return wishList; // Возвращаем очищенный список желаемого
  }
}
