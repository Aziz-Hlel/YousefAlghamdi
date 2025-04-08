
import { NextFunction, Request, Response } from "express";
import User from "../Models/user.model";
import roles from "../types/roles.type";



export const getAgents = async (req: Request, res: Response, next: NextFunction) => {


    try {
        const agents = await User.find().where('role').equals(roles.AGENT);

        res.json({
            result: agents
        });

    } catch (error) {
        console.log(error);
    }
    
};