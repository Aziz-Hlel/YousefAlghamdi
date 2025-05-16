import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/error";
import errorMessages from "../utils/errorMessages";
import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest.interface";
import statusCode from "../utils/statusCode";
import roles from "../types/roles.type";
import { requireAuth } from "./auth2.middleware";
import { AppError } from "./AppError";




const verifyRefreshToken = (refreshToken: string, req: AuthenticatedRequest, next: NextFunction) => {

    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
    jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err: any, decoded: any) => {

        if (err) {
            return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.TOKEN_EXPIRED));

        }
        const userId = (decoded as any)._id
        if (!isValidObjectId(userId)) return next(errorHandler(401, errorMessages.AUTH.INVALID_TOKEN))
        req.user = (decoded as any);
        next();

    });

}



const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {


    const accessToken = req.cookies?.accessToken;

    const refreshToken = req.cookies?.refreshToken;


    if (!accessToken) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN));
    if (!refreshToken) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN));




    const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
    jwt.verify(accessToken, JWT_ACCESS_SECRET, (err: any, decoded: any) => {

        if (err) {
            return verifyRefreshToken(refreshToken, req, next)
        }

        const userId = (decoded as any)._id
        if (!isValidObjectId(userId)) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN))

        console.log(decoded)
        req.user = (decoded as any);
        next();

    });


};



export const adminAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (req.user?.role !== roles.ADMIN) throw new AppError(errorMessages.AUTH.PERMISSION_DENIED, statusCode.FORBIDDEN, 500)
        else next();
    } catch (error) {
        next(error)
    }
}




export const adminOrAgentAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    requireAuth(req, res, next)
    if (req.user?.role !== roles.ADMIN && req.user?.role !== roles.AGENT) res.status(statusCode.FORBIDDEN).json({ message: errorMessages.AUTH.PERMISSION_DENIED });
    else next();
}


export default protect;