import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/error";
import errorMessages from "../utils/errorMessages";
import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest.interface";
import statusCode from "../utils/statusCode";
import roles from "../types/roles.type";
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


    req.user = ({
        "_id": "6821b220bc4d00392204d5a2",
        "firstName": "Mohamed",
        "lastName": "abdelkhalek",
        "email": "agent1@gmail.com",
        "phoneNumber": "+971501575572",
        "savedProperties": [],
        "role": "agent",
        "agentInfo": {
            "imageGallery": {
                "mainImage": {
                    "key": "tmp_dev/profile/mohamed abdelkhalek.jpg--1747038742924"
                },
                "miniImage": {
                    "key": "tmp_dev/profile/mohamed abdelkhalek mini.jpg--1747038746979"
                },
                "folderId": "43e031ee-c76a-43f8-b504-4dd367255560"
            },
            "clientsId": []
        }
    }
    ) as any;
    next();

};



export const adminAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    if (req.user) {
        req.user.role = (roles.ADMIN as any);
    }

    next();
}



export const adminOrAgentAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log("ouslll")
    try {
        if (req.user?.role !== roles.ADMIN && req.user?.role !== roles.AGENT) throw new AppError(errorMessages.AUTH.PERMISSION_DENIED, statusCode.FORBIDDEN, 500)
        else next();
    } catch (error) {
        next(error)
    }
}


export default protect;