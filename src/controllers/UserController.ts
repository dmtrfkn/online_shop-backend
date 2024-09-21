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

  static async getUserByName(req: Request, res: Response) {
    try {
      const user = await UserService.getUserByName(req.body.login, req.body.pwd);
      res.json(user);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const user = await UserService.createUser({ ...req.body, ageInDogYears: req.body.age * 7 });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
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
