

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
        update:"/user/update-user",
        logOut: "/user/log-out",
        changePassword: "/user/change-password",
    },


    property: {
        list: "/property",
        create: "/property",
        getById: "/property",
        update: "/property",
        delete: "/property",
        myProperties: {
            list: "/property/my-properties",
        },
        pendingProperties: {
            list: "/property/pending-properties",
        },

        approve: "/property/approve",
        decline: "/property/decline",
        unavailable: "/property/unavailable",

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