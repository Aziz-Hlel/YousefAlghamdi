import { NextFunction, Request, Response } from "express";
import Property from "../Models/property.model";
import { errorHandler } from "../utils/error";
import mongoose from "mongoose";
import errorMessages from "../utils/errorMessages";
import statusCode from "../utils/statusCode";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest.interface";





export const createProperty = async (req: Request, res: Response, next: NextFunction) => {

    const property = new Property({
        ...req.body,
        clientId: new mongoose.Types.ObjectId("67e131037ada90f7bcda8e81"),
        agentId: new mongoose.Types.ObjectId("67ed13d95925a009ce7f3ae1"),
        
    })
    try {
        await property.save();
        res.json('Property created successful');
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


export const listProperties = async (req: Request, res: Response, next: NextFunction) => {

    const { city, type, maxNumberOfRooms, minNumberOfRooms, maxNumberOfBathrooms, minNumberOfBathrooms, maxNumberOfSquareFeet, minNumberOfSquareFeet, minPrice, maxPrice, forRent, forSale } = req.query;
    // console.log('req.query', req.query)
    let filters: any = {};

    filterFunc(minPrice, maxPrice, "filterFields.price", filters);
    filterFunc(minNumberOfRooms, maxNumberOfRooms, "filterFields.rooms", filters);
    filterFunc(minNumberOfBathrooms, maxNumberOfBathrooms, "filterFields.bathrooms", filters);
    // filterFunc(minNumberOfSquareFeet, maxNumberOfSquareFeet, "", filters);

    if (forSale === "true" && forRent === "true") { }
    else if (forSale === "true") filters["filterFields.forSale"] = forSale;
    else if (forRent === "true") filters["filterFields.forRent"] = forRent;


    if (city) filters.city = city;
    if (type) filters.type = type;

    const page = Number(req.query.page);
    if (!page || isNaN(page)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    const limit = 6;
    // console.log('filters', filters)
    try {

        const [properties, total] = await Promise.all([
            Property.find(filters)
                .limit(limit)
                .skip((page - 1) * limit),
            Property.countDocuments(filters)
        ]);

        // res.set('Content-Range', `products/women/categorie`);
        res.set("X-Total-Count", total.toString()); // Optional, useful for frontend

        res.json({
            result: properties,
        })


    } catch (error) {
        console.log('fama 8alta !!!!')
        next(errorHandler(error, "501"));
    }


};



export const getProperty = async (req: Request, res: Response, next: NextFunction) => {

    const estateId = req.params.estateId;
    if (!estateId || !mongoose.Types.ObjectId.isValid(estateId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    try {
        const estate = await Property.findById(estateId)
        res.json({

            result: estate,
        });
    } catch (error) {
        next(error);
    }


}




export const getUserProperties = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const userId = req.user?._id;
    console.log('userId', userId)


    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    if (req.user?.role === "user")
        try {

            const estate = await Property.find({ clientId: userId });
            console.log(estate, estate.length)
            res.json({

                result: estate,

            });


        } catch (error) {
            next(error);
        }
    console.log('t5l')
    if (req.user?.role === "agent")
        try {

            const estate = await Property.find({ agentId: userId });

            res.json({

                result: estate,

            });


        } catch (error) {
            next(error);
        }




    if (req.user?.role !== "user") return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN));
}
