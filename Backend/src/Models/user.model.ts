import mongoose, { mongo, Schema } from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new Schema({

    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },

    lastName: {
        tpye: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true

    },

    password: {
        type: String,
        required: true,
    },


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


const User = mongoose.model('User', userSchema);

export default User;