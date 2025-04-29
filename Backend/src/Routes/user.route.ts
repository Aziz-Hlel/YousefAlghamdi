import express from 'express';
import { changePassword, getUser, login, logOut, register, test, updateAgentOfClient, updateUser, whoAmI } from '../Controllers/user.controller';
import protect, { adminAuth } from '../Middlewares/auth.middleware';





const userRouter = express.Router();


userRouter.get('/', protect, whoAmI)
userRouter.post('/register', register);
userRouter.get('/test', protect, test);
userRouter.post('/login', login);

userRouter.get('/:userId', adminAuth, getUser);
userRouter.patch('/update-agent', adminAuth, updateAgentOfClient)
userRouter.patch('/update-user/', protect, updateUser);
userRouter.post('/log-out', logOut);

userRouter.patch('/change-password', protect, changePassword)
export default userRouter;
