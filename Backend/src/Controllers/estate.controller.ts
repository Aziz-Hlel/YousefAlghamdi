import { NextFunction, Request, Response } from "express";
import Estate from "../Models/estate.model";
import { errorHandler } from "../utils/error";
import mongoose from "mongoose";
import errorMessages from "../utils/errorMessages";
import statusCode from "../utils/statusCode";





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
    if (!estateId || !mongoose.Types.ObjectId.isValid(estateId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    try {
        const estate = await Estate.findById(estateId)
        res.json({

            "result": estate,
        });
    } catch (error) {
        next(error);
    }


}

