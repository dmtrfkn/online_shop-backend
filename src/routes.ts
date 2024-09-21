import express from 'express';
import { UserController } from './controllers/UserController';
import { WishListController } from './controllers/WishListController';
import { CartController } from './controllers/CartController';
import { CommentController } from './controllers/CommentController';
import { ProductController } from './controllers/ProductController';

const router = express.Router();

// Пользователи
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/login', UserController.getUserByName);
router.post('/registration', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

// Список желаемого
router.get('/users/:userId/wishlist', WishListController.getWishListByUserId);
router.post('/users/:userId/wishlist/products/:productId', WishListController.addProductToWishList);
router.delete(
  '/users/:userId/wishlist/products/:productId',
  WishListController.removeProductFromWishList,
);
router.delete('/users/:userId/wishlist', WishListController.clearWishList);

// Корзина
router.get('/users/:userId/cart', CartController.getCartByUserId);
router.post('/users/:userId/cart/products/:productId', CartController.addProductToCart);
// router.delete('/users/:userId/cart/products/:productId', CartController.removeProductFromCart);
// router.delete('/users/:userId/cart', CartController.clearCart);

// Комментарии
router.post('/users/:userId/products/:productId/comments', CommentController.addCommentToProduct);
router.delete('/comments/:id', CommentController.deleteComment);

// Продукты
router.post('/products', ProductController.createProduct);
router.delete('/products/:id', ProductController.deleteProduct);
router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);

export default router;
