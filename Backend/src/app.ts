import express, { NextFunction, Request, Response } from 'express';
import userRouter from './Routes/user.route'
import propertyRouter from './Routes/property.route';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import IApiErrorMiddleware from './Interfaces/ApiErrorResponse.interface';
import imgHandlerRouter from './imgHandler';
import agentRouter from './Routes/agent.route';
import ENV from './utils/ENV.variables';
import sponsorRouter from './Routes/sponsor.route';



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: [ENV.FRONT_URL],  // Make sure to specify the exact frontend URL                                    

    credentials: true,  // Necessary for cookies or authorization headers                                   

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    exposedHeaders: ['Content-Range', 'X-Total-Count', "Content-Type", "Authorization"],

}));

app.use('/health', (_, res) => {
    res.status(200)
        .json("i feel good!");
});

app.use('/api/user', userRouter);
app.use('/api/property', propertyRouter);
app.use('/api/agent', agentRouter);
app.use('/api/sponsor', sponsorRouter);

// Serve static files                                   
// app.use('/api/images', express.static(path.join(__dirname, '../public/images')));                                    

app.use('/api/images', imgHandlerRouter);


app.get('/api/', (req, res) => {
    console.log(ENV)
    res.send('Works very well')
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



app.get('*', (req, res) => {
    res.status(404).json({ message: 'Route not found', url: req.url });
})

export default app;                                 