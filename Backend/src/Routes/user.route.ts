import express from 'express';
import { getUser, login, logOut, register, test, updateAgentOfClient, whoAmI } from '../Controllers/user.controller';
import protect, { adminAuth } from '../Middlewares/auth.middleware';





const userRouter = express.Router();


userRouter.get('/', protect, whoAmI)
userRouter.post('/register', register);
userRouter.get('/test', protect, test);
userRouter.post('/login', login);

userRouter.get('/:userId', adminAuth, getUser);
userRouter.patch('/update-agent', adminAuth, updateAgentOfClient)

userRouter.post('/log-out', logOut);

export default userRouter;
