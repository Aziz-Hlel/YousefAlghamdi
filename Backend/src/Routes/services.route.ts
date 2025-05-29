
import express from 'express';
import { contactUsEmail, propertyEmail } from '../Controllers/services.controller';





const servicesRouter = express.Router();


servicesRouter.post('/email/contact-us', contactUsEmail);
servicesRouter.post('/email/property', propertyEmail);


export default servicesRouter;