import mongoose, { mongo, Schema } from "mongoose";
import bcrypt from "bcrypt";
import roles from "../types/roles.type";


export interface IAgent extends Document {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    adresse:string;
    image: string;
    socials: {
        whatsApp: string;
        linkedin: string;
        twitter: string;
        instagram: string;
    }
    about:string;    

    matchPassword(enteredPassword: string): Promise<boolean>;
}




const agentSchema = new Schema({

    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true

    },

    password: {
        type: String,
        required: true,
        select: false
    },

    email: {
        type: String,
        required: true,

    },

    phoneNumber: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        reuqired: true,
        default: roles.AGENT,
    },

    adresse: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: false,
    },

    socials: {
        whatsApp: {
            type: String,
            required: false,
        },
        instagram: {
            type: String,
            required: false,
        },
        twitter: {
            type: String,
            required: false,
        },
        linkedin: {
            type: String,
            required: false,
        },
    },

    about: {
        type: String,
        required: false,
    },

},
    { timestamps: true }
);

agentSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next(); // Only hash if password is modified
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        console.log("8alta fl pre save crypting the password");
        next()
    }

})

agentSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return bcrypt.compareSync(enteredPassword, this.password);
}

const Agent = mongoose.model<IAgent>('Agent', agentSchema);

export default Agent;