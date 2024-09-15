import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    const users = await UserService.getAllUsers();
    res.json(users);
  }

  static async getUserById(req: Request, res: Response) {
    const user = await UserService.getUserById(Number(req.params.id));
    res.json(user);
  }

  static async createUser(req: Request, res: Response) {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  }

  static async updateUser(req: Request, res: Response) {
    await UserService.updateUser(Number(req.params.id), req.body);
    res.sendStatus(204);
  }

  static async deleteUser(req: Request, res: Response) {
    await UserService.deleteUser(Number(req.params.id));
    res.sendStatus(204);
  }
}
