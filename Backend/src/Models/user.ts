import mongoose, { mongo, Schema } from "mongoose";








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




},
    { timestamps: true }
)




const User = mongoose.model('User', userSchema);

export default User;