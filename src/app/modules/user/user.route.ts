import express from 'express';
import { UserControllers } from './user.controller';
import { ValidateRequest } from '../../middlewares/validateRequest';
import { createUserValidationSchema, updateUserValidationSchema } from './user.validation';

const router = express.Router();

router.get('/', UserControllers.getUsers);

router.get('/:userId', UserControllers.getUserById);

router.post('/', ValidateRequest(createUserValidationSchema), UserControllers.createUser);

router.put('/:userId', ValidateRequest(updateUserValidationSchema), UserControllers.updateUser);

router.delete('/:userId', UserControllers.deleteUser);

export const UserRoutes = router;
