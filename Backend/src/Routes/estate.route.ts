import express from 'express';
import { createEstate, getEstate, listEstates } from '../Controllers/estate.controller';






const estateRouter = express.Router();



estateRouter.post('/', createEstate);
estateRouter.get('/', listEstates);
estateRouter.get('/:estateId', getEstate);

export default estateRouter;

