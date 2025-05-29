import express from 'express';
import { changePassword, deleteUser, getUser, login, logOut, me, refresh, register, requestResetPassword, test, updateAgentOfClient, updateUser, whoAmI } from '../Controllers/user.controller';
import protect, { adminAuth, adminOrAgentAuth } from '../Middlewares/auth.middleware';
import { requireAuth } from '../Middlewares/auth2.middleware';
import { authenticateToken } from '../services/auth/authenticateToken';





const userRouter = express.Router();


userRouter.get('/', authenticateToken, whoAmI);
userRouter.get('/me', authenticateToken, me);
userRouter.post('/register', register);
userRouter.get('/test', authenticateToken, test);
userRouter.post('/login', login);
userRouter.post('/refresh', refresh);

userRouter.post('/request-reset-password', requestResetPassword);

userRouter.get('/:userId', requireAuth, adminOrAgentAuth, getUser);
userRouter.patch('/update-agent', requireAuth, adminAuth, updateAgentOfClient)
userRouter.patch('/update-user/', authenticateToken, updateUser);
userRouter.delete('/delete-user', authenticateToken, deleteUser);

userRouter.post('/log-out', logOut);

userRouter.patch('/change-password', authenticateToken, changePassword)




export default userRouter;
