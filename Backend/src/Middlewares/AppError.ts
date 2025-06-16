
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: number;
    public readonly isOperational: boolean;
    public readonly details?: any;

    constructor(
        message: string,
        statusCode: number = 500,
        code: number = 500,
        isOperational: boolean = true,
        details?: any
    ) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = isOperational;
        this.details = details;

        Error.captureStackTrace(this, this.constructor);
    }
}

export const isAppError = (error: any): error is AppError => {
    return error instanceof AppError;
};