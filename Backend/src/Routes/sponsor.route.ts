import express from 'express';
import { adminAuth } from '../Middlewares/auth.middleware';
import { createSponsor, deleteSponsor, getAllSponsors, getSponsors, updateSponser } from '../Controllers/sponsors.controller';
import { authenticateToken } from '../services/auth/authenticateToken';





const sponsorRouter = express.Router();

sponsorRouter.get('/all', getAllSponsors);

sponsorRouter.post('/', authenticateToken, adminAuth, createSponsor);
sponsorRouter.get('/', authenticateToken, adminAuth, getSponsors);

sponsorRouter.put('/:sponsorId', authenticateToken, adminAuth, updateSponser);
sponsorRouter.delete('/:sponsorId', authenticateToken, adminAuth, deleteSponsor);

export default sponsorRouter;
