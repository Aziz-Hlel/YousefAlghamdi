

const localhostUrl = "http://localhost:5000";
const nginxUrl = "https://4c8f-41-225-176-145.ngrok-free.app";

export const baseUrl = localhostUrl;


const apiGateway = {

    baseUrl: baseUrl,

    user: {
        whoAmI: "/user/",
        signUp: "/user/register",
        sigIn: "/user/login",
    },

    property: {
        list: "/property",
        create: "/property",
        getById: "/property"

    },



    images: baseUrl + "/api/images/",

    getSignedUrl: baseUrl + "/api/images/getSignedUrl",

}




export default apiGateway;