import mongoose from "mongoose"
import ENV from "../utils/ENV.variables";


const connectDB = async() =>{
    try{

        const MONGO_URI = ENV.MONGO_URI
        
        const conn = await mongoose.connect(MONGO_URI);

        console.log(`Mongo connected : : ${conn.connection.host}`);

    } catch (error : any){
        console.error(`Error : ${error.message}`);
    }
}





export default connectDB;