import ENV from "../utils/ENV.variables";
import createAgents from "./data/Agents.dummyData";
import createUser from "./data/Users.dummyData";
import User from "../Models/user.model";
import createProperties from "./data/properties.dummy";
import Property from "../Models/property.model";
import mongoose from "mongoose";
import { Sponsors } from "../Models/sponsor.model";
import { createSponsors } from "./data/Sponsors.dummyData";






const seedData = async () => {

    await mongoose.connect(ENV.MONGO_URI);

    // Clear existing data if needed
    await User.deleteMany();
    await Property.deleteMany();
    await Sponsors.deleteMany();
    console.log("☑️   Cleared all existing data!");

    const agentsData = await createAgents();

    const DBagents = await User.insertMany(agentsData);

    console.log("✅   Agents seeded successfully!");


    const DBusers = await createUser(DBagents);

    await User.insertMany(DBusers);

    console.log("✅   Users seeded successfully!");


    const DBproperties = await createProperties(DBusers, DBagents);

    await Property.insertMany(DBproperties);

    console.log("✅   Properties seeded successfully!");


    const DBsponsors = await createSponsors();

    await Sponsors.insertMany(DBsponsors);

    console.log("✅   Sponsors seeded successfully!");


    console.log("🥳🥳🥳   Data seeded successfully!");
    await mongoose.disconnect();

}

seedData();