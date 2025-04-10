import express from 'express';
import { createAgent, getAgents as listAgents, updateAgent } from '../Controllers/agent.controller';
import { adminAuth } from '../Middlewares/auth.middleware';






const agentRouter = express.Router();


agentRouter.get('/', listAgents);
agentRouter.post('/', adminAuth, createAgent);
agentRouter.put('/:agentId', adminAuth, updateAgent);



export default agentRouter;