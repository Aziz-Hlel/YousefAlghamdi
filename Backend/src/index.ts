import dotenv from "dotenv"
import app from "./app"
import connectDB from "./config/db"







dotenv.config()
connectDB() 




const port = process.env.PORT


app.listen(port,()=>{
    console.log(`Now listening on port ${port} \n go to http://localhost:50/ `);
}); 
