import mongoose from "mongoose";
import roles from "../../types/roles.type";
import hashPassword from "../hashPassword";
import bcrypt from "bcrypt";
import { IUser } from "../../Models/user.model";


interface IUser_wPassword extends IUser {
  password: string
}

const createAgents = async (): Promise<IUser_wPassword[]> => {


  return [];
};


export default createAgents;