import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway"

import { FileWithPath } from "react-dropzone";




export const getSignedUrlUpload = async (fileName: string, fileType: string, fileSize: number, purpose: "property" | "profile", imgsFolderId: string) => {

    const response = await Http.post(apiGateway.getSignedUrl, { fileName, fileType, fileSize, purpose, imgsFolderId })

    return response?.data.result;
}



export const uploadImageToS3_SIMULATOR = async (uploadedImg: FileWithPath, imgsFolderId: string, purpose: "property" | "profile") => {

    const { name, type, size } = uploadedImg
    const { url, key } = await getSignedUrlUpload(name, type, size, purpose, imgsFolderId);

    console.log("aws url for the upload : ", url);

    const formData = new FormData();
    formData.append("image", uploadedImg);

    const response = await Http.put(url, uploadedImg)

    
    console.log("response", response?.data);

    return key

}
