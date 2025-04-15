import { IUser_model } from "./Models/user.model";


declare global {


    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            PORT: number;
            MONGO_URI: string;
            JWT_ACCESS_SECRET: string,
            JWT_REFRESH_SECRET: string,
        }
    }

    namespace Express {
        interface Request {
            user?: IUser_model
        }
    }


    // namespace Express
}


export { };