import mongoose, { mongo, Schema } from "mongoose";
import bcrypt from "bcrypt";
import roles from "../types/roles.type";



export interface IUser {

    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;

    clientInfo?: {
        agentId?: string,
    };

    agentInfo?: {
        
        imageGallery: {
            folderId: string,
            mainImage: {
                key: string,
                url?: string,
            },
            miniImage: {
                key: string,
                url?: string,
            }
        },

        clientsId: string[],

    };

    adminInfo?: {



        imageGallery: {
            folderId: string,
            mainImage: {
                key: string,
                url?: string,
            },
            miniImage: {
                key: string,
                url?: string,
            }
        },

    };

    savedProperties: string[]
}



export interface IUser_model extends Document, IUser {
    matchPassword(enteredPassword: string): Promise<boolean>;

}


const clientInfoSchema = new mongoose.Schema({
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { _id: false });


const imageGallerySchema = new mongoose.Schema({

    folderId: { type: String, required: false, },

    mainImage: {
        key: { type: String, required: false, },
    },

    miniImage: {
        key: { type: String, required: false, },
    }

}, { _id: false });


const agentInfoSchema = new mongoose.Schema({


    imageGallery: imageGallerySchema,

    clientsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

}, { _id: false });


const adminInfoSchema = new mongoose.Schema({


    imageGallery: imageGallerySchema,


}, { _id: false });



const userSchema = new Schema<IUser_model>({

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
        default: roles.USER,
    },



    clientInfo: { type: clientInfoSchema, required: false, },

    agentInfo: { type: agentInfoSchema, required: false, },

    adminInfo: { type: adminInfoSchema, required: false, },


    savedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
},
    {
        timestamps: true,
        toJSON: { virtuals: true, },
        toObject: { virtuals: true }
    }
);


userSchema.pre('save', async function (next) {
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


userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    if (!enteredPassword || !this.password) {
        throw new Error('Both enteredPassword and stored password are required.');
    }
    return bcrypt.compareSync(enteredPassword, this.password);
}


const User = mongoose.model<IUser_model>('User', userSchema);


export default User;