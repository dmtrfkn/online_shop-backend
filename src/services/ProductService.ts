import { PrismaClient, Product, Comment } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductService {
  static async getProductById(id: number) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { comments: true },
    });

    if (!product) {
      throw new Error('Продукт не найден');
    }

    return product;
  }

  static async getAllProducts() {
    return await prisma.product.findMany({
      include: { comments: true },
    });
  }

  static async createProduct(productData: Partial<Product>) {
    const product = await prisma.product.create({
      data: {
        title: productData.title,
        desc: productData.desc,
        image: productData.image,
      },
    });

    return product;
  }

  static async updateProduct(id: number, productData: Partial<Product>) {
    const product = await prisma.product.update({
      where: { id },
      data: {
        title: productData.title,
        desc: productData.desc,
        image: productData.image,
      },
    });

    return product;
  }

  static async deleteProduct(id: number) {
    const product = await prisma.product.delete({
      where: { id },
    });

    return product;
  }

  static async createComment(productId: number, userId: number, content: string) {
    const comment = await prisma.comment.create({
      data: {
        content,
        userId,
        productId,
      },
    });

    return comment;
  }

  static async addToCart(userId: number, productId: number, quantity: number) {
    const existingCartItem = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingCartItem) {
      return await prisma.cart.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      return await prisma.cart.create({
        data: {
          userId,
          productId,
          quantity,
        },
      });
    }
  }

  static async getUserCart(userId: number) {
    return await prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });
  }

  static async addToWishlist(userId: number, productId: number) {
    const existingWishlistItem = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingWishlistItem) {
      throw new Error('Продукт уже в корзине');
    } else {
      return await prisma.wishlist.create({
        data: {
          userId,
          productId,
        },
      });
    }
  }

  static async getUserWishlist(userId: number) {
    return await prisma.wishlist.findMany({
      where: { userId },
      include: { product: true },
    });
  }

  static async removeFromWishlist(userId: number, productId: number) {
    return await prisma.wishlist.deleteMany({
      where: {
        userId,
        productId,
      },
    });
  }
}
