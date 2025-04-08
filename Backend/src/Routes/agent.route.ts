import express from 'express';
import { createAgent, getAgents } from '../Controllers/agent.controller';






const agentRouter = express.Router();


agentRouter.get('/', getAgents);
agentRouter.post('/register', createAgent);



export default agentRouter;