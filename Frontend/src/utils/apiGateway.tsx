

const VITE_API_URL = import.meta.env.VITE_API_URL

if (!VITE_API_URL) throw new Error("VITE_API_URL is not defined in the env");

export const baseUrl = VITE_API_URL + "/api";

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



    images: baseUrl + "/images/",

    getSignedUrl: baseUrl + "/images/getSignedUrl",

}




export default apiGateway;