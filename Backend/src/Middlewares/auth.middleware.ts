import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/error";
import errorMessages from "../utils/errorMessages";
import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest.interface";




const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {


    const accessToken = req.cookies?.accessToken;

    const refreshToken = req.cookies?.refreshToken;

    if (!accessToken) return next(errorHandler(401, errorMessages.AUTH.INVALID_TOKEN));
    if (!refreshToken) return next(errorHandler(401, errorMessages.AUTH.INVALID_TOKEN));


    try {

        const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
        const decoded = jwt.verify(accessToken, JWT_ACCESS_SECRET);
        const userId = (decoded as any)._id
        if (!isValidObjectId(userId)) return next(errorHandler(401, errorMessages.AUTH.INVALID_TOKEN))

        console.log(decoded)
        req.user = (decoded as any);
        next();

    } catch (error) {
        // res.status(401);
        return next(errorHandler(401, errorMessages.AUTH.INVALID_TOKEN));
    }


};


export default protect;