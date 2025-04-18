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
import ApproveSubmitPropertySchema from "../schemas/ApproveSubmitPropertySchema";





export const createProperty = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const clientId = req.user?._id!;
    let agentId: string | undefined | null = req.user?.agentId ?? null;

    if (agentId === null) {
        try {
            const user = await User.findById(clientId);
            if (!user) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN));
            agentId = user?.agentId;
        } catch (e) {
            next(e);
        }
    }
    req.body.active = false
    req.body.advanced = {
        state: statesTypes.toBeAdded,
        available: null,
        updated_version: {},
    };


    const property = new Property({
        ...req.body,
        clientId: clientId,
        agentId: agentId

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
        res.status(statusCode.CREATED).json('Property created successful');
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

    const { city, delegation, category, sub_category, listingType, maxNumberOfRooms, minNumberOfRooms, maxNumberOfBathrooms, minNumberOfBathrooms, maxNumberOfSquareFeet, minNumberOfSquareFeet, minPrice, maxPrice, forRent, forSale } = req.query;

    let filters: any = {};
    console.log(req.query)
    filterFunc(minPrice, maxPrice, "filterFields.price", filters);
    // filterFunc(minNumberOfRooms, maxNumberOfRooms, "filterFields.rooms", filters);
    // filterFunc(minNumberOfBathrooms, maxNumberOfBathrooms, "filterFields.bathrooms", filters);




    if (city) filters.city = city;
    if (delegation) filters.delegation = delegation;
    if (category) filters.category = category;
    if (sub_category) filters.sub_category = sub_category;
    if (listingType) filters.listing_type = listingType;
    const page = req.query.page ? Number(req.query.page) : 1;
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
                    .sort({ createdAt: -1 }),
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



export const approveProperty = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {


    const property = req.body;

    const propertyId = req.body._id;

    if (!propertyId || !mongoose.Types.ObjectId.isValid(propertyId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    const validBody = ApproveSubmitPropertySchema.safeParse(property);

    if (!validBody.success) {
        console.log("validBody.error.issues", validBody.error.issues)
        let zodErrors = {}
        validBody.error.issues.forEach((issue) => zodErrors = { ...zodErrors, [issue.path[0]]: issue.message });
        return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request, zodErrors));
    }


    try {
        const property = await Property.findById(propertyId);
        if (!property) return next(errorHandler(statusCode.NOT_FOUND, errorMessages.COMMON.NOT_FOUND));
        console.log("req.user", req.user)
        console.log("property.agentId", property.agentId)

        if (req.user && req.user.role === roles.AGENT && property.agentId?.toString() !== req.user._id.toString()) return next(errorHandler(statusCode.FORBIDDEN, errorMessages.COMMON.FORBIDDEN));

        const validatedVersion: any = validBody.data
        validatedVersion.active = true;
        validatedVersion.advanced = {};
        validatedVersion.advanced.state = statesTypes.active;
        validatedVersion.advanced.available = null;
        Object.assign(property, validatedVersion)
        await property.save();

        res.json('Property approved successfully');
    } catch (error) {
        next(error);
    }

}