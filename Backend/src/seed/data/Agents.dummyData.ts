import mongoose from "mongoose";
import { IAgent } from "../../Models/agent.model";
import roles from "../../types/roles.type";
import hashPassword from "../hashPassword";
import bcrypt from "bcrypt";


interface IAgent_wPasswords extends IAgent {
    password: string
}

const createAgents = async (): Promise<IAgent_wPasswords[]> => {


    return [
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'agent1',
            lastName: 'Doe',
            email: "agent1@gmail.com",
            phoneNumber: '1234567890',
            adresse: '1 Agent St',
            role: roles.AGENT,
            password: await hashPassword("agent1"),
            image: "",
            socials: {
                whatsApp: "+0000",
                linkedin: "https://linkedin.com/",
                twitter: "https://twitter.com/",
                instagram: "https://instagram.com/"
            },
            about: "agent1 description",
        },
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'agent2',
            lastName: 'Doe',
            password: await hashPassword("agent2"), // make sure to hash or use dummy
            email: "agent2@gmail.com",
            phoneNumber: '1234567890',
            adresse: '2 Agent St',
            role: roles.AGENT,
            socials: {
                whatsApp: "+0000",
                linkedin: "https://linkedin.com/",
                twitter: "https://twitter.com/",
                instagram: "https://instagram.com/"
            },
            image: "",
            about: "agent2 description"
        },
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'agent3',
            lastName: 'Doe',
            password: await hashPassword("agent3"), // make sure to hash or use dummy
            email: "agent3@gmail.com",
            phoneNumber: '1234567890',
            adresse: '3 Agent St',
            role: roles.AGENT,
            socials: {
                whatsApp: "+0000",
                linkedin: "https://linkedin.com/",
                twitter: "https://twitter.com/",
                instagram: "https://instagram.com/"
            },
            image: "",
            about: "agent3 description"
        },
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'admin',
            lastName: 'Doe',
            password: await hashPassword("admin"), // make sure to hash or use dummy
            email: "admin@gmail.com",
            phoneNumber: '1234567890',
            adresse: '3 Agent St',
            role: roles.ADMIN,
            socials: {
                whatsApp: "+0000",
                linkedin: "https://linkedin.com/",
                twitter: "https://twitter.com/",
                instagram: "https://instagram.com/"
            },
            image: "",
            about: "admin description"
        },

    ];
};


export default createAgents;