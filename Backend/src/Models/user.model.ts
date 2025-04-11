import mongoose, { mongo, Schema } from "mongoose";
import bcrypt from "bcrypt";
import roles from "../types/roles.type";


export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
    agentId?: string;
    matchPassword(enteredPassword: string): Promise<boolean>;
}


const userSchema = new Schema({

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

    agentId: {
        type: Schema.Types.ObjectId,
        ref: 'Agent',
        default: null,
    }
},
    { timestamps: true }
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


const User = mongoose.model<IUser>('User', userSchema);

export default User;