import Http from "@src/services/Http";
import { ImagePurposeType } from "@src/types/imagePurpose.types";
import apiGateway from "@src/utils/apiGateway"
import axios from "axios";

import { FileWithPath } from "react-dropzone";




export const getSignedUrlUpload = async (fileName: string, fileType: string, fileSize: number, purpose: ImagePurposeType, imgsFolderId: string) => {

    const response = await Http.post(apiGateway.getSignedUrl, { fileName, fileType, fileSize, purpose, imgsFolderId })

    return response?.data.result;
}



export const uploadImageToS3_SIMULATOR = async (uploadedImg: Blob, name: string, imgsFolderId: string, purpose: ImagePurposeType, setProgress: Function) => {

    const { type, size } = uploadedImg


    const { url, key } = await getSignedUrlUpload(name, type, size, purpose, imgsFolderId);

    console.log("aws url for the upload : ", url);


    // const response = await Http.put(url, uploadedImg);

    try {
        await axios.put(url, uploadedImg, {
            headers: {
                'Content-Type': uploadedImg.type,
            },
            onUploadProgress: (event) => {
                const percent = Math.round((event.loaded * 100) / (event.total || 1));
                setProgress(percent);
            },
        });

        setProgress(100);
        setTimeout(() => setProgress(null), 500); // Reset after complete
    } catch (err) {
        console.error("Upload failed", err);
        setProgress(null);
    } finally {
        // setUploading(false);
    }

    // console.log("response", response?.data);

    return key

}
