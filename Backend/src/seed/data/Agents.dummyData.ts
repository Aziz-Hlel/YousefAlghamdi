import mongoose from "mongoose";
import { IAgent } from "../../Models/agent.model";
import roles from "../../types/roles.type";
import hashPassword from "../hashPassword";
import bcrypt from "bcrypt";
import { IUser } from "../../Models/user.model";


interface IUser_wPassword extends IUser {
    password: string
}

const createAgents = async (): Promise<IUser_wPassword[]> => {


    return [
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'agent1',
            lastName: 'Doe',
            email: "agent1@gmail.com",
            phoneNumber: '1234567890',
            role: roles.AGENT,
            password: await hashPassword("agent1"),

            agentInfo: {
                image: "",
                socials: {
                    whatsApp: "+0000",
                    linkedin: "https://linkedin.com/",
                    twitter: "https://twitter.com/",
                    instagram: "https://instagram.com/"
                },
                address: '1 Agent St',
                about: "agent1 description",
                clientsId: [],
            },
            savedProperties: [],
            
            
        },
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'agent2',
            lastName: 'Doe',
            password: await hashPassword("agent2"), // make sure to hash or use dummy
            email: "agent2@gmail.com",
            phoneNumber: '1234567890',
            role: roles.AGENT,
            agentInfo: {
                address: '2 Agent St',
                socials: {
                    whatsApp: "+0000",
                    linkedin: "https://linkedin.com/",
                    twitter: "https://twitter.com/",
                    instagram: "https://instagram.com/"
                },
                image: "",
                about: "agent2 description",
                clientsId: [],
            },
            savedProperties: [],
            
        },
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'agent3',
            lastName: 'Doe',
            password: await hashPassword("agent3"), // make sure to hash or use dummy
            email: "agent3@gmail.com",
            phoneNumber: '1234567890',
            role: roles.AGENT,
            agentInfo: {

                address: '3 Agent St',
                socials: {
                    whatsApp: "+0000",
                    linkedin: "https://linkedin.com/",
                    twitter: "https://twitter.com/",
                    instagram: "https://instagram.com/"
                },
                image: "",
                about: "agent3 description",
                clientsId: [],

            },
            savedProperties: [],
            
        },
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'admin',
            lastName: 'Doe',
            password: await hashPassword("admin"), // make sure to hash or use dummy
            email: "admin@gmail.com",
            phoneNumber: '1234567890',
            role: roles.ADMIN,

            adminInfo: {

                address: '3 Agent St',
                socials: {
                    whatsApp: "+0000",
                    linkedin: "https://linkedin.com/",
                    twitter: "https://twitter.com/",
                    instagram: "https://instagram.com/",
                },
                image: "",
                about: "admin description",

            },
            
            savedProperties: [],
        },

    ];
};


export default createAgents;