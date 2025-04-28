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
            firstName: 'agent111',
            lastName: 'Doe',
            email: "agent111@gmail.com",
            phoneNumber: '1234567890',
            role: roles.AGENT,
            password: await hashPassword("agent111"),

            agentInfo: {
                image: "",
                socials: {
                    whatsApp: "+0000",
                    linkedin: "https://linkedin.com/",
                    twitter: "https://twitter.com/",
                    instagram: "https://instagram.com/"
                },
                address: '1 Agent St',
                about: "agent111 description",
                clientsId: [],
            },
            savedProperties: [],
            
            
        },
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'agent222',
            lastName: 'Doe',
            password: await hashPassword("agent222"), // make sure to hash or use dummy
            email: "agent222@gmail.com",
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
                about: "agent222 description",
                clientsId: [],
            },
            savedProperties: [],
            
        },
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'agent333',
            lastName: 'Doe',
            password: await hashPassword("agent333"), // make sure to hash or use dummy
            email: "agent333@gmail.com",
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
                about: "agent333 description",
                clientsId: [],

            },
            savedProperties: [],
            
        },
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'admin111',
            lastName: 'Doe',
            password: await hashPassword("admin111"), // make sure to hash or use dummy
            email: "admin111@gmail.com",
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