import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get('/', UserControllers.getUsers);

router.get('/:userId', UserControllers.getUserById);

router.post('/', UserControllers.createUser);

router.put('/:userId', UserControllers.updateUser);

router.delete('/:userId', UserControllers.deleteUser);

router.put('/:userId/orders', UserControllers.addOrder);

router.get('/:userId/orders', UserControllers.getOrdersByUser);

router.get('/:userId/orders/total-price', UserControllers.getTotalPrice);

export const UserRoutes = router;
