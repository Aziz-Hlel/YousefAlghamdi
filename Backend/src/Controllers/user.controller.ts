
import { Request, Response, NextFunction } from 'express'
import { errorHandler } from '../utils/error'
import User from '../Models/user.model';




export const register = async (req: Request, res: Response, next: NextFunction) => {

    const { firstName, lastName, password } = req.body

    if (!firstName || !lastName || !password) next(errorHandler(403, 'You are not allowed to update this user'));

    const newUser = new User({
        firstName,
        lastName,
        password,
    })

    try {
        await newUser.save();
        res.json('Signup successful');
    } catch (error) {
        next(error);
    }


}
