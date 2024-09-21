import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
  static async createProduct(req: Request, res: Response) {
    try {
      const productData = req.body; // Данные о продукте передаются в теле запроса
      const newProduct = await ProductService.createProduct(productData);

      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await ProductService.deleteProduct(Number(id));

      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Дополнительные методы для получения продуктов можно добавить здесь
}
