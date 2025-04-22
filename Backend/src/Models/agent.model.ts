import mongoose, { mongo, Schema } from "mongoose";
import bcrypt from "bcrypt";
import roles from "../types/roles.type";


export interface IAgent {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       //sqqs
    _id: mongoose.Types.ObjectId;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       //sqqs
    firstName: string;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      //sqqs
    lastName: string;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       //sqqs
    email: string;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      //sqqs
    phoneNumber: string;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        //sqqs
    role: string;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       //sqqs
    adresse: string;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        //sqqs
    image: string;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      //sqqs
    socials: {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      //sqqs
        whatsApp: string;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       //sqqs
        linkedin: string;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       //sqqs
        twitter: string;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        //sqqs
        instagram: string;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      //sqqs
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       //sqqs
    about: string;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      //sqqs

}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       //sqqs


export interface IAgentModel extends Document, IAgent {
    password: string;
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

const Agent = mongoose.model<IAgentModel>('Agent', agentSchema);

export default Agent;