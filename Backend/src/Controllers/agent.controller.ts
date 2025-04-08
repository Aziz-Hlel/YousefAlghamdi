
import { NextFunction, Request, Response } from "express";
import User from "../Models/user.model";
import roles from "../types/roles.type";
import z from "zod";
import { errorHandler } from "../utils/error";
import statusCode from "../utils/statusCode";
import errorMessages from "../utils/errorMessages";
import Agent from "../Models/agent.model";


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

    adresse: z.string({ required_error: "Adresse is required" })
        .min(1, { message: "Adresse must be at least 6 characters long" })
        .max(50, { message: "Adresse must be at most 50 characters long" }),

    image: z.string({ required_error: "Image is required" }),

    socials: z.object({
        whatsApp: z.string({ required_error: "WhatsApp is required" }),
        linkedin: z.string({ required_error: "LinkedIn is required" }),
        twitter: z.string({ required_error: "Twitter is required" }),
        instagram: z.string({ required_error: "Instagram is required" }),
    }),

    about: z.string({ required_error: "About is required" }),

}).refine((data) =>
    data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
}
);



export const createAgent = async (req: Request, res: Response, next: NextFunction) => {

    const newAgent = req.body;

    const validBody = registerBodySchema.safeParse(newAgent);

    if (!validBody.success) {
        let zodErrors = {}
        validBody.error.issues.forEach((issue) => zodErrors = { ...zodErrors, [issue.path[0]]: issue.message });
        return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request, zodErrors));
    }

    const { email } = newAgent;
    const agentExist = await Agent.findOne({ email });

    if (agentExist) return next(errorHandler(statusCode.CONFLICT, errorMessages.COMMON.User_Already_Exists));

    const agent = new Agent(newAgent);

    try {
        const agentt = await agent.save();
        res.status(statusCode.CREATED).json({ result: true });
    } catch (error) {
        next(error);
    }
};



export const getAgents = async (req: Request, res: Response, next: NextFunction) => {


    try {
        const agents = await Agent.find().where('role').equals(roles.AGENT);

        res.json({
            result: agents
        });

    } catch (error) {
        console.log(error);
    }

};