import { Router } from 'express';
import {
  createUser,
  getUsers,
  activateEmail,
  getActivationLink,
  editName,
  toggleSubscribe,
} from '../../controllers/users';

const userRouter = Router();

userRouter.post('/users', createUser);
userRouter.get('/users', getUsers);
userRouter.post('/users/:id/subscribe', toggleSubscribe);
userRouter.patch('/users/:id/name', editName);
userRouter.post('/auth/activate/email', getActivationLink);
userRouter.get('/auth/activate/:link', activateEmail);

export default userRouter;
