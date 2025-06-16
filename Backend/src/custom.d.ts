import { IUser_model,UserJSON } from "./Models/user.model";


declare global {


    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'local';
            PORT: number;
            MONGO_URI: string;
            JWT_ACCESS_SECRET: string,
            JWT_REFRESH_SECRET: string,
            FRONT_URL: string,
            MONGO_INITDB_ROOT_USERNAME: string,
            MONGO_INITDB_ROOT_PASSWORD: string,
            MONGO_INITDB_DATABASE: string,
        }
    }

    namespace Express {
        interface Request {
            user?: UserJSON
        }
    }


    // namespace Express
}


export { };