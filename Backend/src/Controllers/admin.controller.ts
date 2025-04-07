
import { Request, Response, NextFunction } from 'express';
import Property from '../Models/property.model';
import statesTypes from '../types/states.types';









export const getPendingProperties = async (req: Request, res: Response, next: NextFunction) => {



    // if (!userId) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    try {

        const [pendingProperties, pendingPropertiesCount] = await Promise.all([

            Property.find({ state: { $ne: statesTypes.active } }),
            Property.countDocuments({ state: { $ne: statesTypes.active } })
        ]);

        res.set("X-Total-Count", pendingPropertiesCount.toString()); // Optional, useful for frontend
        res.json({
            result: pendingProperties,
        });
    } catch (error) {
        next(error);
    }


};




