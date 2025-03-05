import { Response } from "express";
import jwt from "jsonwebtoken";


const ACCESS_SECRET = process.env.ACCESS_SECRET || "access_secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh_secret";


const accessTokenLifeSpan = "15m";
const refreshTokenLifeSpan = "7d";


const generateAccessToken = (user: { id: number; username: string }) => {
    return jwt.sign(user, ACCESS_SECRET, { expiresIn: accessTokenLifeSpan });
};


const generateRefreshToken = (user: { id: number; username: string }) => {
    return jwt.sign(user, REFRESH_SECRET, { expiresIn: refreshTokenLifeSpan });
};





const generateToken = (res: Response, user: any) => {


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