import { update } from "lodash";


const localhostUrl = "http://ygp.ae";
const nginxUrl = "https://4c8f-41-225-176-145.ngrok-free.app";

export const baseUrl = localhostUrl;


const apiGateway = {

    baseUrl: baseUrl,

    user: {
        whoAmI: "/user/",
        signUp: "/user/register",
        sigIn: "/user/login",
        getById: "/user/",
        updateAgent: "/user/update-agent",
        logOut: "/user/log-out",

    },


    property: {
        list: "/property",
        create: "/property",
        getById: "/property",

        myProperties: {
            list: "/property/my-properties",
        },

        approve: "/property/approve",

    },

    agent: {
        list: "/agent/",
        create: "/agent",
        update: "/agent",
    },



    images: baseUrl + "/api/images/",

    getSignedUrl: baseUrl + "/api/images/getSignedUrl",

}




export default apiGateway;