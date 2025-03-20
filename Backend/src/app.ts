import express, { NextFunction, Request, Response } from 'express'
import userRouter from './Routes/user.route'
import estateRouter from './Routes/estate.route';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import IApiErrorMiddleware from './Interfaces/ApiErrorResponse.interface';



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: ['http://localhost:70', "https://4c8f-41-225-176-145.ngrok-free.app"], // Allow only your frontend origin
    credentials: true,               // Allow cookies if needed

    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    exposedHeaders: ['Content-Range', 'X-Total-Count', "Content-Type", "Authorization"],

}));



app.use('/api/user', userRouter);
app.use('/api/estate', estateRouter);

// Serve static files
app.use('/api/images', express.static(path.join(__dirname, '../public/images')));



app.get('', (req, res) => {
    res.send('Works ')
})


app.use((err: IApiErrorMiddleware, req: Request, res: Response, next: NextFunction) => {

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message,
        errors: err.errors
    });


});


export default app;