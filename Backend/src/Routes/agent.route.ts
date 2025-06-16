import express from 'express';
import { createAgent, deleteAgent, getAgents as listAgents, updateAgent } from '../Controllers/agent.controller';
import { adminAuth } from '../Middlewares/auth.middleware';
import { authenticateToken } from '../services/auth/authenticateToken';






const agentRouter = express.Router();


agentRouter.get('/', listAgents);
agentRouter.post('/', authenticateToken, adminAuth, createAgent);
agentRouter.put('/:agentId', authenticateToken, adminAuth, updateAgent);
agentRouter.delete('/:agentId', authenticateToken, adminAuth, deleteAgent);


export default agentRouter;