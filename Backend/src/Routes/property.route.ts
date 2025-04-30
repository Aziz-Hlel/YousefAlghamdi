import express from 'express';
import { approveProperty, cancelUpdateProperty, createProperty, deleteProperty, getPendingProperties, getProperty, getUserProperties, listProperties, updateProperty } from '../Controllers/property.controller';
import protect, { adminOrAgentAuth } from '../Middlewares/auth.middleware';






const propertyRouter = express.Router();


propertyRouter.get('/my-properties', protect, getUserProperties);
propertyRouter.get('/pending-properties', adminOrAgentAuth, getPendingProperties);

propertyRouter.put('/approve/:propertyId', adminOrAgentAuth, approveProperty)
propertyRouter.get('/decline/:propertyId', protect, cancelUpdateProperty);




propertyRouter.post('/', protect, createProperty);
propertyRouter.get('/', listProperties);

propertyRouter.patch('/:propertyId', protect, updateProperty);
propertyRouter.get('/:propertyId', getProperty);
propertyRouter.delete('/:propertyId', protect, deleteProperty);

export default propertyRouter;

