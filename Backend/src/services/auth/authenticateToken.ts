import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import statusCode from '../../utils/statusCode';
import { errorHandler } from '../../utils/error';
import errorMessages from '../../utils/errorMessages';
import ENV from '../../utils/ENV.variables';

interface AuthRequest extends Request {
    user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN));


    try {
        const decoded = jwt.verify(token, ENV.JWT_ACCESS_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN))
    }
};
