import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class CommentController {
  static async createComment(req: Request, res: Response) {
    const { productId } = req.params;
    const userId = req.body.userId;
    const { content } = req.body;

    try {
      const newComment = await ProductService.createComment(
        Number(productId),
        Number(userId),
        content,
      );
      res.status(201).json(newComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
