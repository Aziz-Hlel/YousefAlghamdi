import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/error";
import errorMessages from "../utils/errorMessages";
import statusCode from "../utils/statusCode";
import { sendContactUsMail, sendPropertyMail } from "../services/emailService";



export const contactUsEmail = async (req: Request, res: Response, next: NextFunction) => {

    const { name, email, phoneNumber, subject, message } = req.body;


    if (!name || !email || !phoneNumber || !subject || !message) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request))


    try {
        await sendContactUsMail({ name, email, phoneNumber, subject, message })
    } catch (error) {
        return next(errorHandler(statusCode.INTERNAL_SERVER_ERROR, errorMessages.SERVICES.EMAIL))
    }

    res.status(statusCode.OK).json({ result: true });

}




export const propertyEmail = async (req: Request, res: Response, next: NextFunction) => {

    const { firstName, lastName, email, subject, message, propertyId } = req.body;


    if (!firstName || !lastName || !email || !subject || !message || !propertyId) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request))


    try {
        await sendPropertyMail({ firstName, lastName, email, subject, message, propertyId })
    } catch (error) {
        return next(errorHandler(statusCode.INTERNAL_SERVER_ERROR, errorMessages.SERVICES.EMAIL))
    }

    res.status(statusCode.OK).json({ result: true });

}

