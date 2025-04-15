import { Request } from "express";
import { IUser_model } from "../Models/user.model";



interface AuthenticatedRequest extends Request {
    user?: IUser_model;
}

export default AuthenticatedRequest;