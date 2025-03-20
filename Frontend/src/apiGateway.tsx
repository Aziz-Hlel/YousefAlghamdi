

const localhostUrl = "http://localhost:50";
const nginxUrl = "https://4c8f-41-225-176-145.ngrok-free.app";

export const baseUrl = localhostUrl;


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