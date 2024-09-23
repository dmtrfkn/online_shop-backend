import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
  static async getUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    return user;
  }

  static async getUserByName(login: string, pwd: string) {
    const user = await prisma.user.findFirst({
      where: { login },
    });

    if (user) {
      if (pwd === user.password) {
        return user;
      } else {
        throw new Error('Неверный пароль');
      }
    } else {
      throw new Error('Неверный логин');
    }
  }

  static async createUser(userData: Partial<User>) {
    const user = await prisma.user.create({
      data: {
        login: userData.login,
        password: userData.password,
        age: userData.age,
        ageInDogYears: userData.age * 7,
      },
    });

    return user;
  }
}
