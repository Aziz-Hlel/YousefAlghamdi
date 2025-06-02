import app from "./app"
import connectDB from "./config/db"
import ENV from "./utils/ENV.variables"







connectDB() 




 

app.listen(ENV.PORT,()=>{
    console.log(`Now listening on port ${ENV.PORT} \n go to http://localhost:${ENV.PORT}/ `);
}); 
