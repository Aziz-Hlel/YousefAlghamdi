import express from 'express';
import { approveProperty, declinePropertyChanges, createProperty, deleteProperty, getPendingProperties, getProperty, getUserProperties, listProperties, updateProperty, getUnavailableProperties, unavailable, getAllProperties, featureProperty, getFeaturedProperties } from '../Controllers/property.controller';
import { adminAuth, adminOrAgentAuth } from '../Middlewares/auth.middleware';
import { authenticateToken } from '../services/auth/authenticateToken';






const propertyRouter = express.Router();

propertyRouter.get('/featured-properties', getFeaturedProperties);
propertyRouter.get('/my-properties', authenticateToken, getUserProperties);
propertyRouter.get('/pending-properties', authenticateToken, adminOrAgentAuth, getPendingProperties);
propertyRouter.get('/unavailable-properties', authenticateToken, adminOrAgentAuth, getUnavailableProperties);
propertyRouter.get('/all-properties', authenticateToken, adminAuth, getAllProperties);



propertyRouter.put('/approve/:propertyId', authenticateToken, adminOrAgentAuth, approveProperty);
propertyRouter.get('/decline/:propertyId', authenticateToken, declinePropertyChanges);
propertyRouter.patch('/unavailable/:propertyId', authenticateToken, unavailable);
propertyRouter.patch('/feature/:propertyId', authenticateToken, adminAuth, featureProperty);


propertyRouter.post('/', authenticateToken, createProperty);
propertyRouter.get('/', listProperties);



propertyRouter.patch('/:propertyId', authenticateToken, updateProperty);
propertyRouter.get('/:propertyId', getProperty);
propertyRouter.delete('/:propertyId', authenticateToken, deleteProperty);

export default propertyRouter;

