import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class CartController {
  static async addToCart(req: Request, res: Response) {
    const { productId, quantity } = req.body;
    const userId = req.params.userId;

    try {
      const cartItem = await ProductService.addToCart(
        Number(userId),
        Number(productId),
        Number(quantity),
      );
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getUserCart(req: Request, res: Response) {
    const userId = req.params.userId;

    try {
      const cartItems = await ProductService.getUserCart(Number(userId));
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
