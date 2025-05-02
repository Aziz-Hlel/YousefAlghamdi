import express from 'express';
import { adminAuth } from '../Middlewares/auth.middleware';
import { createSponsor, deleteSponsor, getAllSponsors, getSponsors, updateSponser } from '../Controllers/sponsors.controller';





const sponsorRouter = express.Router();

sponsorRouter.get('/all', getAllSponsors);

sponsorRouter.post('/', adminAuth, createSponsor);
sponsorRouter.get('/', adminAuth, getSponsors);

sponsorRouter.put('/:sponsorId', adminAuth, updateSponser);
sponsorRouter.delete('/:sponsorId', adminAuth, deleteSponsor);

export default sponsorRouter;
