import express from 'express';
import { login, register, test } from '../Controllers/user.controller';





const userRouter = express.Router();


userRouter.post('/register', register);
userRouter.get('/test', test);
userRouter.post('/login', login);


export default userRouter;
