import { Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../Models/user.model";


const ACCESS_SECRET = process.env.ACCESS_SECRET || "access_secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh_secret";


const accessTokenLifeSpan = "15m";
const refreshTokenLifeSpan = "7d";


const generateAccessToken = (user: IUser) => {
    const payload = {
        id: user._id,  // Or whichever identifier you want to include
        firstName: user.firstName,
        // Any other fields you want to include in the token
    };

    return jwt.sign({}, ACCESS_SECRET, { expiresIn: accessTokenLifeSpan });
};


const generateRefreshToken = (user: IUser) => {
    const payload = {
        id: user._id,  // Or whichever identifier you want to include
        firstName: user.firstName,
        // Any other fields you want to include in the token
    };

    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: refreshTokenLifeSpan });
};





const generateToken = (res: Response, user: IUser) => {


    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // Set to true in production (HTTPS only)
        // sameSite: "strict",
    });

    res.json({ accessToken });

}


export default generateToken;