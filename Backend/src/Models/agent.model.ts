import mongoose, { mongo, Schema } from "mongoose";
import bcrypt from "bcrypt";
import roles from "../types/roles.type";


interface Iagent {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    adresse: string;
    image: string;
    socials: {
        whatsApp: string;
        linkedin: string;
        twitter: string;
        instagram: string;
    }
    about: string;
    matchPassword(enteredPassword: string): Promise<boolean>;

}


interface IAgentModel extends Document, Iagent { }

const a: IAgentModel = {
    _id: new mongoose.Types.ObjectId(),
    firstName: "test",
    lastName: "test",
    email: "test",
    phoneNumber: "test",
    role: "test",
    adresse: "test",
    image: "test",
    socials: {
        whatsApp: "test",
        linkedin: "test",
        twitter: "test",
        instagram: "test",
    },
    about: "test",
    matchPassword: async function (enteredPassword: string): Promise<boolean> {
        return false;
    }
}

export interface IAgent extends Document {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    adresse: string;
    image: string;
    socials: {
        whatsApp: string;
        linkedin: string;
        twitter: string;
        instagram: string;
    }
    about: string;

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

    clientsId: {
        type: [String],
        required: false,
    },

},
    {
        timestamps: true,
        toJSON: { virtuals: true, },
        toObject: { virtuals: true }
    }
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

agentSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'agentId',
});

const Agent = mongoose.model<IAgent>('Agent', agentSchema);

export default Agent;