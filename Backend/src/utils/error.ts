import { ZodIssue } from "zod";


interface IApiErrorResponse {
    statusCode: number;
    message: string;
    errors?: any;
}


export const errorHandler = (statusCode: any, message: string, errors?: any) => {




    const ApiErrorResponse: IApiErrorResponse = { statusCode, message };


    if (errors && Object.keys(errors).length > 0) {
        ApiErrorResponse.errors = errors;
    }

    return ApiErrorResponse;


};