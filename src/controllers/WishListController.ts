import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class WishlistController {
  static async addToWishlist(req: Request, res: Response) {
    const { productId } = req.body;
    const userId = req.params.userId;

    try {
      const wishlistItem = await ProductService.addToWishlist(+userId, productId);
      res.status(201).json(wishlistItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getUserWishlist(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const wishlistItems = await ProductService.getUserWishlist(Number(userId));
      res.status(200).json(wishlistItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async removeFromWishlist(req: Request, res: Response) {
    const { userId, productId } = req.params;

    try {
      await ProductService.removeFromWishlist(Number(userId), Number(productId));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
