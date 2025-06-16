import { Request } from "express";
import { IUser_model, UserJSON } from "../Models/user.model";



interface AuthenticatedRequest extends Request {
    user?: UserJSON;
}

export default AuthenticatedRequest;