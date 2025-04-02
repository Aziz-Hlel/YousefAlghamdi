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


const generateAccessToken = (user: IUser) => {
    const payload = {
        _id: user._id,  // Or whichever identifier you want to include
        firstName: user.firstName,
        role: user.role,
        // Any other fields you want to include in the token
    };

    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: accessTokenLifeSpan });
};


const generateRefreshToken = (user: IUser) => {
    const payload = {
        _id: user._id,  // Or whichever identifier you want to include
        firstName: user.firstName,
        // Any other fields you want to include in the token
    };

    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: refreshTokenLifeSpan });
};





const generateToken = (res: Response, user: IUser) => {
    console.log(ACCESS_SECRET)

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: __production__ === "production",
        // sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });

}


export default generateToken;