import express from 'express';
import { login, register, test } from '../Controllers/user.controller';
import protect from '../Middlewares/auth.middleware';





const userRouter = express.Router();


userRouter.post('/register', register);
userRouter.get('/test', protect, test);
userRouter.post('/login', login);


export default userRouter;
