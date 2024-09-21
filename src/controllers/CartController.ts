import { Request, Response } from 'express';
import { CartService } from '../services/CartService';

export class CartController {
  static async getCartByUserId(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const cart = await CartService.getCartByUserId(Number(userId));
      res.json(cart);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async addProductToCart(req: Request, res: Response) {
    const { userId, productId } = req.params;
    try {
      const updatedCart = await CartService.addProductToCart(Number(userId), Number(productId));
      res.json(updatedCart);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async removeProductFromCart(req: Request, res: Response) {
    const { userId, productId } = req.params;
    try {
      const updatedCart = await CartService.removeProductFromCart(
        Number(userId),
        Number(productId),
      );
      res.json(updatedCart);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async clearCart(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const clearedCart = await CartService.clearCart(Number(userId));
      res.json(clearedCart);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}
