import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway"

import { FileWithPath } from "react-dropzone";




export const getSignedUrlUpload = async (fileName: string, fileType: string, fileSize: number, purpose: "property" | "profile", imgsFolderId: string) => {

    const response = await Http.post(apiGateway.getSignedUrl, { fileName, fileType, fileSize, purpose, imgsFolderId })

    return response?.data.result;
}



export const uploadImageToS3_SIMULATOR = async (uploadedImg: Blob, name: string, imgsFolderId: string, purpose: "property" | "profile") => {

    const {  type, size } = uploadedImg

    
    const { url, key } = await getSignedUrlUpload(name, type, size, purpose, imgsFolderId);

    console.log("aws url for the upload : ", url);


    const response = await Http.put(url, uploadedImg);


    console.log("response", response?.data);

    return key

}
