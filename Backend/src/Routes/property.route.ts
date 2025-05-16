import express from 'express';
import { approveProperty, declinePropertyChanges, createProperty, deleteProperty, getPendingProperties, getProperty, getUserProperties, listProperties, updateProperty, getUnavailableProperties, unavailable, getAllProperties, featureProperty, getFeaturedProperties } from '../Controllers/property.controller';
import protect, { adminAuth, adminOrAgentAuth } from '../Middlewares/auth.middleware';
import { requireAuth } from '../Middlewares/auth2.middleware';






const propertyRouter = express.Router();

propertyRouter.get('/featured-properties', getFeaturedProperties);
propertyRouter.get('/my-properties', protect, getUserProperties);
propertyRouter.get('/pending-properties', adminOrAgentAuth, getPendingProperties);
propertyRouter.get('/unavailable-properties', adminOrAgentAuth, getUnavailableProperties);
propertyRouter.get('/all-properties', adminAuth, getAllProperties);



propertyRouter.put('/approve/:propertyId', adminOrAgentAuth, approveProperty)
propertyRouter.get('/decline/:propertyId', protect, declinePropertyChanges);
propertyRouter.patch('/unavailable/:propertyId', protect, unavailable);
propertyRouter.patch('/feature/:propertyId',requireAuth, adminAuth, featureProperty);


propertyRouter.post('/', protect, createProperty);
propertyRouter.get('/', listProperties);



propertyRouter.patch('/:propertyId', protect, updateProperty);
propertyRouter.get('/:propertyId', getProperty);
propertyRouter.delete('/:propertyId', protect, deleteProperty);

export default propertyRouter;

