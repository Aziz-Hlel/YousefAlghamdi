import dotenv from "dotenv"



dotenv.config()



const MONGO_URI = process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/testDB"
const PORT = process.env.PORT ?? 5000
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? "secret"
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ?? "secret"
const NODE_ENV = process.env.NODE_ENV ?? ""


const ENV = {
    MONGO_URI,
    PORT,
    JWT_REFRESH_SECRET,
    JWT_ACCESS_SECRET,
    NODE_ENV,
};


(Object.keys(ENV) as Array<keyof typeof ENV>).forEach((key) => { if (!ENV[key]) { throw new Error(`${key} is not defined in the .env file`) } })


export default ENV;