import express, { NextFunction, Request, Response } from 'express'
import userRouter from './Routes/user.route'
import propertyRouter from './Routes/property.route';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import IApiErrorMiddleware from './Interfaces/ApiErrorResponse.interface';



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: (origin, callback) => {
        callback(null, true); // Allows all origins dynamically
    },
    credentials: true,  // Necessary for cookies or authorization headers

    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    exposedHeaders: ['Content-Range', 'X-Total-Count', "Content-Type", "Authorization"],

}));



app.use('/api/user', userRouter);
app.use('/api/estate', propertyRouter);

// Serve static files
app.use('/api/images', express.static(path.join(__dirname, '../public/images')));

app.post('/api/images/upload/:imgId', (req: Request, res: Response) => {
    const img = req.body

});

app.get('/api/getSignedUrl', (req: Request, res: Response) => {
    // const userId = req.user?._id
    const urserId = "userid"
    const localhostUrl = "http://localhost:" + process.env.PORT + "/api/images/upload/";
    const randomNumber = Math.floor(Math.random() * 1000);

    res.json({
        result: localhostUrl + urserId + "/" + String(randomNumber)
    });
})

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