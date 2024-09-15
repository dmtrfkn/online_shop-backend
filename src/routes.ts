import { Router } from 'express';
import { UserController } from './controllers/UserController';

const router = Router();

router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

// Добавьте маршруты для других модулей аналогично

export default router;
