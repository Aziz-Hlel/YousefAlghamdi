import mongoose from "mongoose";
import ENV from "../utils/ENV.variables";






const seedData = async()=> {

    await mongoose.connect(ENV.MONGO_URI);

    // Clear existing data if needed
    // await Product.deleteMany();


}