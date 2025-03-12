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

const filterFunc = (minVal: any, maxVal: any, filters: any) => {
    if (minVal && maxVal && !isNaN(Number(minVal)) && !isNaN(Number(maxVal))) {
        filters.price = {};
        filters.price.$gte = Number(minVal);
        filters.price.$lte = Number(maxVal);
    }

}


export const listEstates = async (req: Request, res: Response, next: NextFunction) => {

    const { city, type, maxNumberOfRooms, minNumberOfRooms, maxNumberOfBathrooms, minNumberOfBathrooms, maxNumberOfSquareFeet, minNumberOfSquareFeet, minPrice, maxPrice, forRent, forSale } = req.query;

    let filters: any = {};

    filterFunc(minPrice, maxPrice, filters);
    filterFunc(minNumberOfRooms, maxNumberOfRooms, filters);
    filterFunc(minNumberOfBathrooms, maxNumberOfBathrooms, filters);
    filterFunc(minNumberOfSquareFeet, maxNumberOfSquareFeet, filters);

    if (typeof forSale === "boolean") filters.forSale = forSale;
    if (typeof forRent === "boolean") filters.forRent = forRent;

    const page = Number(req.query.page);
    if (!page || isNaN(page)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    const limit = 6;

    try {

        const estates = await Estate.find(filters)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const total = await Estate.countDocuments(filters);

        res.json({
            data: estates,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
        })


    } catch (error) {
        next(error);
    }


};



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

