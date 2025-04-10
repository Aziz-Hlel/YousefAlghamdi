
import { NextFunction, Request, Response } from "express";
import User from "../Models/user.model";
import roles from "../types/roles.type";
import { z, ZodEffects } from "zod";
import { errorHandler } from "../utils/error";
import statusCode from "../utils/statusCode";
import errorMessages from "../utils/errorMessages";
import Agent from "../Models/agent.model";
import mongoose from "mongoose";


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

    adresse: z.string({ required_error: "Adresse is required" })
        .min(1, { message: "Adresse is required" })  // Custom message for required field
        .max(50, { message: "Adresse must be at most 50 characters long" }),


    password: z.string({ required_error: "Password is required" })
        .min(1, { message: "Password must be at least 6 characters long" })
        .max(25, { message: "Password must be at most 25 characters long" }),

    confirmPassword: z.string({ required_error: "Confirm password is required" })
        .min(1, { message: "Confirm password must be at least 6 characters long" })
        .max(25, { message: "Confirm password must be at most 25 characters long" }),

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


const updateAgentSchema = registerBodySchema.innerType().omit({
    password: true,
    confirmPassword: true,
});


export const createAgent = async (req: Request, res: Response, next: NextFunction) => {

    const newAgent = req.body;
    newAgent.image = "https://example.com/images/john.jpg";
    const validBody = registerBodySchema.safeParse(newAgent);

    if (!validBody.success) {
        let zodErrors = {}
        validBody.error.issues.forEach((issue) => zodErrors = { ...zodErrors, [issue.path[0]]: issue.message });
        return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request, zodErrors));
    }

    const { email } = newAgent;
    const agentExist = await Agent.findOne({ email });

    if (agentExist) return next(errorHandler(statusCode.CONFLICT, errorMessages.COMMON.User_Already_Exists));

    newAgent.role = roles.AGENT;
    const agent = new Agent(newAgent);

    try {
        const agentt = await agent.save();
        res.status(statusCode.CREATED).json({ result: true });
    } catch (error) {
        next(error);
    }
};




export const updateAgent = async (req: Request, res: Response, next: NextFunction) => {

    const { agentId } = req.params;
    console.log(agentId)
    if (!agentId || !mongoose.Types.ObjectId.isValid(agentId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.TEA_POT));

    const updatedAgent = req.body;
    updatedAgent.image = "https://example.com/images/john.jpg";
    const validBody = updateAgentSchema.safeParse(updatedAgent);

    if (!validBody.success) {
        let zodErrors = {}
        validBody.error.issues.forEach((issue) => zodErrors = { ...zodErrors, [issue.path[0]]: issue.message });
        return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request, zodErrors));
    }

    try {
        const updateResult = await Agent.findByIdAndUpdate(agentId, updatedAgent, { new: true });
        if (!updateResult) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

        res.status(statusCode.OK).json({ result: updateResult });
    } catch (error) {
        next(error);
    }



}

export const getAgents = async (req: Request, res: Response, next: NextFunction) => {


    try {
        const [agents, agentsCount] = await Promise.all([
            Agent.find().where('role').equals(roles.AGENT),
            Agent.countDocuments({ role: roles.AGENT })
        ]);

        res.set("x-total-count", agentsCount.toString());
        res.json({
            result: agents
        });

    } catch (error) {
        console.log(error);
    }

};
