
import express from 'express';
import { createEmail } from '../Controllers/services.controller';





const servicesRouter = express.Router();


servicesRouter.post('/email', createEmail);



export default servicesRouter;