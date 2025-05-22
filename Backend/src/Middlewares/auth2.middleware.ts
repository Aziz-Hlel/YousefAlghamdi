import { Request, Response, NextFunction } from "express";
import ENV from "../utils/ENV.variables";
import { AppError } from "./AppError";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest.interface";
import jwt from "jsonwebtoken";


export const requireAuth = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {

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