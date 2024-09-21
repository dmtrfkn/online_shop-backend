import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
  static async createProduct(req: Request, res: Response) {
    try {
      const productData = req.body;
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

  static async getAllProducts(req: Request, res: Response) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getProductById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const product = await ProductService.getProductById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async updateProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const productData = req.body;

    try {
      const updatedProduct = await ProductService.updateProduct(id, productData);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}
