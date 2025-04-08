import express from 'express';
import { getAgents } from '../Controllers/agent.controller';






const agentRouter = express.Router();


agentRouter.get('/', getAgents);





export default agentRouter;