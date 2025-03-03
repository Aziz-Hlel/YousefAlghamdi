import dotenv from "dotenv"
import app from "./app"







dotenv.config()





const port = process.env.PORT


app.listen(port,()=>{
    console.log(`Now listening on port ${port} \n go to http://localhost:50/ `);
})