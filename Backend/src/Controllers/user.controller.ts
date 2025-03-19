
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
    firstName: z.string()
        .min(2, { message: "First name must be at least 2 characters long" })
        .max(25, { message: "First name must be at most 25 characters long" }),

    lastName: z.string()
        .min(2, { message: "Last name must be at least 2 characters long" })
        .max(25, { message: "Last name must be at most 25 characters long" }),

    phoneNumber: z.string()
        .min(5, { message: "Phone number must be at least 5 characters long" })
        .max(17, { message: "Phone number must be at most 17 characters long" }),

    email: z.string().email({ message: "Invalid email address" }),

    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(25, { message: "Password must be at most 25 characters long" }),

    confirmPassword: z.string()
        .min(6, { message: "Confirm password must be at least 6 characters long" })
        .max(25, { message: "Confirm password must be at most 25 characters long" }),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


export const register = async (req: Request, res: Response, next: NextFunction) => {

    const { firstName, lastName, password, email, role, phoneNumber } = req.body

    // if (!firstName || !lastName || !password || !email || !phoneNumber) return next(errorHandler(403, 'You are not allowed to update this user'));

    const validBody = registerBodySchema.safeParse(req.body)

    if (!validBody.success) return next(errorHandler(404, "heyyyy", validBody.error.errors));

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