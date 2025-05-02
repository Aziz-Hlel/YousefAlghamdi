import express from 'express';
import { adminAuth } from '../Middlewares/auth.middleware';
import { createSponsor, getAllSponsors, getSponsors } from '../Controllers/sponsors.controller';





const sponsorRouter = express.Router();

sponsorRouter.get('/all', getAllSponsors);

sponsorRouter.post('/', adminAuth, createSponsor);
sponsorRouter.get('/', adminAuth, getSponsors);



export default sponsorRouter;
