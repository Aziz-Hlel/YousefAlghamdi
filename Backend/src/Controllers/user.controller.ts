
import { NextFunction, Request, Response } from "express";
import { errorHandler } from '../utils/error'
import User from '../Models/user.model';
import errorMessages from "../utils/errorMessages";
import generateToken, { __production__ } from "../utils/generateJWT";
import statusCode from "../utils/statusCode";
import z from "zod";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest.interface";
import mongoose from "mongoose";
import roles from "../types/roles.type";
import Property from "../Models/property.model";
import Agent from "../Models/agent.model";


export const test = (req: Request, res: Response) => {
    res.json({ message: 'API is working!' });
};


const registerBodySchema = z.object({
    firstName: z.string({ required_error: "First name is required" })
        .min(1, { message: "First name is required" })  // Custom message for required field
        .min(2, { message: "First name must be at least 2 characters long" })
        .max(25, { message: "First name must be at most 25 characters long" })
        .regex(/^[A-Za-z]+$/, { message: "First name can only contain letters" }),


    lastName: z.string({ required_error: "Last name is required" })
        .min(1, { message: "Last name must be at least 2 characters long" })
        .max(25, { message: "Last name must be at most 25 characters long" })
        .regex(/^[A-Za-z]+$/, { message: "Last name can only contain letters" }),


    phoneNumber: z.string({ required_error: "Phone number is required" })
        .min(1, { message: "Phone number must be at least 5 characters long" })
        .max(17, { message: "Phone number must be at most 17 characters long" }),

    email: z.string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),

    password: z.string({ required_error: "Password is required" })
        .min(1, { message: "Password must be at least 6 characters long" })
        .max(25, { message: "Password must be at most 25 characters long" }),

    confirmPassword: z.string({ required_error: "Confirm password is required" })
        .min(1, { message: "Confirm password must be at least 6 characters long" })
        .max(25, { message: "Confirm password must be at most 25 characters long" }),

}).refine((data) =>
    data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
}
);


export const register = async (req: Request, res: Response, next: NextFunction) => {

    const newUser: any = req.body;

    const validBody = registerBodySchema.safeParse(newUser)

    if (!validBody.success) {
        let zodErrors = {}
        validBody.error.issues.forEach((issue) => zodErrors = { ...zodErrors, [issue.path[0]]: issue.message });
        return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request, zodErrors));
    }


    newUser.role = roles.USER;
    const { email } = newUser;
    const userExist = await User.findOne({ email });

    if (userExist) return next(errorHandler(statusCode.CONFLICT, errorMessages.COMMON.User_Already_Exists));

    const user = new User(newUser);

    try {
        const userr = await user.save();

        generateToken(res, userr);
        res.status(statusCode.OK).json('Signup successful');
    } catch (error) {
        next(error);
    }


};




const loginBodySchema = z.object({
    email: z.string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),

    password: z.string({ required_error: "Password is required" })
        .min(1, { message: "Password must be at least 6 characters long" })
        .max(25, { message: "Password must be at most 25 characters long" }),

})


export const login = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    const validBody = loginBodySchema.safeParse(req.body)

    if (!validBody.success) {
        let zodErrors = {}
        validBody.error.issues.forEach((issue) => zodErrors = { ...zodErrors, [issue.path[0]]: issue.message });
        return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request, zodErrors));
    }

    let user = await User.findOne({ email }).select('+password');;

    if (!user) {
        user = await Agent.findOne({ email }).select('+password');
        console.log('ousil w chay')

        if (!user) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.COMMON.Invalid_Credentials));

    }
    console.log("ousil", user.email, password)
    if (!(await user.matchPassword(password))) {
        console.log("ousil0.5")

        return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.COMMON.Invalid_Credentials));
    }
    console.log("ousil2")

    user.set('password', undefined, { strict: false });
    generateToken(res, user);
    res.status(statusCode.OK);

}





export const whoAmI = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const userId = req.user?._id

    if (!userId) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN));

    let user = await User.findById(userId).select("-password");

    if (!user) {
        user = await Agent.findById(userId).select("-password");
        if (!user) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN));
    }

    const response = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role

    }

    res.status(statusCode.OK).json({
        result: response
    });

}



export const logOut = async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", { httpOnly: true, secure: __production__ === "production", sameSite: 'strict' });
    res.clearCookie("refreshToken", { httpOnly: true, secure: __production__ === "production", sameSite: 'strict' });
    res.status(statusCode.OK).json()
}


export const getUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const userId = req.params.userId;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));


    try {
        const user = await User.findById(userId).select("-password");
        res.json({

            result: user,
        });

    } catch (e) {
        next(e);
    }

};



export const updateAgentOfClient = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const { userId, agentId } = req.body;

    if (!userId) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN));
    if (!agentId || !mongoose.Types.ObjectId.isValid(agentId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));


    try {
        const user = await User.findById(userId);
        if (!user) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

        user.agentId = agentId;

        await user.save();

        Promise.all([

            user.save(),

            Property.bulkWrite([{
                updateMany: {
                    filter: { clientId: userId },
                    update: { $set: { agentId: agentId } }
                }
            }])
        ]);

        res.status(statusCode.OK).json('Agent updated successfully');
    } catch (e) {
        next(e);
    }

};