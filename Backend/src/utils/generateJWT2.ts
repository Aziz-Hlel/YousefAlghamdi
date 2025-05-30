// services/tokenService.ts
import jwt from 'jsonwebtoken';
import { IUser } from '../Models/user.model';
import ENV from './ENV.variables';

interface TokenPayload {
    id: string;
    email: string;
    role?: string;
}

export class TokenService {
    // Short-lived access token (15-30 minutes)
    static generateAccessToken(user: IUser): string {
        const payload: TokenPayload = {
            id: user._id.toString(),
            email: user.email,
            role: user.role
        };

        return jwt.sign(payload, ENV.JWT_ACCESS_SECRET, {
            expiresIn: '2d'
        });
    }

    // Long-lived refresh token (7-30 days)
    static generateRefreshToken(user: IUser): string {
        const payload: TokenPayload = {
            id: user._id.toString(),
            email: user.email,
            role: user.role
        };
        return jwt.sign(payload, ENV.JWT_REFRESH_SECRET, {
            expiresIn: '30d'
        });
    }

    // Store refresh token in database (critical for security)
    //   static async storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    //     await RefreshToken.create({
    //       userId,
    //       token: refreshToken,
    //       expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    //     });
    //   }

    // Validate and rotate refresh token
    static async validateRefreshToken(token: string): Promise<string | null> {
        try {
            const decoded = jwt.verify(token, ENV.JWT_REFRESH_SECRET);

            return (decoded as any).id;
            // const storedToken = await RefreshToken.findOne({ token });

            // if (!storedToken || storedToken.expiresAt < new Date()) {
            //     return null;
            // }

            // return storedToken.userId;
        } catch {
            return null;
        }
    }
}