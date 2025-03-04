import express from 'express'
import userRouter from './Routes/user.route'



const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);

app.get('', (req, res) => {
    res.send('Works ')
})



export default app;