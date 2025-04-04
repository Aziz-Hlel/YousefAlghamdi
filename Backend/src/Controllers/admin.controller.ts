
import { Request, Response, NextFunction } from 'express';









const getPendingProperties = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    console.log('userId', userId)



}