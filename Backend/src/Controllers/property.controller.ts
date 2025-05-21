import { NextFunction, Request, Response } from "express";
import Property, { Iproperty } from "../Models/property.model";
import { errorHandler } from "../utils/error";
import mongoose from "mongoose";
import errorMessages from "../utils/errorMessages";
import statusCode from "../utils/statusCode";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest.interface";
import roles from "../types/roles.type";
import statesTypes from "../types/states.types";
import User from "../Models/user.model";
import ApproveSubmitPropertySchema from "../schemas/ApproveSubmitPropertySchema";
import { getCDN_SignedUrl } from "../imgHandler";


const addSignedUrl = (property: any) => {
    return {
        ...property.toJSON(),
        imageGallery: {
            ...(property.imageGallery as any).toJSON(),
            images: property.imageGallery.images.map((image: any) => ({ ...image.toJSON(), url: getCDN_SignedUrl(image.key) })),
        },
    }

}



export const createProperty = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const clientId = req.user?._id!;
    let agentId: string | undefined = req.user?.clientInfo?.agentId;

    if (req.user?.role === roles.CLIENT || req.user?.role === roles.USER) {


        if (!agentId) {
            try {
                const user = await User.findById(clientId);
                if (!user) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN));
                agentId = user?.clientInfo?.agentId;
            } catch (e) {
                console.log(e)
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
                property.save(),
            ])
            res.status(statusCode.CREATED).json('Property created successful');
        } catch (error) {
            next(error);
        }
    }
    else if (req.user?.role === roles.AGENT) {


        req.body.active = true,
            req.body.advanced = {
                state: statesTypes.active,
                available: null,
                updated_version: {},
            };

        console.log("req.body", req.body.imageGallery)
        const property = new Property({
            ...req.body,
            clientId: clientId,
            agentId: clientId,

        });

        await property.save();

        res.status(statusCode.CREATED).json('Property created successful');

    }

    // ! 3nd if l user client agent w admin le donc ken admin chizid dar none will happen , reason mezetch 5atr bch trasilik tzidlou input y5tar agent m3aha mouch kima l agent t7sb besmou direct w client kima 5dmt melloul
    else return next(errorHandler(statusCode.INTERNAL_SERVER_ERROR, errorMessages.COMMON.INTERNAL_SERVER_ERROR));



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


        const updatedProperties = properties.map((property) => addSignedUrl(property));


        res.set("x-total-count", total.toString()); // Optional, useful for frontend

        res.json({
            result: updatedProperties,
        })


    } catch (error) {
        console.log('fama 8alta !!!!')
        next(errorHandler(error, "501"));
    }


};




export const getProperty = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {


    const propertyId = req.params.propertyId;
    if (!propertyId || !mongoose.Types.ObjectId.isValid(propertyId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    const property = await Property.findById(propertyId);
    if (!property) return next(errorHandler(statusCode.NOT_FOUND, errorMessages.COMMON.NOT_FOUND));

    const propertyWithSignedUrls = addSignedUrl(property);

    try {
        if (propertyWithSignedUrls.advanced.state === statesTypes.toBeUpdated) {

            propertyWithSignedUrls.advanced.updated_version.imageGallery.images = propertyWithSignedUrls.advanced.updated_version.imageGallery.images.map((image: any) => ({ key: image.key, url: getCDN_SignedUrl(image.key) }))
        }
    } catch (error) {
        console.log(error)
    }

    res.json({

        result: propertyWithSignedUrls,
    });



}


export const getFeaturedProperties = async (req: Request, res: Response, next: NextFunction) => {

    const featuredProperties = await Property.find({ featured: true }).sort({ createdAt: -1 });
    const updatedProperties = featuredProperties.map((property) => addSignedUrl(property));

    res.status(statusCode.OK).json({
        success: true,
        result: updatedProperties,
    });
}


export const getUserProperties = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const userId = req.user?._id;
    const page = Number(req.query.page) || 1;
    const limit = 6;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    if (req.user?.role === roles.CLIENT)

        try {

            const [properties, total] = await Promise.all([


                Property.find({ clientId: userId })
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .sort({ updatedAt: -1 }),
                Property.countDocuments({ clientId: userId }),
            ]);

            const updatedProperties = properties.map((property) => addSignedUrl(property));

            res.set("x-total-count", total.toString()); // Optional, useful for frontend

            res.json({

                result: updatedProperties,

            });


            return
        } catch (error) {
            next(error);
        }


    if (req.user?.role === roles.AGENT)

        try {

            const [properties, total] = await Promise.all([
                Property.find({ agentId: userId, "advanced.state": { $eq: statesTypes.active } })
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .sort({ createdAt: -1 }),
                Property.countDocuments({ agentId: userId, "advanced.state": { $eq: statesTypes.active } }),
            ]);

            const updatedProperties = properties.map((property) => addSignedUrl(property));
            res.set("x-total-count", total.toString()); // Optional, useful for frontend

            res.json({

                result: updatedProperties,

            });

            return

        } catch (error) {
            next(error);
        }


    if (req.user?.role === roles.ADMIN)
        // ! func t3 el admin f compoenet t3 my properties ama y3tih ken l pending 
        try {

            const [properties, total] = await Promise.all([
                Property.find({ "advanced.state": { $ne: statesTypes.active } })
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .sort({ updatedAt: -1 }),
                Property.countDocuments({ "advanced.state": { $ne: statesTypes.active } }),
            ]);

            const updatedProperties = properties.map((property) => addSignedUrl(property));
            res.set("x-total-count", total.toString()); // Optional, useful for frontend

            res.json({

                result: updatedProperties,

            });

            return

        } catch (error) {
            next(error);
        }


    return next(errorHandler(statusCode.FORBIDDEN, errorMessages.COMMON.FORBIDDEN));
};


export const getPendingProperties = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const userId = req.user?._id;
    const role = req.user?.role;
    const page = Number(req.query.page) || 1;
    const limit = 6;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));


    if (role === roles.AGENT)

        try {

            const [properties, total] = await Promise.all([
                Property.find({ agentId: userId, "advanced.state": { $nin: [statesTypes.active, statesTypes.unavailable] } })
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .sort({ createdAt: -1 }),
                Property.countDocuments({ agentId: userId, "advanced.state": { $nin: [statesTypes.active, statesTypes.unavailable] } }),
            ]);

            const updatedProperties = properties.map((property) => addSignedUrl(property));
            res.set("x-total-count", total.toString()); // Optional, useful for frontend

            res.json({

                result: updatedProperties,

            });

            return

        } catch (error) {
            next(error);
        }


    if (role === roles.ADMIN)

        try {

            const [properties, total] = await Promise.all([
                Property.find({ "advanced.state": { $nin: [statesTypes.active, statesTypes.unavailable] } })
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .sort({ updatedAt: -1 }),
                Property.countDocuments({ "advanced.state": { $nin: [statesTypes.active, statesTypes.unavailable] } }),
            ]);

            const updatedProperties = properties.map((property) => addSignedUrl(property));
            res.set("x-total-count", total.toString()); // Optional, useful for frontend

            res.json({

                result: updatedProperties,

            });

            return

        } catch (error) {
            next(error);
        }


    return next(errorHandler(statusCode.FORBIDDEN, errorMessages.COMMON.FORBIDDEN));
};



export const updateProperty = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const property = req.body;
    const propertyId = req.params.propertyId;

    if (!propertyId || !mongoose.Types.ObjectId.isValid(propertyId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    const validBody = ApproveSubmitPropertySchema.safeParse(property);

    if (!validBody.success) {
        console.log("validBody.error.issues", validBody.error.issues)
        let zodErrors = {}
        validBody.error.issues.forEach((issue) => zodErrors = { ...zodErrors, [issue.path[0]]: issue.message });
        return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request, zodErrors));
    }
    console.log("validBody.data ::::::::::", validBody.data)
    try {

        const property = await Property.findById(propertyId);
        if (!property) return next(errorHandler(statusCode.NOT_FOUND, errorMessages.COMMON.NOT_FOUND));

        (validBody as any)._id = req.params.propertyId;

        property.active = false;
        property.advanced = {
            state: statesTypes.toBeUpdated,
            available: null,
            updated_version: validBody.data,
        };
        console.log("property ::::::", property);
        console.log("property.advanced type :::", typeof property.advanced.updated_version);
        const prop = await property.save();
        res.status(statusCode.OK).json({ result: prop });
    }
    catch (error) {
        console.log(error)
        next(error);
    };



};





export const getUnavailableProperties = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const userId = req.user?._id;
    const role = req.user?.role;
    const page = Number(req.query.page) || 1;
    const limit = 6;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));


    if (role === roles.AGENT) {

        try {

            const [properties, total] = await Promise.all([
                Property.find({ agentId: userId, "advanced.state": statesTypes.unavailable })
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .sort({ createdAt: -1 }),
                Property.countDocuments({ agentId: userId, "advanced.state": statesTypes.unavailable }),
            ]);
            const updatedProperties = properties.map((property) => addSignedUrl(property));

            res.set("x-total-count", total.toString()); // Optional, useful for frontend

            res.json({

                result: updatedProperties,
            })

        } catch (error) {
            next(error);
        }
    }
    if (role === roles.ADMIN) {
        try {

            const [properties, total] = await Promise.all([
                Property.find({ "advanced.state": statesTypes.unavailable })
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .sort({ createdAt: -1 }),
                Property.countDocuments({ "advanced.state": statesTypes.unavailable }),
            ]);

            const updatedProperties = properties.map((property) => addSignedUrl(property));

            res.set("x-total-count", total.toString()); // Optional, useful for frontend

            res.json({

                result: updatedProperties,
            })
        } catch (error) {
            next(error);
        }

    }
}



export const approveProperty = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {


    const property = req.body;

    const propertyId = req.params.propertyId;

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

        const validatedVersion: any = validBody.data;
        validatedVersion.active = true;
        validatedVersion.advanced = {};
        validatedVersion.advanced.state = statesTypes.active;
        validatedVersion.advanced.available = null;
        Object.assign(property, validatedVersion);
        await property.save();

        res.json('Property approved successfully');
    } catch (error) {
        next(error);
    }

}


export const deleteProperty = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const propertyId = req.params.propertyId;
    const role = req.user?.role;

    if (!propertyId || !mongoose.Types.ObjectId.isValid(propertyId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));
    if (!req.user) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN));


    const property = await Property.findById(propertyId);
    if (!property) return next(errorHandler(statusCode.NOT_FOUND, errorMessages.COMMON.NOT_FOUND));

    switch (role) {

        case roles.USER:
            if (property.clientId?.toString() !== req.user._id.toString()) return next(errorHandler(statusCode.FORBIDDEN, errorMessages.COMMON.FORBIDDEN));
            break;

        case roles.CLIENT:
            if (property.clientId?.toString() !== req.user._id.toString()) return next(errorHandler(statusCode.FORBIDDEN, errorMessages.COMMON.FORBIDDEN));
            break;

        case roles.AGENT:
            if (property.agentId?.toString() !== req.user._id.toString()) return next(errorHandler(statusCode.FORBIDDEN, errorMessages.COMMON.FORBIDDEN));
            break;

        case roles.ADMIN:
            break;

        default:
            return next(errorHandler(statusCode.FORBIDDEN, errorMessages.COMMON.FORBIDDEN));

    }

    // ! Clean up related data if any (e.g., images, bookings, etc.) , specially the s3
    if (role === roles.ADMIN || role === roles.AGENT) {
        await property.deleteOne();
    }

    else if (role === roles.CLIENT || role === roles.USER) {

        if (property.advanced.state !== statesTypes.toBeAdded) {

            property.active = false
            property.advanced = {
                state: statesTypes.toBeDeleted,
                available: null,
                updated_version: {},
            };
            await property.save();
        }
        else {
            await property.deleteOne();
        }
    }


    res.status(statusCode.OK).json({
        success: true,
        message: 'Property deleted successfully',
    });



}

// ? including decline delete
export const declinePropertyChanges = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const propertyId = req.params.propertyId;
    const role = req.user?.role;

    if (!propertyId || !mongoose.Types.ObjectId.isValid(propertyId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));
    if (!req.user) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN));


    const property = await Property.findById(propertyId);
    if (!property) return next(errorHandler(statusCode.NOT_FOUND, errorMessages.COMMON.NOT_FOUND));

    switch (role) {
        case roles.USER:
            if (property.clientId?.toString() !== req.user._id.toString()) return next(errorHandler(statusCode.FORBIDDEN, errorMessages.COMMON.FORBIDDEN));
            break;
        case roles.CLIENT:
            if (property.clientId?.toString() !== req.user._id.toString()) return next(errorHandler(statusCode.FORBIDDEN, errorMessages.COMMON.FORBIDDEN));
            break;
        case roles.AGENT:
            if (property.agentId?.toString() !== req.user._id.toString()) return next(errorHandler(statusCode.FORBIDDEN, errorMessages.COMMON.FORBIDDEN));
            break;
        case roles.ADMIN:
            break;
        default:
            return next(errorHandler(statusCode.FORBIDDEN, errorMessages.COMMON.FORBIDDEN));
    }

    // ! Clean up related data if any (e.g., images, bookings, etc.) , specially the s3
    // ! sur dima property.active 7atta f decline request t3 unavaible ? 
    property.active = true
    property.advanced = {
        state: statesTypes.active,
        available: null,
        updated_version: {},
    };
    await property.save();

    res.status(statusCode.OK).json('Property updated successfully');

}




export const unavailable = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    if (!req.user) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN));

    const propertyId = req.params.propertyId;
    if (!propertyId || !mongoose.Types.ObjectId.isValid(propertyId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));



    const property = await Property.findById(propertyId);
    if (!property) return next(errorHandler(statusCode.NOT_FOUND, errorMessages.COMMON.NOT_FOUND));

    const role = req.user.role;
    const popertyState = property.advanced.state;
    // if (property.clientId !== req.user?._id.toString()) return next(errorHandler(statusCode.FORBIDDEN, errorMessages.COMMON.FORBIDDEN));

    switch (role) {
        case roles.AGENT:
            if (property.agentId?.toString() !== req.user._id.toString()) return next(errorHandler(statusCode.TEAPOT, errorMessages.COMMON.FORBIDDEN));
            break;
        case roles.ADMIN:
            break;
        default:
            return next(errorHandler(statusCode.FORBIDDEN, errorMessages.COMMON.FORBIDDEN));
    }

    if (popertyState === statesTypes.active) {
        property.active = false
        property.advanced = {
            state: statesTypes.unavailable,
            available: null,
            updated_version: {},
        }
    }

    else if (popertyState === statesTypes.unavailable) {
        property.active = true
        property.advanced = {
            state: statesTypes.active,
            available: null,
            updated_version: {},
        };

    }

    await property.save();


    res.status(statusCode.OK).json('Property updated successfully');


}




export const getAllProperties = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {


    const [properties, total] = await Promise.all([
        Property.find({}).limit(10).skip((Number(req.query.page) || 1) - 1).sort({ createdAt: -1 }).populate(['agentId', 'clientId']),
        Property.countDocuments({}),
    ]);

    const updatedProperties = properties.map((property) => addSignedUrl(property));

    res.set('x-total-count', total.toString());

    res.status(statusCode.OK).json({
        success: true,
        message: 'Properties fetched successfully',
        result: updatedProperties,
    });
}



export const featureProperty = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log("sdfjipsdpjif")
    const propertyId = req.params.propertyId;
    if (!propertyId || !mongoose.Types.ObjectId.isValid(propertyId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    const property = await Property.findById(propertyId);
    if (!property) return next(errorHandler(statusCode.NOT_FOUND, errorMessages.COMMON.NOT_FOUND));

    property.featured = !property.featured;
    if (!property.featured) property.featured = false
    await property.save();

    res.status(statusCode.OK).json('Property updated successfully');


}