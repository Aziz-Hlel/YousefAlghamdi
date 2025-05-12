import express, { NextFunction, Request, Response } from 'express'
import multer from 'multer';
import { errorHandler } from './utils/error';
import statusCode from './utils/statusCode';
import errorMessages from './utils/errorMessages';
import path from 'path';
import ENV from './utils/ENV.variables';


import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl as S3_getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getSignedUrl as CDN_getSignedUrl } from '@aws-sdk/cloudfront-signer';
import AuthenticatedRequest from './Interfaces/AuthenticatedRequest.interface';
import protect from './Middlewares/auth.middleware';
import { imagePurposes, ImagePurposeType } from './types/imagePurpose.types';




// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/S3_Simulator/"); // Folder where images will be stored
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Rename the file
    },
});

// Initialize multer
const upload = multer({
    storage,
});

const uploadImageToS3_SIMULATOR = ((req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.IMAGES.FILE_NOT_FOUND));
    res.json({
        result: "image uploaded"
    });
});


const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/avif"];

const maxFileSizeInMB = 10 // MB

const maxFileSize = 1024 * 1024 * maxFileSizeInMB;


const s3Client = new S3Client({
    credentials: {
        accessKeyId: ENV.bucketAccessKey,
        secretAccessKey: ENV.bucketSecretAccessKey,
    },
    region: ENV.bucketRegion,
})


export const getCDN_SignedUrl = (s3ObjectKey: string): string => {

    const getCDN_SignedUrl = CDN_getSignedUrl({
        keyPairId: ENV.CDN_PUBLIC_KEY_ID,
        privateKey: ENV.CDN_PRIVATE_KEY,
        url: `https://${ENV.CDN_DOMAIN}/${s3ObjectKey}`,

        dateLessThan: new Date(Date.now() + 3600 * 1000),
    })

    return getCDN_SignedUrl
}


const generateKey = (fileName: string, fileType: string, purpose: ImagePurposeType, userId: string, folderId: string, timestamp: number) => {


    if (purpose === imagePurposes.SPONSOR) {
        // ! added _test after purpose for testing , because purpose is the init state of the sponsors so i didnt want to change it or clean it each time
        return `${ENV.NODE_ENV === "production" ? "uploads" : "tmp_dev"}/${purpose}_test/${fileName.toLowerCase()}--${timestamp}`
    }

    if (purpose === imagePurposes.PROFILE) {
        // ! added _test after purpose for testing , because purpose is the init state of the sponsors so i didnt want to change it or clean it each time
        return `${ENV.NODE_ENV === "production" ? "uploads" : "tmp_dev"}/${purpose}_test/${fileName.toLowerCase()}--${timestamp}`
    }

    return `${ENV.NODE_ENV === "production" ? "uploads" : "tmp_dev"}/${userId}/${purpose}/${folderId}/${fileName.toLowerCase()}--${timestamp}`
}



const getSignedUrlFunc = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const { fileName, fileType, fileSize, purpose, imgsFolderId } = req.body

    if (!fileName) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    if (!imgsFolderId) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    if (!allowedTypes.includes(fileType)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.IMAGES.INVALID_IMAGE_TYPE));

    if (fileSize > maxFileSize) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.IMAGES.MAX_SIZE));

    if (!Object.values(imagePurposes).includes(purpose)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    const userId = req.user!._id as any

    const timestamp = Date.now(); // Get current timestamp in milliseconds

    const key = generateKey(fileName, fileType, purpose, userId, imgsFolderId, timestamp);

    const command = new PutObjectCommand({
        Bucket: ENV.bucketName,
        Key: key,
        ContentType: fileType,
    });

    const expiration = 3600; // Set expiration time in seconds (e.g., 1 hour)

    const signedUrl = await S3_getSignedUrl(s3Client, command, { expiresIn: expiration, });


    res.json({
        result: {
            url: signedUrl,
            key: key,
        },
    });

    // const localhostUrl = "http://localhost:" + ENV.PORT + "/api/images/uploadImageToS3_SIMULATOR/";
    // const randomNumber = Math.floor(Math.random() * 1000);
    // const localKey = `${fileName.toLowerCase()}`

    // res.json({
    //     result: {
    //         url: localhostUrl + String(randomNumber),
    //         key: localKey,
    //     }
    // });

}






const imgHandlerRouter = express.Router()

imgHandlerRouter.use('/', express.static(path.join(__dirname, '../public/images')));
imgHandlerRouter.post('/getSignedUrl', protect, getSignedUrlFunc)
imgHandlerRouter.post('/uploadImageToS3_SIMULATOR/:imgId', upload.single('image'), uploadImageToS3_SIMULATOR)


export default imgHandlerRouter;