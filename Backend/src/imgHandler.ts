import express, { NextFunction, Request, Response } from 'express'
import multer from 'multer';
import { errorHandler } from './utils/error';
import statusCode from './utils/statusCode';
import errorMessages from './utils/errorMessages';
import path from 'path';
import ENV from './utils/ENV.variables';



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
const imgPurpose = ["profile", "property"]
const maxFileSizeInMB = 10 // MB

const maxFileSize = 1024 * 1024 * maxFileSizeInMB;


const getSignedUrl = (req: Request, res: Response, next: NextFunction) => {

    const { fileName, fileType, fileSize, purpose } = req.body

    if (!allowedTypes.includes(fileType)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.IMAGES.INVALID_IMAGE_TYPE));

    if (fileSize > maxFileSize) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.IMAGES.MAX_SIZE));

    if (!imgPurpose.includes(purpose)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    // const userId = req.user?._id
    const userId = "userid"
    const timestamp = Date.now(); // Get current timestamp in milliseconds

    const key = `${userId}/${purpose}/${fileName.toLowerCase()}/${timestamp}`;
    const localhostUrl = "http://localhost:" + ENV.PORT + "/api/images/uploadImageToS3_SIMULATOR/";
    const randomNumber = Math.floor(Math.random() * 1000);
    const localKey = `${fileName.toLowerCase()}`

    res.json({
        result: {
            url: localhostUrl + String(randomNumber),
            key: localKey,
        }
    });

}






const imgHandlerRouter = express.Router()

imgHandlerRouter.use('/', express.static(path.join(__dirname, '../public/images')));
imgHandlerRouter.post('/getSignedUrl', getSignedUrl)
imgHandlerRouter.post('/uploadImageToS3_SIMULATOR/:imgId', upload.single('image'), uploadImageToS3_SIMULATOR)


export default imgHandlerRouter;