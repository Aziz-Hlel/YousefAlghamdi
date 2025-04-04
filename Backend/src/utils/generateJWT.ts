import { Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../Models/user.model";
import dotenv from "dotenv"

dotenv.config()


const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ?? "secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? "secret";
const __production__ = process.env.NODE_ENV;


const accessTokenLifeSpan = "1500m";
const refreshTokenLifeSpan = "7d";


const generateAccessToken = (payload: { [key: string]: any }) => {

    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: accessTokenLifeSpan });
};


const generateRefreshToken = (payload: { [key: string]: any }) => {

    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: refreshTokenLifeSpan });
};





const generateToken = (res: Response, user: IUser) => {

    
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
        secure: __production__ === "production",
        // sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: __production__ === "production",
        // sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    res.json({ result: payload }); 

}


export default generateToken;