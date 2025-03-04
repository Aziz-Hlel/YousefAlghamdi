import express from 'express';
import { register, test } from '../Controllers/user.controller';





const userRouter = express.Router();


userRouter.post('/register', register);
userRouter.get('/a', test);



export default userRouter;
