import { NextFunction, Request, Response } from "express";
import { ISponsor, Sponsors } from "../Models/sponsor.model";
import statusCode from "../utils/statusCode";
import { errorHandler } from "../utils/error";
import errorMessages from "../utils/errorMessages";
import { getCDN_SignedUrl } from "../imgHandler";





const addSignedUrl = (sponsor: ISponsor) => {
    const signedUrl = getCDN_SignedUrl(sponsor.image.key);
    sponsor.image.url = signedUrl;
    return sponsor;
}



export const createSponsor = async (req: Request, res: Response, next: NextFunction) => {

    const { name, url, image: { key } } = req.body;

    if (!name || !key || !url) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    try {
        const sponsor = await Sponsors.create({ name, image: { key }, url });

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

        const sponsorsWithSignedUrls = sponsors.map((sponsor) => addSignedUrl(sponsor.toObject()));


        res.set("x-total-count", total.toString());

        res.status(statusCode.OK).json({
            success: true,
            result: sponsorsWithSignedUrls,

        })

    } catch (error) {
        return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));
    }

}








export const getAllSponsors = async (req: Request, res: Response, next: NextFunction) => {

    const sponsors = await Sponsors.find({}).sort({ createdAt: -1 });

    const sponsorsWithSignedUrls = sponsors.map((sponsor) => addSignedUrl(sponsor.toObject()));

    res.status(statusCode.OK).json({
        success: true,
        result: sponsorsWithSignedUrls,
    });
}



export const updateSponser = async (req: Request, res: Response, next: NextFunction) => {

    const { sponsorId } = req.params;
    if (!sponsorId) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    const { name, image: { key }, url } = req.body;

    if (!name || !key || !url) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    const sponsor = await Sponsors.findById(sponsorId);
    if (!sponsor) return next(errorHandler(statusCode.NOT_FOUND, errorMessages.COMMON.NOT_FOUND));

    try {
        const updatedSponsor = await Sponsors.findByIdAndUpdate(sponsorId, { name, image: { key }, url }, { new: true });
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