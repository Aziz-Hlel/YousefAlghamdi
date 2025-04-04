import express from 'express';
import { login, register, test, whoAmI } from '../Controllers/user.controller';
import protect from '../Middlewares/auth.middleware';





const userRouter = express.Router();


userRouter.get('/', protect, whoAmI)
userRouter.post('/register', register);
userRouter.get('/test', protect, test);
userRouter.post('/login', login);


export default userRouter;
