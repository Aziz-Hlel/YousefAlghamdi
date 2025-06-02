import { NextFunction, Request, Response } from "express";
import { errorHandler } from '../utils/error'
import User from '../Models/user.model';
import errorMessages from "../utils/errorMessages";
import statusCode from "../utils/statusCode";
import z from "zod";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest.interface";
import mongoose from "mongoose";
import roles from "../types/roles.type";
import Property from "../Models/property.model";
import ENV from "../utils/ENV.variables";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../services/emailService";
import { TokenService } from "../utils/generateJWT";


export const test = async (req: AuthenticatedRequest, res: Response) => {
    res.json({ message: 'API is working! ', user: req.user });
};

const registerBodySchema = z.object({
    firstName: z.string({ required_error: "First name is required" })
        .min(1, { message: "First name is required" })  // Custom message for required field
        .min(2, { message: "First name must be at least 2 characters long" })
        .max(25, { message: "First name must be at most 25 characters long" })
        .regex(/^[A-Za-z\s]+$/, { message: "First name can only contain letters" }),


    lastName: z.string({ required_error: "Last name is required" })
        .min(1, { message: "Last name must be at least 2 characters long" })
        .max(25, { message: "Last name must be at most 25 characters long" })
        .regex(/^[A-Za-z\s]+$/, { message: "Last name can only contain letters" }),


    phoneNumber: z.string({ required_error: "Phone number is required" })
        .min(1, { message: "Phone number must be at least 5 characters long" })
        .max(17, { message: "Phone number must be at most 17 characters long" }),

    email: z.string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),

    password: z.string({ required_error: "Password is required" })
        .min(1, { message: "Password must be at least 6 characters long" })
        .max(25, { message: "Password must be at most 25 characters long" }),

    confirmPassword: z.string({ required_error: "Confirm password is required" })
        .min(1, { message: "Confirm password must be at least 6 characters long" })
        .max(25, { message: "Confirm password must be at most 25 characters long" }),

}).refine((data) =>
    data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
}
);


export const register = async (req: Request, res: Response, next: NextFunction) => {

    const newUser: any = req.body;
    // console.log('newUser', newUser)
    const validBody = registerBodySchema.safeParse(newUser)

    if (!validBody.success) {
        let zodErrors = {}
        validBody.error.issues.forEach((issue) => zodErrors = { ...zodErrors, [issue.path[0]]: issue.message });
        return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request, zodErrors));
    }


    newUser.role = roles.USER;
    const { email } = newUser;
    const userExist = await User.findOne({ email });

    if (userExist) return next(errorHandler(statusCode.CONFLICT, errorMessages.COMMON.User_Already_Exists));

    const userPreSave = new User(newUser);


    try {

        const user = await userPreSave.save();

        const accessToken = TokenService.generateAccessToken(user);
        const refreshToken = TokenService.generateRefreshToken(user);

        res.status(statusCode.OK).json({
            user: user,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        next(error);
    }

};



const loginBodySchema = z.object({
    email: z.string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),

    password: z.string({ required_error: "Password is required" })
        .min(1, { message: "Password must be at least 6 characters long" })
        .max(25, { message: "Password must be at most 25 characters long" }),

});


export const login = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    const validBody = loginBodySchema.safeParse(req.body)

    if (!validBody.success) {
        let zodErrors = {}
        validBody.error.issues.forEach((issue) => zodErrors = { ...zodErrors, [issue.path[0]]: issue.message });
        return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request, zodErrors));
    }

    let user = await User.findOne({ email }).select('+password');;

    if (!user) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.COMMON.Invalid_Credentials));

    if (!(await user.matchPassword(password))) {

        return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.COMMON.Invalid_Credentials));
    }

    user.set('password', undefined, { strict: false });


    const accessToken = TokenService.generateAccessToken(user);
    const refreshToken = TokenService.generateRefreshToken(user);

    res.json({
        user: user,
        accessToken,
        refreshToken
    });

    res.status(statusCode.OK);

}


export const refresh = async (req: Request, res: Response, next: NextFunction) => {

    const { refreshToken } = req.body;

    if (!refreshToken) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN));

    const userId = await TokenService.validateRefreshToken(refreshToken);


    if (!userId) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN));

    const user = await User.findById(userId);

    if (!user) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN));

    const newAccessToken = TokenService.generateAccessToken(user);
    const newRefreshToken = TokenService.generateRefreshToken(user);

    res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    });

}



export const me = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    console.log('t5l rabk')
    const userId = (req.user as any)?.id

    if (!userId) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN));

    const user = await User.findById(userId);

    if (!user) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN));

    console.log("user document ;;; ", user)
    console.log("user json ;;; ", user.toJSON())


    res.status(statusCode.OK).json({
        result: user,
    });

}





export const logOut = async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", { httpOnly: true, secure: ENV.NODE_ENV === "production", sameSite: 'strict' });
    res.clearCookie("refreshToken", { httpOnly: true, secure: ENV.NODE_ENV === "production", sameSite: 'strict' });
    res.status(statusCode.OK).json()
}


export const getUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const userId = req.params.userId;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));


    try {
        const user = await User.findById(userId).select("-password");

        res.json({

            result: user,
        });

    } catch (e) {
        next(e);
    }

};


export const updateAgentOfClient = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const { userId, agentId } = req.body;

    if (!userId) return next(errorHandler(statusCode.UNAUTHORIZED, errorMessages.AUTH.INVALID_TOKEN));
    if (!agentId || !mongoose.Types.ObjectId.isValid(agentId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));


    try {
        const user = await User.findById(userId);
        const agent = await User.findById(agentId);

        if (!user || user.role !== roles.CLIENT) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));
        if (!agent || agent.role !== roles.AGENT) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

        if (!user.clientInfo) {
            user.clientInfo = {};
        }
        user.clientInfo.agentId = agentId;

        await user.save();

        await Promise.all([

            user.save(),

            Property.bulkWrite([{
                updateMany: {
                    filter: { clientId: userId },
                    update: { $set: { agentId: agentId } },
                }
            }])
        ]);

        res.status(statusCode.OK).json('Agent updated successfully');
    } catch (e) {
        next(e);
    }

};


export const updateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const userId = req.user?.id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    const existingUser = await User.findById(userId);

    if (!existingUser) return next(errorHandler(statusCode.NOT_FOUND, errorMessages.COMMON.BAD_Request));

    const incomingUser = req.body;

    // --------- Global fields you allow to update ----------
    const globalAllowedFields = ['firstName', 'lastName', 'phoneNumber',];

    // --------- Role-specific subdocument update fields ----------
    const roleInfoUpdateRules: Record<string, { path: string, allowedFields: string[] }> = {
        agent: { path: 'agentInfo', allowedFields: ['imageGallery',] },
        admin: { path: 'adminInfo', allowedFields: ['image', 'about', 'address', 'socials'] },
    };

    // Update global fields
    for (const field of globalAllowedFields) {
        if (field in incomingUser) {
            (existingUser as any)[field] = incomingUser[field];
        }
    }


    if (existingUser.role === roles.AGENT && incomingUser.agentInfo.imageGallery.mainImage.key) {
        existingUser.agentInfo!.imageGallery.mainImage.key = incomingUser.agentInfo.imageGallery.mainImage.key;
    }
    if (existingUser.role === roles.AGENT && incomingUser.agentInfo.imageGallery.miniImage.key) {
        existingUser.agentInfo!.imageGallery.miniImage.key = incomingUser.agentInfo.imageGallery.miniImage.key;
    }
    // Update role-specific info if provided
    const roleRule = roleInfoUpdateRules[existingUser.role];

    // if (roleRule && incomingUser[roleRule.path]) {
    //     const existingRoleInfo = (existingUser as any)[roleRule.path]?.toObject() || {};
    //     const incomingRoleInfo = incomingUser[roleRule.path];

    //     // Pick only allowed fields from incoming
    //     const safeIncomingRoleInfo = pick(incomingRoleInfo, roleRule.allowedFields);

    //     let mergedRoleInfo = merge({}, existingRoleInfo, safeIncomingRoleInfo);

    //     // ⚡ Protect critical internal fields
    //     if (existingUser.role === 'agent') {
    //         mergedRoleInfo.clientsId = existingRoleInfo.clientsId;  // Force keep
    //     }

    //     existingUser.email = existingUser.email; // Force keep
    //     existingUser.savedProperties = existingUser.savedProperties; // Force keep

    //     (existingUser as any)[roleRule.path] = mergedRoleInfo;
    // }

    // ⚡ Protect globally critical fields manually
    existingUser.savedProperties = existingUser.savedProperties;

    const updatedUser = await existingUser.save();

    res.status(statusCode.OK).json({
        result: updatedUser,
    });
};


export const changePassword = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    if (password !== confirmPassword) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    if (password.length < 6) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    const userId = req.user?.id;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    try {
        const user = await User.findById(userId).select('+password');
        if (!user) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

        (user as any).password = password;
        await (user as any).save();

        res.clearCookie("accessToken", { httpOnly: true, secure: ENV.NODE_ENV === "production", sameSite: 'strict' });
        res.clearCookie("refreshToken", { httpOnly: true, secure: ENV.NODE_ENV === "production", sameSite: 'strict' });

        res.status(statusCode.OK).json('Password updated successfully');
    } catch (error) {
        return next(error);
    };

    // return next(errorHandler(statusCode.INTERNAL_SERVER_ERROR, errorMessages.INTERNAL_SERVER_ERROR));

};



export const deleteUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const userId = req.user?.id;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    try {

        await Promise.all([
            User.findByIdAndDelete(userId),
            Property.deleteMany({ clientId: userId })
        ]);

        res.status(statusCode.OK).json('User deleted successfully');
    } catch (error) {
        return next(error);
    };



};





export const requestResetPassword = async (req: Request, res: Response, next: NextFunction) => {


    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return next(errorHandler(statusCode.OK, "Password reset link sent successfully"));

    const token = crypto.randomBytes(32).toString("hex");
    const hash = crypto.createHash("sha256").update(token).digest("hex");

    user.resetPasswordToken = hash;
    user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 hour
    await user.save();


    const resetLink = `${ENV.FRONT_URL}/reset-password?token=${token}&email=${email}`;

    try {
        await sendResetPasswordEmail({ email: user.email, resetUrl: resetLink });

    } catch (error) {
        return next(error);
    }


    res.status(statusCode.OK).json('Password reset link sent successfully');
}




export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {

    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));
    console.log('osulll1')
    if (password !== confirmPassword) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));
    console.log('osulll2')
    if (password.length < 6) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    console.log('osulll')
    const token = req.query.token as string;
    const email = req.query.email as string;

    if (!token || !email) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    const hash = crypto.createHash("sha256").update(token).digest("hex");

    if (user.resetPasswordToken !== hash) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    if (!user.resetPasswordExpires || user.resetPasswordExpires.getTime() < Date.now()) return next(errorHandler(statusCode.BAD_REQUEST, errorMessages.COMMON.BAD_Request));

    (user as any).password = password;
    await (user as any).save();

    res.status(statusCode.OK).json('Password updated successfully');
}