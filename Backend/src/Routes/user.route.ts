import express from 'express';
import { getUser, login, register, test, updateAgent, whoAmI } from '../Controllers/user.controller';
import protect, { adminAuth } from '../Middlewares/auth.middleware';





const userRouter = express.Router();


userRouter.get('/', protect, whoAmI)
userRouter.post('/register', register);
userRouter.get('/test', protect, test);
userRouter.post('/login', login);

userRouter.get('/:userId', adminAuth, getUser);
userRouter.patch('/update-agent', adminAuth, updateAgent)


export default userRouter;
