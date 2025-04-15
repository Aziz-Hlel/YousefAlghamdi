import mongoose from "mongoose";
import ENV from "../utils/ENV.variables";
import createAgents from "./data/Agents.dummyData";
import Agent from "../Models/agent.model";
import createUser from "./data/Users.dummyData";
import User from "../Models/user.model";
import createProperties from "./data/properties.dummy";






const seedData = async () => {

    await mongoose.connect(ENV.MONGO_URI);

    // Clear existing data if needed
    // await Product.deleteMany();
    const agentsData = await createAgents();

    const DBagents = await Agent.insertMany(agentsData);

    const DBusers = await createUser(DBagents);

    await User.insertMany(DBusers);

    createProperties(DBusers, DBagents);


    await mongoose.disconnect();

}

seedData();