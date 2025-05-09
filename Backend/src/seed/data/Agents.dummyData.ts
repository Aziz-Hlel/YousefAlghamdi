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
        // {
        //     _id: new mongoose.Types.ObjectId("681b2ac5fe184b03f44dcbcc"),
        //     firstName: 'Mohamed',
        //     lastName: 'Abdelkhalek',
        //     email: "agent1@gmail.com",
        //     phoneNumber: '+971501575572',
        //     role: roles.AGENT,
        //     password: await hashPassword("agent1"),

        //     agentInfo: {


        //         imageGallery: {
        //             folderId: "",
        //             mainImage: {
        //                 key: "",
        //                 url: "",
        //             },
        //             miniImage: {
        //                 key: "",
        //                 url: "",
        //             }
        //         },
        //         clientsId: [],
        //     },
        //     savedProperties: [],


        // },
        // {
        //     _id: new mongoose.Types.ObjectId("681b2ac5fe184b03f44dcbcd"),
        //     firstName: 'Widad',
        //     lastName: 'Kristal',
        //     password: await hashPassword("agent2"), // make sure to hash or use dummy
        //     email: "agent2@gmail.com",
        //     phoneNumber: '+971 504100867',
        //     role: roles.AGENT,
        //     agentInfo: {

        //         imageGallery: {
        //             folderId: "",
        //             mainImage: {
        //                 key: "",
        //                 url: "",
        //             },
        //             miniImage: {
        //                 key: "",
        //                 url: "",
        //             }
        //         },

        //         clientsId: [],
        //     },
        //     savedProperties: [],

        // },
        // {
        //     _id: new mongoose.Types.ObjectId("681b2ac5fe184b03f44dcbce"),
        //     firstName: 'Ali',
        //     lastName: 'Liakat',
        //     password: await hashPassword("agent3"), // make sure to hash or use dummy
        //     email: "agent3@gmail.com",
        //     phoneNumber: '+971 585395994',
        //     role: roles.AGENT,
        //     agentInfo: {

        //         imageGallery: {

        //             folderId: "",

        //             mainImage: {
        //                 key: "",
        //                 url: "",
        //             },
        //             miniImage: {
        //                 key: "",
        //                 url: "",
        //             }
        //         },
        //         clientsId: [],

        //     },
        //     savedProperties: [],

        // },
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
                    folderId: "72b48f99-ca44-4ce1-bbd2-fe772cee9840",
                    mainImage: {
                        key: "tmp_dev/681b2ac5fe184b03f44dcbcf/property/72b48f99-ca44-4ce1-bbd2-fe772cee9840/agent4.jpg--1746783784055",
                    },
                    miniImage: {
                        key: "tmp_dev/681b2ac5fe184b03f44dcbcf/property/72b48f99-ca44-4ce1-bbd2-fe772cee9840/agent4 - mini.jpg--1746782583815",
                    }
                },
            },

            savedProperties: [],
        },



        {
            "_id": new mongoose.Types.ObjectId("681e3156ddd409c99daf3884"),
            "firstName": "Mohamed",
            "lastName": "abdelkhalek",
            "email": "agent1@gmail.com",
            "phoneNumber": "+971501575572",
            "role": "agent",
            "agentInfo": {
                "imageGallery": {
                    "mainImage": {
                        "key": "tmp_dev/681b2ac5fe184b03f44dcbcf/property/02f48747-0edc-4429-a88b-bb6512de2f86/agent4.jpg--1746809167052"
                    },
                    "miniImage": {
                        "key": "tmp_dev/681b2ac5fe184b03f44dcbcf/property/02f48747-0edc-4429-a88b-bb6512de2f86/agent4 - mini.jpg--1746809169106"
                    },
                    "folderId": "02f48747-0edc-4429-a88b-bb6512de2f86"
                },
                "clientsId": []
            },
            "savedProperties": [],
            password: await hashPassword("agent1")
        },
        {
            "_id": new mongoose.Types.ObjectId("681e31ecddd409c99daf3889"),
            "firstName": "Widad",
            "lastName": "Kristal",
            "email": "agent2@gmail.com",
            "phoneNumber": "+971504100867",
            "role": "agent",
            "agentInfo": {
                "imageGallery": {
                    "mainImage": {
                        "key": "tmp_dev/681b2ac5fe184b03f44dcbcf/property/c9e5587a-30ec-48f3-9d9c-05681ebef1ff/agent8.jpg--1746809224627"
                    },
                    "miniImage": {
                        "key": "tmp_dev/681b2ac5fe184b03f44dcbcf/property/c9e5587a-30ec-48f3-9d9c-05681ebef1ff/agent8 - mini.jpg--1746809318380"
                    },
                    "folderId": "c9e5587a-30ec-48f3-9d9c-05681ebef1ff"
                },
                "clientsId": []
            },
            "savedProperties": [],
            password: await hashPassword("agent2")
        },
        {
            "_id": new mongoose.Types.ObjectId("681e3230ddd409c99daf388e"),
            "firstName": "Liakat",
            "lastName": "Ali",
            "email": "agent3@gmail.com",
            "phoneNumber": "+971585395994",
            "role": "agent",
            "agentInfo": {
                "imageGallery": {
                    "mainImage": {
                        "key": "tmp_dev/681b2ac5fe184b03f44dcbcf/property/46c1a42d-57db-4f4c-a132-6b4012479829/agent6.jpg--1746809386198"
                    },
                    "miniImage": {
                        "key": "tmp_dev/681b2ac5fe184b03f44dcbcf/property/46c1a42d-57db-4f4c-a132-6b4012479829/agent6 mini (1).jpg--1746809389810"
                    },
                    "folderId": "46c1a42d-57db-4f4c-a132-6b4012479829"
                },
                "clientsId": []
            },
            "savedProperties": [],
            password: await hashPassword("agent3")
        },


    ];
};


export default createAgents;