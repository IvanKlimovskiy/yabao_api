import { Router } from 'express';
import { createUser, getCurrentUser, getUsers } from '../../controllers/users';

const userRouter = Router();

userRouter.post('/users', createUser);
userRouter.get('/users', getUsers);
export default userRouter;
