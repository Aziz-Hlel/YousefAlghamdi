

const errorMessages = {

    COMMON: {
        BAD_Request: "bad request",
        Invalid_Credentials: "Invalid credentials",
        User_Already_Exists: "User already exists",
        FORBIDDEN: "forbidden",
        NOT_FOUND: "not found",
        INTERNAL_SERVER_ERROR: "internal server error",
    },

    AUTH: {
        INVALID_TOKEN: "invalid token",
        PERMISSION_DENIED: "permission denied",
        INVALID_CREDENTIALS: "invalid credentials",
        TOKEN_EXPIRED: "token expired",

    },

    IMAGES: {
        INVALID_IMAGE_TYPE: "invalid image type",
        MAX_SIZE: "max size",
        FILE_NOT_FOUND: "file not found",
        INVALID_PURPOSE_TYPE: "invalid purpose type",

    },
    TEA_POT: "Teapot",
    SERVICES: {
        EMAIL: "Could not send email",
        EXPIREDLINK: "Expired link",
    }
    // PERMISSION:{
    //     FORBIDDEN: "forbidden",
    // }
};



export default errorMessages;