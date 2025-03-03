import mongoose from "mongoose"


const connectDB = async() =>{
    try{

        const MONGO_URI = process.env.MONGO_URI??  "mongodb://127.0.0.1:27017/testDB"
        
        const conn = await mongoose.connect(MONGO_URI);

        console.log(`Mongo connected : : ${conn.connection.host}`);

    } catch (error : any){
        console.error(`Error : ${error.message}`);
    }
}





export default connectDB;