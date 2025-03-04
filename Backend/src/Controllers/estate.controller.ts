import { NextFunction, Request, Response } from "express";
import Estate from "../Models/estate.model";





export const createEstate = async (req: Request, res: Response, next: NextFunction) => {


    const estate = new Estate({
        ...req.body,
        clientId: "67c6dc27b388f464b07342ad",
    })

    try {
        await estate.save();
        res.json('Estate created successful');
    } catch (error) {
        next(error);
    }


}