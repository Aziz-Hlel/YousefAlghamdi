import { NextFunction, Request, Response } from "express";
import Estate from "../Models/estate.model";
import { errorHandler } from "../utils/error";
import mongoose from "mongoose";





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


export const getEstate = async (req: Request, res: Response, next: NextFunction) => {

    const estateId = req.params.estateId;
    if (!estateId || !mongoose.Types.ObjectId.isValid(estateId)) return next(errorHandler(404, "Bad request"));

    try {
        const estate = await Estate.findById(estateId)
        res.json({

            "result": estate,
        });
    } catch (error) {
        next(error);
    }


}

