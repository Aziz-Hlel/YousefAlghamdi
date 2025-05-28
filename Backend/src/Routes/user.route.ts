import express from 'express';
import { changePassword, deleteUser, getUser, login, logOut, register, requestResetPassword, test, updateAgentOfClient, updateUser, whoAmI } from '../Controllers/user.controller';
import protect, { adminAuth, adminOrAgentAuth } from '../Middlewares/auth.middleware';
import { requireAuth } from '../Middlewares/auth2.middleware';





const userRouter = express.Router();


userRouter.get('/', protect, whoAmI)
userRouter.post('/register', register);
userRouter.get('/test', test);
userRouter.post('/login', login);
userRouter.post('/request-reset-password', requestResetPassword)

userRouter.get('/:userId', requireAuth, adminOrAgentAuth, getUser);
userRouter.patch('/update-agent', requireAuth, adminAuth, updateAgentOfClient)
userRouter.patch('/update-user/', protect, updateUser);
userRouter.delete('/delete-user', protect, deleteUser);

userRouter.post('/log-out', logOut);

userRouter.patch('/change-password', protect, changePassword)




export default userRouter;
