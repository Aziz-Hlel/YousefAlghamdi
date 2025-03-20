

const localhostUrl = "http://localhost:50";
const nginxUrl = "https://28a3-197-14-119-224.ngrok-free.app";

export const baseUrl = nginxUrl;


const apiGateway = {

    baseUrl: baseUrl,

    user: {
        signUp: "/user/register",
        sigIn: "/user/login",
    },

    estate: "/estate",


    images: baseUrl + "/api/images/"

}




export default apiGateway;