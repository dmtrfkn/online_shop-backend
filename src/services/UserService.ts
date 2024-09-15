import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export class UserService {
  static async getAllUsers() {
    try {
      const userRepository = AppDataSource.getRepository(User);
      return await userRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserById(id: number) {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOneBy({ id });
  }

  static async createUser(userData: Partial<User>) {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(userData);
    return await userRepository.save(user);
  }

  static async updateUser(id: number, userData: Partial<User>) {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.update(id, userData);
  }

  static async deleteUser(id: number) {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.delete(id);
  }
}
