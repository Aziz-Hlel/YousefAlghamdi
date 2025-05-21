import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/error";
import errorMessages from "../utils/errorMessages";
import statusCode from "../utils/statusCode";
import { sendMail } from "../services/emailService";



export const createEmail = async (req: Request, res: Response, next: NextFunction) => {

    const { name, email, phoneNumber, subject, message } = req.body;


    if (!name || !email || !phoneNumber || !subject || !message) next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request))


    try {
        await sendMail({ name, email, phoneNumber, subject, message })
    } catch (error) {
        return next(errorHandler(statusCode.INTERNAL_SERVER_ERROR, errorMessages.SERVICES.EMAIL))
    }

    res.status(statusCode.OK).json({ result: true });

}