import { ZodIssue } from "zod";

export const errorHandler = (statusCode: any, message: string, erros?: ZodIssue[]) => {
    { erros && console.log(erros) }
    let error: any = {};
    error.statusCode = statusCode;
    error.message = message;
    error.errors = erros;
    return error;
};