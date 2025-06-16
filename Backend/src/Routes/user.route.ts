import express from 'express';
import { changePassword, deleteUser, getUser, login, logOut, me, refresh, register, requestResetPassword, resetPassword, test, updateAgentOfClient, updateUser } from '../Controllers/user.controller';
import { adminAuth, adminOrAgentAuth } from '../Middlewares/auth.middleware';
import { authenticateToken } from '../services/auth/authenticateToken';





const userRouter = express.Router();


userRouter.get('/me', authenticateToken, me);
userRouter.post('/register', register);
userRouter.get('/test', authenticateToken, test);
userRouter.post('/login', login);
userRouter.post('/refresh', refresh);

userRouter.post('/request-reset-password', requestResetPassword);
userRouter.post('/reset-password', resetPassword);


userRouter.get('/:userId', authenticateToken, adminOrAgentAuth, getUser);
userRouter.patch('/update-agent', authenticateToken, adminAuth, updateAgentOfClient);
userRouter.patch('/update-user/', authenticateToken, updateUser);
userRouter.delete('/delete-user', authenticateToken, deleteUser);

userRouter.post('/log-out', logOut);

userRouter.patch('/change-password', authenticateToken, changePassword)




export default userRouter;
