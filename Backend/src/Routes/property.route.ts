import express from 'express';
import { approveProperty, createProperty, getProperty, getUserProperties, listProperties } from '../Controllers/property.controller';
import protect, { adminAuth } from '../Middlewares/auth.middleware';






const propertyRouter = express.Router();


propertyRouter.get('/my-properties', protect, getUserProperties);

propertyRouter.post('/', protect, createProperty);
propertyRouter.get('/', listProperties);
propertyRouter.get('/:propertyId', getProperty);

propertyRouter.post('/approve',adminAuth,approveProperty)

export default propertyRouter;

