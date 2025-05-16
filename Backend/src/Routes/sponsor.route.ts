import express from 'express';
import { adminAuth } from '../Middlewares/auth.middleware';
import { createSponsor, deleteSponsor, getAllSponsors, getSponsors, updateSponser } from '../Controllers/sponsors.controller';
import { requireAuth } from '../Middlewares/auth2.middleware';





const sponsorRouter = express.Router();

sponsorRouter.get('/all', getAllSponsors);

sponsorRouter.post('/', requireAuth, adminAuth, createSponsor);
sponsorRouter.get('/', requireAuth, adminAuth, getSponsors);

sponsorRouter.put('/:sponsorId', requireAuth, adminAuth, updateSponser);
sponsorRouter.delete('/:sponsorId', requireAuth, adminAuth, deleteSponsor);

export default sponsorRouter;
