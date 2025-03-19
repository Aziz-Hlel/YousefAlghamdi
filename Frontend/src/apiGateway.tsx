

const localhostUrl = "http://localhost:50";
const nginxUrl = "https://6a40-197-15-72-205.ngrok-free.app";

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