import mongoose, { mongo, Schema } from "mongoose";
import bcrypt from "bcrypt";


export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
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
        default: "user",
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
    return bcrypt.compareSync(enteredPassword, this.password);
}

const User = mongoose.model<IUser>('User', userSchema);

export default User;