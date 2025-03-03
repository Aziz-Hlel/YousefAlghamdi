import mongoose from "mongoose";






const estateSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },

    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },

    imgs: {
        type: [String],
        required: true,
    },

    videos : {
        type : [String],
        required : false,
    },

    state :{
        type : String,
        
    }


},
    { timestamps: true },
)