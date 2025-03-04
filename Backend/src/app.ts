import express, { NextFunction, Request, Response } from 'express'
import userRouter from './Routes/user.route'



const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);

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