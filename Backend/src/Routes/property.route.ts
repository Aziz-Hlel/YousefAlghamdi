import express from 'express';
import { approveProperty, createProperty, getPendingProperties, getProperty, getUserProperties, listProperties } from '../Controllers/property.controller';
import protect, { adminAuth, adminOrAgentAuth } from '../Middlewares/auth.middleware';






const propertyRouter = express.Router();


propertyRouter.get('/my-properties', protect, getUserProperties);
propertyRouter.get('/pending-properties', adminOrAgentAuth, getPendingProperties);

propertyRouter.post('/', protect, createProperty);
propertyRouter.get('/', listProperties);
propertyRouter.get('/:propertyId', getProperty);

propertyRouter.post('/approve',adminOrAgentAuth,approveProperty)

export default propertyRouter;

