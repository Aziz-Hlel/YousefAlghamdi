import mongoose from "mongoose";
import { IUser, } from "../../Models/user.model";
import roles from "../../types/roles.type";
import hashPassword from "../hashPassword";
import bcrypt from "bcrypt";



export interface Iuser_wPassword extends IUser {
    password: string;
}


const createUser = async (agents: Iuser_wPassword[]): Promise<Iuser_wPassword[]> => {


    return [
        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'user1',
            lastName: 'Johnson',
            password: await hashPassword("user1"),
            email: 'user1@gmail.com',
            phoneNumber: '1112223333',
            role: roles.CLIENT,
            clientInfo: {
                agentId: String(agents[0]._id),
            },


            savedProperties: [],
        },

        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'user2',
            lastName: 'Johnson',
            password: await hashPassword("user2"),
            email: 'user2@gmail.com',
            phoneNumber: '1112223333',
            role: roles.CLIENT,
            clientInfo: {
                agentId: String(agents[0]._id), // linking to John
            },
            savedProperties: [],
        },

        {
            _id: new mongoose.Types.ObjectId(),
            firstName: 'user3',
            lastName: 'Johnson',
            password: await hashPassword("user3"),
            email: 'user3@gmail.com',
            phoneNumber: '1112223333',
            role: roles.CLIENT,
            clientInfo: {
                agentId: String(agents[0]._id), // linking to John
            },
            savedProperties: [],
        },

    ]
}

export default createUser;