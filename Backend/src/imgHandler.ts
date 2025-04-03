import express, { NextFunction, Request, Response } from 'express'
import multer from 'multer';
import { errorHandler } from './utils/error';
import statusCode from './utils/statusCode';
import errorMessages from './utils/errorMessages';
import path from 'path';



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


const getSignedUrl = (req: Request, res: Response, next: NextFunction) => {

    const { fileName, fileType, fileSize } = req.body

    if (!allowedTypes.includes(fileType)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.IMAGES.INVALID_IMAGE_TYPE));

    if (fileSize > maxFileSize) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.IMAGES.MAX_SIZE));


    // const userId = req.user?._id
    const urserId = "userid"
    const localhostUrl = "http://localhost:" + process.env.PORT + "/api/images/upload/";
    const randomNumber = Math.floor(Math.random() * 1000);

    res.json({
        result: localhostUrl + urserId + "/" + String(randomNumber)
    });

}






const imgHandlerRouter = express.Router()

imgHandlerRouter.use('/', express.static(path.join(__dirname, '../public/images')));
imgHandlerRouter.post('/getSignedUrl', getSignedUrl)
imgHandlerRouter.post('/uploadImageToS3_SIMULATOR/:imgId', upload.single('image'), uploadImageToS3_SIMULATOR)


export default imgHandlerRouter;