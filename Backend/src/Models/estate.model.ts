import mongoose, { Schema } from "mongoose";






const estateSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },

    type: {
        type: String,
        required: true,
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

    videos: {
        type: [String],
        required: false,
    },

    state: {
        type: String,
    },

    productTier: {
        type: String,
        required: true,
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    agent: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        default: null,
    },




},
    { timestamps: true },
);


const Estate = mongoose.model('Estate', estateSchema);

export default Estate;