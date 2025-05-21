
import { NextFunction, Request, Response } from "express";
import User, { IAgent } from "../Models/user.model";
import roles from "../types/roles.type";
import { z } from "zod";
import { errorHandler } from "../utils/error";
import statusCode from "../utils/statusCode";
import errorMessages from "../utils/errorMessages";
import mongoose from "mongoose";
import { createAgentSchema, updateAgentSchema } from "../schemas/agent.CU";
import { getCDN_SignedUrl } from "../imgHandler";
import Property from "../Models/property.model";


const addSignedUrlToAgent = (agent: IAgent) => {

    return {
        ...(agent),
        agentInfo: {
            ...(agent.agentInfo),
            imageGallery: {
                ...(agent.agentInfo.imageGallery),
                mainImage: { ...(agent.agentInfo.imageGallery.mainImage), url: getCDN_SignedUrl(agent.agentInfo.imageGallery.mainImage.key) },
                miniImage: { ...(agent.agentInfo.imageGallery.miniImage), url: getCDN_SignedUrl(agent.agentInfo.imageGallery.miniImage.key) },
            },
        },
    }

}




export const createAgent = async (req: Request, res: Response, next: NextFunction) => {

    const newAgent = req.body;
    // newAgent.agentInfo.image = "https://example.com/images/john.jpg";
    const validBody = createAgentSchema.safeParse(newAgent);

    if (!validBody.success) {
        let zodErrors = {}
        validBody.error.issues.forEach((issue) => zodErrors = { ...zodErrors, [issue.path[0]]: issue.message });
        return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request, zodErrors));
    }

    const { email } = newAgent;
    const agentExist = await User.findOne({ email });

    if (agentExist) return next(errorHandler(statusCode.CONFLICT, errorMessages.COMMON.User_Already_Exists));

    newAgent.role = roles.AGENT;
    const agent = new User(newAgent);

    try {
        const agentt = await agent.save();
        res.status(statusCode.CREATED).json({ result: true });
    } catch (error) {
        next(error);
    }
};




export const updateAgent = async (req: Request, res: Response, next: NextFunction) => {

    const { agentId } = req.params;

    if (!agentId || !mongoose.Types.ObjectId.isValid(agentId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.TEA_POT));

    const updatedAgent = req.body;

    const validBody = updateAgentSchema.safeParse(updatedAgent);

    if (!validBody.success) {
        let zodErrors = {}
        validBody.error.issues.forEach((issue) => zodErrors = { ...zodErrors, [issue.path[0]]: issue.message });
        return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request, zodErrors));
    }

    try {

        const updateResult = await User.findByIdAndUpdate(agentId, updatedAgent, { new: true });
        if (!updateResult) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

        res.status(statusCode.OK).json({ result: updateResult });

    } catch (error) {
        next(error);
    }



}



export const getAgents = async (req: Request, res: Response, next: NextFunction) => {


    try {
        const [agents, agentsCount] = await Promise.all([
            User.find().where('role').equals(roles.AGENT),
            User.countDocuments({ role: roles.AGENT })
        ]);

        const updatedAgents = agents.map((agent) => addSignedUrlToAgent(agent.toObject() as IAgent));

        res.set("x-total-count", agentsCount.toString());
        res.json({
            result: updatedAgents
        });

    } catch (error) {
        console.log(error);
    }

};







export const deleteAgent = async (req: Request, res: Response, next: NextFunction) => {


    const { agentId } = req.params;
    if (!agentId || !mongoose.Types.ObjectId.isValid(agentId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    try {
        // Step 2: Delete the agent
        const agent = await User.findByIdAndDelete(agentId);
        if (!agent) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));


        await Property.updateMany(
            { agentId },
            {
                $unset: { agentId: "" },// Proper way to remove a field in MongoDB
                $set: { show: false }
            }

        );

        await Property.deleteMany({ clientId: agentId });

        res.status(statusCode.OK).json({ result: true });

    } catch (error) {
        next(error);
    }


};
