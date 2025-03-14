import { NextFunction, Request, Response } from "express";
import Estate from "../Models/estate.model";
import { errorHandler } from "../utils/error";
import mongoose from "mongoose";
import errorMessages from "../utils/errorMessages";
import statusCode from "../utils/statusCode";





export const createEstate = async (req: Request, res: Response, next: NextFunction) => {


    const estate = new Estate({
        ...req.body,
        clientId: "67d18af6bb05549959f8ae3d",
        agentId: "67d18b2d7c34baab7b87c4d8"
    })

    try {
        await estate.save();
        res.json('Estate created successful');
    } catch (error) {
        next(error);
    }


}

const filterFunc = (minVal: any, maxVal: any, filterKeyName: string, filters: any) => {
    if (minVal && maxVal && !isNaN(Number(minVal)) && !isNaN(Number(maxVal))) {
        filters[filterKeyName] = {};
        filters[filterKeyName].$gte = Number(minVal);
        filters[filterKeyName].$lte = Number(maxVal);
    }

}


export const listEstates = async (req: Request, res: Response, next: NextFunction) => {

    const { city, type, maxNumberOfRooms, minNumberOfRooms, maxNumberOfBathrooms, minNumberOfBathrooms, maxNumberOfSquareFeet, minNumberOfSquareFeet, minPrice, maxPrice, forRent, forSale } = req.query;
    console.log('req.query', req.query)
    let filters: any = {};

    filterFunc(minPrice, maxPrice, "filterFields.price", filters);
    filterFunc(minNumberOfRooms, maxNumberOfRooms, "filterFields.rooms", filters);
    filterFunc(minNumberOfBathrooms, maxNumberOfBathrooms, "filterFields.bathrooms", filters);
    // filterFunc(minNumberOfSquareFeet, maxNumberOfSquareFeet, "", filters);

    if (typeof forSale === "boolean") filters["filterFields.forSale"] = forSale;
    if (typeof forRent === "boolean") filters["filterFields.forRent"] = forRent;
    if (city) filters.city = city;
    if (type) filters.type = type;

    const page = Number(req.query.page);
    if (!page || isNaN(page)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    const limit = 6;
    console.log('filters', filters)
    try {

        const [estates, total] = await Promise.all([
            Estate.find(filters)
                .limit(limit)
                .skip((page - 1) * limit),
            Estate.countDocuments(filters)
        ]);

        // res.set('Content-Range', `products/women/categorie`);
        res.set("X-Total-Count", total.toString()); // Optional, useful for frontend

        res.json({
            data: estates,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
        })


    } catch (error) {
        console.log('fama 8alta !!!!')
        next(errorHandler(error, "501"));
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

