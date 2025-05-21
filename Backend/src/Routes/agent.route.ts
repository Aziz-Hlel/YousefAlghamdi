import express from 'express';
import { createAgent, deleteAgent, getAgents as listAgents, updateAgent } from '../Controllers/agent.controller';
import { adminAuth } from '../Middlewares/auth.middleware';
import { requireAuth } from '../Middlewares/auth2.middleware';






const agentRouter = express.Router();


agentRouter.get('/', listAgents);
agentRouter.post('/', requireAuth, adminAuth, createAgent);
agentRouter.put('/:agentId', requireAuth, adminAuth, updateAgent);
agentRouter.delete('/:agentId', requireAuth, adminAuth, deleteAgent);


export default agentRouter;