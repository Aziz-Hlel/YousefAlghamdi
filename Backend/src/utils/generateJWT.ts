import { Response } from "express";
import jwt from "jsonwebtoken";
import { IUser_model } from "../Models/user.model";
import ENV from "./ENV.variables";



const ACCESS_SECRET = ENV.JWT_ACCESS_SECRET
const REFRESH_SECRET = ENV.JWT_REFRESH_SECRET
export const NODE_ENV = ENV.NODE_ENV;


const accessTokenLifeSpan = "10m";
const refreshTokenLifeSpan = "1d";


const generateAccessToken = (payload: { [key: string]: any }) => {

    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: accessTokenLifeSpan });

};


const generateRefreshToken = (payload: { [key: string]: any }) => {

    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: refreshTokenLifeSpan });

};





const generateToken = (res: Response, user: IUser_model) => {

    const payload = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,

    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    res.json({ result: payload });

}


export default generateToken;