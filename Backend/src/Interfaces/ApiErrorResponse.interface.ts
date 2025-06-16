
interface IApiErrorMiddleware {
    statusCode: number;
    message: string;
    errors?: string[];
}

export default IApiErrorMiddleware;