
import { NextFunction, Request, Response } from "express";
import { errorHandler } from '../utils/error'
import User from '../Models/user.model';
import errorMessages from "../utils/errorMessages";
import generateToken from "../utils/generateJWT";
import statusCode from "../utils/statusCode";
import z from "zod";


export const test = (req: Request, res: Response) => {
    res.json({ message: 'API is working!' });
};


const registerBodySchema = z.object({
    firstName: z.string({ required_error: "First name is required" })
        .min(1, { message: "First name is required" })  // Custom message for required field
        .min(2, { message: "First name must be at least 2 characters long" })
        .max(25, { message: "First name must be at most 25 characters long" }),


    lastName: z.string({ required_error: "Last name is required" })
        .min(2, { message: "Last name must be at least 2 characters long" })
        .max(25, { message: "Last name must be at most 25 characters long" }),

    phoneNumber: z.string({ required_error: "Phone number is required" })
        .min(5, { message: "Phone number must be at least 5 characters long" })
        .max(17, { message: "Phone number must be at most 17 characters long" }),

    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),

    password: z.string({ required_error: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(25, { message: "Password must be at most 25 characters long" }),

    confirmPassword: z.string({ required_error: "Confirm password is required" })
        .min(6, { message: "Confirm password must be at least 6 characters long" })
        .max(25, { message: "Confirm password must be at most 25 characters long" }),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


export const register = async (req: Request, res: Response, next: NextFunction) => {

    const newUser = req.body;

    const validBody = registerBodySchema.safeParse(newUser)

    if (!validBody.success) return next(errorHandler(401, "heyyyy", validBody.error.errors));


    newUser.role = "user";


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
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(25, { message: "Password must be at most 25 characters long" }),

})


export const login = async (req: Request, res: Response, next: NextFunction) => {

    const { firstName, password } = req.body;

    const validBody = loginBodySchema.safeParse(req.body)
    console.log(validBody.error?.errors)
    if (!validBody.success) return next(errorHandler(423, "heyyyy", validBody.error.errors));

    if (!firstName || !password) return next(errorHandler(404, errorMessages.COMMON.BAD_Request));

    const user = await User.findOne({ firstName });

    if (!user) return next(errorHandler(401, errorMessages.COMMON.Invalid_Credentials));

    if (!await user.matchPassword(password)) return next(errorHandler(401, errorMessages.COMMON.Invalid_Credentials));

    generateToken(res, user);
    res.status(statusCode.OK);

}