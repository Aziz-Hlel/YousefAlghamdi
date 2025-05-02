import { NextFunction, Request, Response } from "express";
import { Sponsors } from "../Models/sponsor.model";
import statusCode from "../utils/statusCode";
import { errorHandler } from "../utils/error";
import errorMessages from "../utils/errorMessages";




export const createSponsor = async (req: Request, res: Response, next: NextFunction) => {

    const { name, logo, url } = req.body;

    if (!name || !logo || !url) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    try {
        const sponsor = await Sponsors.create({ name, logo, url });
        // ! 3adi return ?
        res.status(statusCode.CREATED).json({
            success: true,
            result: sponsor,
        });
    } catch (error) {
        return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));
    }

};



export const getSponsors = async (req: Request, res: Response, next: NextFunction) => {

    const { page, limit } = req.query;
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 6;

    try {

        const [sponsors, total] = await Promise.all([
            Sponsors.find({}).skip((pageNumber - 1) * limitNumber).limit(limitNumber),
            Sponsors.countDocuments({}),
        ]);

        res.set("x-total-count", total.toString());

        res.status(statusCode.OK).json({
            success: true,
            result: sponsors,

        })

    } catch (error) {
        return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));
    }

}








export const getAllSponsors = async (req: Request, res: Response, next: NextFunction) => {

    const sponsors = await Sponsors.find({}).sort({ createdAt: -1 });

    res.status(statusCode.OK).json({
        success: true,
        result: sponsors,
    });
}



export const updateSponser = async (req: Request, res: Response, next: NextFunction) => {

    const { sponsorId } = req.params;
    if (!sponsorId) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    const { name, logo, url } = req.body;
    if (!name || !logo || !url) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    const sponsor = await Sponsors.findById(sponsorId);
    if (!sponsor) return next(errorHandler(statusCode.NOT_FOUND, errorMessages.COMMON.NOT_FOUND));

    try {
        const updatedSponsor = await Sponsors.findByIdAndUpdate(sponsorId, { name, logo, url }, { new: true });
        res.status(statusCode.OK).json({
            success: true,
            result: updatedSponsor,
        });
    } catch (error) {
        return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));
    }

}


export const deleteSponsor = async (req: Request, res: Response, next: NextFunction) => {

    const { sponsorId } = req.params;
    if (!sponsorId) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    const sponsor = await Sponsors.findById(sponsorId);
    if (!sponsor) return next(errorHandler(statusCode.NOT_FOUND, errorMessages.COMMON.NOT_FOUND));

    try {
        await Sponsors.findByIdAndDelete(sponsorId);
        res.status(statusCode.OK).json({
            success: true,
            message: "Sponsor deleted successfully",
        });
    } catch (error) {
        return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));
    }

}