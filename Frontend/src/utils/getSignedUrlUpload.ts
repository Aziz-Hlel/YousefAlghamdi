import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway"
import { FileWithPath } from "react-dropzone";




export const getSignedUrlUpload = (fileName: string, fileType: string, fileSize: number) => {

    const url = apiGateway.getSignedUrl
    return url;
}



export const uploadImageToS3_SIMULATOR = async (uploadedImg: FileWithPath) => {
    const { name, type, size } = uploadedImg
    const url = getSignedUrlUpload(name, type, size)

    await Http.post(url, { fileName: name, fileType: type, fileSize: size })

    
}
