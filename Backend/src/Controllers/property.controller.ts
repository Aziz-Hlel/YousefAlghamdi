import { NextFunction, Request, Response } from "express";
import Property from "../Models/property.model";
import { errorHandler } from "../utils/error";
import mongoose from "mongoose";
import errorMessages from "../utils/errorMessages";
import statusCode from "../utils/statusCode";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest.interface";
import roles from "../types/roles.type";
import statesTypes from "../types/states.types";
import User from "../Models/user.model";





export const createProperty = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const clientId = req.user?._id!;
    req.body.active = false
    req.body.advanced = {
        state: "new",
        available: null,
        updated_version: {},
    };

    const property = new Property({
        ...req.body,
        clientId: clientId,
        agentId: new mongoose.Types.ObjectId("67ed13d95925a009ce7f3ae1"),

    });


    try {
        Promise.all([
            User.findByIdAndUpdate(
                clientId,
                { role: roles.CLIENT },
                { new: true, runValidators: true },
            ),
            property.save()
        ])
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

    let filters: any = {};

    filterFunc(minPrice, maxPrice, "filterFields.price", filters);
    filterFunc(minNumberOfRooms, maxNumberOfRooms, "filterFields.rooms", filters);
    filterFunc(minNumberOfBathrooms, maxNumberOfBathrooms, "filterFields.bathrooms", filters);


    if (forSale === "true" && forRent === "true") { }


    if (city) filters.city = city;
    if (type) filters.type = type;

    const page = Number(req.query.page);
    filters.active = true;
    if (!page || isNaN(page)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    const limit = 6;
    // console.log('filters', filters)
    try {

        const [properties, total] = await Promise.all([
            Property.find(filters)
                .limit(limit)
                .skip((page - 1) * limit)
                .sort({ createdAt: -1 }),
            Property.countDocuments(filters)
        ]);

        res.set("x-total-count", total.toString()); // Optional, useful for frontend

        res.json({
            result: properties,
        })


    } catch (error) {
        console.log('fama 8alta !!!!')
        next(errorHandler(error, "501"));
    }


};



export const getProperty = async (req: Request, res: Response, next: NextFunction) => {

    const propertyId = req.params.propertyId;
    if (!propertyId || !mongoose.Types.ObjectId.isValid(propertyId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    try {
        const estate = await Property.findById(propertyId);
        res.json({

            result: estate,
        });
    } catch (error) {
        next(error);
    }


}



export const getUserProperties = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const userId = req.user?._id;

    const page = Number(req.query.page) || 1;
    const limit = 6;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    if (req.user?.role === roles.USER)

        try {

            const [properties, total] = await Promise.all([


                Property.find({ clientId: userId })
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .sort({ updatedAt: -1 }),
                Property.countDocuments({ clientId: userId }),
            ]);


            res.set("x-total-count", total.toString()); // Optional, useful for frontend

            res.json({

                result: properties,

            });


            return
        } catch (error) {
            next(error);
        }


    if (req.user?.role === roles.AGENT)

        try {

            const [properties, total] = await Promise.all([
                Property.find({ agentId: userId })
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .sort({ updatedAt: -1 }),
                Property.countDocuments({ agentId: userId }),
            ]);

            res.set("x-total-count", total.toString()); // Optional, useful for frontend

            res.json({

                result: properties,

            });

            return

        } catch (error) {
            next(error);
        }


    if (req.user?.role === roles.ADMIN)

        try {

            const [properties, total] = await Promise.all([
                Property.find({ "advanced.state": { $ne: statesTypes.active } })
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .sort({ updatedAt: -1 }),
                Property.countDocuments({ "advanced.state": { $ne: statesTypes.active } }),
            ]);

            res.set("x-total-count", total.toString()); // Optional, useful for frontend

            res.json({

                result: properties,

            });

            return

        } catch (error) {
            next(error);
        }


    return next(errorHandler(statusCode.FORBIDDEN, errorMessages.COMMON.FORBIDDEN));
};
