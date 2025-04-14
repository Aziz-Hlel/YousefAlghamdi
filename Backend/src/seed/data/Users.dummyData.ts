import { IUser } from "../../Models/user.model";
import roles from "../../types/roles.type";
import hashPassword from "../hashPassword";



const createUser = async (): Promise<IUser[]> => {
    return [
        {
            firstName: 'user1',
            lastName: 'Johnson',
            password: await hashPassword("user1"),
            email: 'user1@example.com',
            phoneNumber: '1112223333',
            role: roles.USER,
            agentId: agents[0]._id, // linking to John
        },
        {
            firstName: 'user2',
            lastName: 'Johnson',
            password: await hashPassword("user2"),
            email: 'user2@example.com',
            phoneNumber: '1112223333',
            role: roles.USER,
            agentId: agents[0]._id, // linking to John
        },

    ]
}