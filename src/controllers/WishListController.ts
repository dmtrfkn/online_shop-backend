import { Request, Response } from 'express';
import { WishListService } from '../services/WishListService';

export class WishListController {
  static async getWishListByUserId(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const wishList = await WishListService.getWishListByUserId(Number(userId));
      res.json(wishList);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async addProductToWishList(req: Request, res: Response) {
    const { userId, productId } = req.params;
    try {
      const updatedWishList = await WishListService.addProductToWishList(
        Number(userId),
        Number(productId),
      );
      res.json(updatedWishList);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async removeProductFromWishList(req: Request, res: Response) {
    const { userId, productId } = req.params;
    try {
      const updatedWishList = await WishListService.removeProductFromWishList(
        Number(userId),
        Number(productId),
      );
      res.json(updatedWishList);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async clearWishList(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const clearedWishList = await WishListService.clearWishList(Number(userId));
      res.json(clearedWishList);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}
