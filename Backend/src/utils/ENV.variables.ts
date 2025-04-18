import dotenv from "dotenv"



dotenv.config()

const NODE_ENV = process.env.NODE_ENV ?? ""

const MONGO_INITDB_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME ?? ""
const MONGO_INITDB_ROOT_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD ?? ""
const MONGO_INITDB_DATABASE = process.env.MONGO_INITDB_DATABASE ?? ""

console.log('NODE_ENV', NODE_ENV);

const MONGO_URI = NODE_ENV !== 'local'
    ? `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/${MONGO_INITDB_DATABASE}?authSource=admin`
    : `mongodb://127.0.0.1:27017/${MONGO_INITDB_DATABASE}`



const PORT = process.env.PORT ?? 5000
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? "secret"
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ?? "secret"
const FRONT_URL = process.env.FRONT_URL ?? ""


console.log('MONGO_URI', MONGO_URI);
const ENV = {
    MONGO_URI,
    PORT,
    JWT_REFRESH_SECRET,
    JWT_ACCESS_SECRET,
    NODE_ENV,
    FRONT_URL,
};


(Object.keys(ENV) as Array<keyof typeof ENV>).forEach((key) => { if (!ENV[key]) { throw new Error(`${key} is not defined in the .env file`) } })

console.log(ENV);

export default ENV;