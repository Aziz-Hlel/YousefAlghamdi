import express from 'express';
import { createEstate } from '../Controllers/estate.controller';






const estateRouter = express.Router();



estateRouter.post('/', createEstate);


export default estateRouter;