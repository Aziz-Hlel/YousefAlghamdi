import express, { NextFunction, Request, Response } from 'express'
import userRouter from './Routes/user.route'
import estateRouter from './Routes/estate.route';
import cookieParser from 'cookie-parser';
import path from 'path';



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use('/api/user', userRouter);
app.use('/api/estate', estateRouter);

// Serve static files
app.use('/images', express.static(path.join(__dirname, '../public/images')));


app.get('', (req, res) => {
    res.send('Works ')
})


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});


export default app;