import { IAgent } from "../../Models/agent.model";
import roles from "../../types/roles.type";
import hashPassword from "../hashPassword";

const createAgents = async (): Promise<IAgent[]> => {
    return [
        {
            firstName: 'agent1',
            lastName: 'Doe',
            password: await hashPassword("agent1"), // make sure to hash or use dummy
            email: "agent1@gmail.com",
            phoneNumber: '1234567890',
            adresse: '1 Agent St',
            role: roles.AGENT,
        },
        {
            firstName: 'agent2',
            lastName: 'Doe',
            password: await hashPassword("agent2"), // make sure to hash or use dummy
            email: "agent2@gmail.com",
            phoneNumber: '1234567890',
            adresse: '2 Agent St',
            role: roles.AGENT,
        },
        {
            firstName: 'agent3',
            lastName: 'Doe',
            password: await hashPassword("agent3"), // make sure to hash or use dummy
            email: "agent3@gmail.com",
            phoneNumber: '1234567890',
            adresse: '3 Agent St',
            role: roles.AGENT,
        },

    ];
};


export default createAgents;