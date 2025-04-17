import mongoose from "mongoose";
import { Iuser, } from "../../Models/user.model";
import roles from "../../types/roles.type";
import hashPassword from "../hashPassword";
import { IAgentModel } from "../../Models/agent.model";
import bcrypt from "bcrypt";



export interface Iuser_wPassword extends Iuser {
    password: string;
}


const createUser = async (agents: IAgentModel[]): Promise<Iuser_wPassword[]> => {

    const salt = await bcrypt.genSalt(10);

    return [
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'user1',
            lastName: 'Johnson',
            password: await hashPassword("user1"),
            email: 'user1@gmail.com',
            phoneNumber: '1112223333',
            role: roles.USER,
            agentId: String(agents[0]._id),
        },
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'user2',
            lastName: 'Johnson',
            password: await hashPassword("user2"),
            email: 'user2@gmail.com',
            phoneNumber: '1112223333',
            role: roles.USER,
            agentId: String(agents[0]._id), // linking to John
        },
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'user3',
            lastName: 'Johnson',
            password: await hashPassword("user3"),
            email: 'user3@gmail.com',
            phoneNumber: '1112223333',
            role: roles.USER,
            agentId: String(agents[0]._id), // linking to John
        },

    ]
}

export default createUser;