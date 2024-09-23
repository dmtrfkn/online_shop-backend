import express from 'express';
import { UserController } from './controllers/UserController';
import { WishlistController } from './controllers/WishListController';
import { CartController } from './controllers/CartController';
import { CommentController } from './controllers/CommentController';
import { ProductController } from './controllers/ProductController';

const router = express.Router();

// Пользователи
router.get('/users/:id', UserController.getUserById);
router.post('/login', UserController.getUserByName);
router.post('/registration', UserController.createUser);

// Список желаемого
router.post('/users/:userId/wishlist', WishlistController.addToWishlist);
router.get('/users/:userId/wishlist', WishlistController.getUserWishlist);

// Корзина
router.post('/users/:userId/cart', CartController.addToCart);
router.get('/users/:userId/cart', CartController.getUserCart);

// Комментарии
router.post('/products/:productId/comments', CommentController.createComment);

// Продукты
router.post('/products', ProductController.createProduct);
router.delete('/products/:id', ProductController.deleteProduct);
router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);

export default router;
