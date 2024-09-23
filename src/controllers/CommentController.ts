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

  static async getCommentsByProductId(req: Request, res: Response) {
    const productId = parseInt(req.params.id);

    try {
      const comments = await ProductService.getCommentsForProduct(productId);
      res.status(200).json(comments);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}
