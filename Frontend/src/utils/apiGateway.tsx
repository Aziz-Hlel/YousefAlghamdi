

const localhostUrl = "http://localhost:5000";
const nginxUrl = "https://4c8f-41-225-176-145.ngrok-free.app";

export const baseUrl = localhostUrl;


const apiGateway = {

    baseUrl: baseUrl,

    user: {
        signUp: "/user/register",
        sigIn: "/user/login",
    },

    property: "/estate",



    images: baseUrl + "/api/images/",

    getSignedUrl: baseUrl + "/api/images/getSignedUrl"

}




export default apiGateway;