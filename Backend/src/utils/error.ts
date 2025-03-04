
export const errorHandler = (statusCode: any, message: string) => {
    let error: any = {};
    error.statusCode = statusCode;
    error.message = message;
    return error;
};