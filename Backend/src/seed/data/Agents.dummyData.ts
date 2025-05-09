import mongoose from "mongoose";
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
            _id: new mongoose.Types.ObjectId("681b2ac5fe184b03f44dcbcc"),
            firstName: 'Mohamed',
            lastName: 'Abdelkhalek',
            email: "agent1@gmail.com",
            phoneNumber: '+971501575572',
            role: roles.AGENT,
            password: await hashPassword("agent1"),

            agentInfo: {


                imageGallery: {
                    folderId: "",
                    mainImage: {
                        key: "",
                        url: "",
                    },
                    miniImage: {
                        key: "",
                        url: "",
                    }
                },
                clientsId: [],
            },
            savedProperties: [],


        },
        {
            _id: new mongoose.Types.ObjectId("681b2ac5fe184b03f44dcbcd"),
            firstName: 'Widad',
            lastName: 'Kristal',
            password: await hashPassword("agent2"), // make sure to hash or use dummy
            email: "agent2@gmail.com",
            phoneNumber: '+971 504100867',
            role: roles.AGENT,
            agentInfo: {

                imageGallery: {
                    folderId: "",
                    mainImage: {
                        key: "",
                        url: "",
                    },
                    miniImage: {
                        key: "",
                        url: "",
                    }
                },

                clientsId: [],
            },
            savedProperties: [],

        },
        {
            _id: new mongoose.Types.ObjectId("681b2ac5fe184b03f44dcbce"),
            firstName: 'Ali',
            lastName: 'Liakat',
            password: await hashPassword("agent3"), // make sure to hash or use dummy
            email: "agent3@gmail.com",
            phoneNumber: '+971 585395994',
            role: roles.AGENT,
            agentInfo: {

                imageGallery: {

                    folderId: "",
                    
                    mainImage: {
                        key: "",
                        url: "",
                    },
                    miniImage: {
                        key: "",
                        url: "",
                    }
                },
                clientsId: [],

            },
            savedProperties: [],

        },
        {
            _id: new mongoose.Types.ObjectId("681b2ac5fe184b03f44dcbcf"),
            firstName: 'Narjiss Didi',
            lastName: 'Alaoui',
            password: await hashPassword("admin"), // make sure to hash or use dummy
            email: "admin@gmail.com",
            phoneNumber: '+971 525002822',
            role: roles.ADMIN,

            adminInfo: {



                imageGallery: {
                    folderId: "",
                    mainImage: {
                        key: "",
                        url: "",
                    },
                    miniImage: {
                        key: "",
                        url: "",
                    }
                },
            },

            savedProperties: [],
        },

    ];
};


export default createAgents;