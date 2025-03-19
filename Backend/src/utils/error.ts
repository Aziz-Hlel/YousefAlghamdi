import { ZodIssue } from "zod";


interface IApiErrorResponse {
    statusCode: number;
    message: string;
    errors?: string[];
}


export const errorHandler = (statusCode: any, message: string, errors?: ZodIssue[]) => {


    const ApiErrorResponse: IApiErrorResponse = { statusCode, message };


    if (errors && errors.length > 0) {
        const errorMessages = errors.map(err => err.message);
        ApiErrorResponse.errors = errorMessages;
    }

    return ApiErrorResponse;

};