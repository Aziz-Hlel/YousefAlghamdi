import express from 'express';
import { createProperty, getProperty, getUserProperties, listProperties } from '../Controllers/property.controller';
import protect from '../Middlewares/auth.middleware';






const propertyRouter = express.Router();


propertyRouter.get('/my-properties', protect, getUserProperties);

propertyRouter.post('/', protect, createProperty);
propertyRouter.get('/', listProperties);
propertyRouter.get('/:propertyId', getProperty);


export default propertyRouter;

