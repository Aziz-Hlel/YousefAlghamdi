import apiGateway from "@src/utils/apiGateway"




const getSignedUrlUpload = () => {

    const url = apiGateway.baseUrl + "/api/getSignedUrl"

    return url;
}