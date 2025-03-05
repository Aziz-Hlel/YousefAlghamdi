import express from 'express';
import { createEstate, getEstate } from '../Controllers/estate.controller';






const estateRouter = express.Router();



estateRouter.post('/', createEstate);
estateRouter.get('/:estateId', getEstate);

export default estateRouter;

