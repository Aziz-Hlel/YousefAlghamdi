import express from 'express';
import { changePassword, getUser, login, logOut, register, test, updateAgentOfClient, updateUser, whoAmI } from '../Controllers/user.controller';
import protect, { adminAuth, adminOrAgentAuth } from '../Middlewares/auth.middleware';
import { requireAuth } from '../Middlewares/auth2.middleware';





const userRouter = express.Router();


userRouter.get('/', protect, whoAmI)
userRouter.post('/register', register);
userRouter.get('/test', test);
userRouter.post('/login', login);

userRouter.get('/:userId', requireAuth, adminOrAgentAuth, getUser);
userRouter.patch('/update-agent', requireAuth, adminAuth, updateAgentOfClient)
userRouter.patch('/update-user/', protect, updateUser);
userRouter.post('/log-out', logOut);

userRouter.patch('/change-password', protect, changePassword)
export default userRouter;
