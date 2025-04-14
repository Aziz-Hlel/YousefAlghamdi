import dotenv from "dotenv"
import app from "./app"
import connectDB from "./config/db"
import ENV from "./utils/ENV.variables"







dotenv.config()
connectDB() 




 

app.listen(ENV.PORT,()=>{
    console.log(`Now listening on port ${ENV.PORT} \n go to http://localhost:50/ `);
}); 
