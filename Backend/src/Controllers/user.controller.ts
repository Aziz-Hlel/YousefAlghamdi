
import { NextFunction, Request, Response } from "express";
import { errorHandler } from '../utils/error'
import User from '../Models/user.model';
import errorMessages from "../utils/errorMessages";
import generateToken from "../utils/generateJWT";
import statusCode from "../utils/statusCode";


export const test = (req: Request, res: Response) => {
    res.json({ message: 'API is working!' });
};



export const register = async (req: Request, res: Response, next: NextFunction) => {

    const { firstName, lastName, password, email, role, phoneNumber } = req.body

    if (!firstName || !lastName || !password || !email || !phoneNumber) return next(errorHandler(403, 'You are not allowed to update this user'));

    const newUser = new User({
        firstName,
        lastName,
        password,
        email,
        phoneNumber,
    })

    try {
        await newUser.save();
        res.json('Signup successful');
    } catch (error) {
        next(error);
    }


}


export const login = async (req: Request, res: Response, next: NextFunction) => {

    const { firstName, password } = req.body;

    if (!firstName || !password) return next(errorHandler(404, errorMessages.COMMON.BAD_Request));

    const user = await User.findOne({ firstName });

    if (!user) return next(errorHandler(401, errorMessages.COMMON.Invalid_Credentials));

    if (!await user.matchPassword(password)) return next(errorHandler(401, errorMessages.COMMON.Invalid_Credentials));

    generateToken(res, user);
    res.status(statusCode.OK);

}