
// const 

// const localhostUrl = "http://localhost:80" + "/api";
// const domain = "http://ygp.ae" + "/api";
// const nginxUrl = "https://4c8f-41-225-176-145.ngrok-free.app";

// export const baseUrl = domain;

// if (!import.meta.env.VITE_API_URL) throw new Error("VITE_API_URL is not defined in the env");

export const baseUrl = "https://ygp.ae" + "/api"
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
        create: "/propert",
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