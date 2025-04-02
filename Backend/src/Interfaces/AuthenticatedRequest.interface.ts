import { Request } from "express";
import { IUser } from "../Models/user.model";



interface AuthenticatedRequest extends Request {
    user?: IUser;
}

export default AuthenticatedRequest;