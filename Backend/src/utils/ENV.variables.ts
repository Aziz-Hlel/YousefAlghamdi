import dotenv from "dotenv"



dotenv.config()

const NODE_ENV = process.env.NODE_ENV ?? ""

const MONGO_INITDB_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME ?? ""
const MONGO_INITDB_ROOT_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD ?? ""
const MONGO_INITDB_DATABASE = process.env.MONGO_INITDB_DATABASE ?? ""


const MONGO_URI = NODE_ENV !== 'local'
    ? `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/${MONGO_INITDB_DATABASE}?authSource=admin`
    : `mongodb://localhost:27017/${MONGO_INITDB_DATABASE}`
console.log(MONGO_URI)


const PORT = process.env.PORT ?? 5000
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? "secret"
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ?? "secret"
const FRONT_URL = process.env.FRONT_URL ?? ""


const bucketName = process.env.BUCKET_NAME ?? ""
const bucketRegion = process.env.BUCKET_REGION ?? ""
const bucketAccessKey = process.env.BUCKET_ACCESS_KEY ?? ""
const bucketSecretAccessKey = process.env.BUCKET_SECRET_ACCESS_KEY ?? ""

const CDN_DOMAIN = process.env.CDN_DOMAIN ?? "";
const CDN_PUBLIC_KEY_ID = process.env.CDN_PUBLIC_KEY_ID ?? "";
const CDN_PRIVATE_KEY = process.env.CDN_PRIVATE_KEY ?? "";



const EMAIL_HOST = process.env.EMAIL_HOST ?? ""
const EMAIL_PORT = process.env.EMAIL_PORT ?? ""
const EMAIL_SECURE = process.env.EMAIL_SECURE ?? ""
const EMAIL_USER = process.env.EMAIL_USER ?? ""
const EMAIL_PASS = process.env.EMAIL_PASS ?? ""


const ENV = {
    MONGO_URI,
    PORT,
    JWT_REFRESH_SECRET,
    JWT_ACCESS_SECRET,
    NODE_ENV,
    FRONT_URL,

    bucketName,
    bucketRegion,
    bucketAccessKey,
    bucketSecretAccessKey,

    CDN_DOMAIN,
    CDN_PUBLIC_KEY_ID,
    CDN_PRIVATE_KEY,


    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_SECURE,
    EMAIL_USER,
    EMAIL_PASS,
};


(Object.keys(ENV) as Array<keyof typeof ENV>).forEach((key) => { if (!ENV[key]) { throw new Error(`${key} is not defined in the .env file`) } })

console.log(".ENV is valid ");

export default ENV;