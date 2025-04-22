

const errorMessages = {

    COMMON: {
        BAD_Request: "bad request",
        Invalid_Credentials: "Invalid credentials",
        User_Already_Exists: "User already exists",
        FORBIDDEN: "forbidden",
        NOT_FOUND: "not found",
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
    // PERMISSION:{
    //     FORBIDDEN: "forbidden",
    // }
};



export default errorMessages;