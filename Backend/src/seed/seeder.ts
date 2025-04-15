import mongoose from "mongoose";
import ENV from "../utils/ENV.variables";
import createAgents from "./data/Agents.dummyData";
import Agent from "../Models/agent.model";
import createUser from "./data/Users.dummyData";
import User from "../Models/user.model";






const seedData = async () => {

    await mongoose.connect(ENV.MONGO_URI);

    // Clear existing data if needed
    // await Product.deleteMany();
    const agentsData = await createAgents();

    const agents = await Agent.insertMany(agentsData);

    const usersData = await createUser(agents);

    await User.insertMany(usersData);

    

    await mongoose.disconnect();

}



// seedData();