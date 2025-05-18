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


        const accessToken = req.cookies?.accessToken;

        const refreshToken = req.cookies?.refreshToken;

        if (!accessToken) {
            
            throw new AppError("No token provided", 401, 500);
        }
        if (!refreshToken) {
          

            throw new AppError("No token provided", 401, 500);
        }

        try {

            const decoded = jwt.verify(accessToken, ENV.JWT_ACCESS_SECRET);
            req.user = (decoded as any);

            next();
        } catch (error) {

            try {
                const decoded = jwt.verify(refreshToken, ENV.JWT_REFRESH_SECRET);
                req.user = (decoded as any);
                next();

            } catch (error) {

           

                console.log({
                    message: "Invalid token",
                    context: "AuthMiddleware.requireAuth",
                    error: error instanceof Error ? error.message : "Unknown error",
                });
                throw new AppError(
                    "Unauthorized - Invalid token",
                    401,
                    500
                );
            }
        }
  
};