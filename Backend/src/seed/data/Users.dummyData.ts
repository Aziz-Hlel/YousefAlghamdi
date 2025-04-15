import mongoose from "mongoose";
import { Iuser, IUser_model } from "../../Models/user.model";
import roles from "../../types/roles.type";
import hashPassword from "../hashPassword";
import { IAgentModel } from "../../Models/agent.model";



export interface Iuser_wPassword extends Iuser {
    password: string;
}


const createUser = async (agents: IAgentModel[]): Promise<Iuser_wPassword[]> => {
    return [
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'user1',
            lastName: 'Johnson',
            password: await hashPassword("user1"),
            email: 'user1@example.com',
            phoneNumber: '1112223333',
            role: roles.USER,
            agentId: String(agents[0]._id),
        },
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'user2',
            lastName: 'Johnson',
            password: await hashPassword("user2"),
            email: 'user2@example.com',
            phoneNumber: '1112223333',
            role: roles.USER,
            agentId: String(agents[0]._id), // linking to John
        },
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'user3',
            lastName: 'Johnson',
            password: await hashPassword("user3"),
            email: 'user3@example.com',
            phoneNumber: '1112223333',
            role: roles.USER,
            agentId: String(agents[0]._id), // linking to John
        },

    ]
}

export default createUser;