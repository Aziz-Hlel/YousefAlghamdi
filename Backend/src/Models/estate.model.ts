import mongoose, { Schema } from "mongoose";
import filterFieldsTypes from "./filterFields.type";



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

    filterFields: filterFieldsTypes,

    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200,
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

    city: {
        type: String,
    },

    productTier: {
        type: String,
        required: true,
    },

    clientId: {
        type: String,
        required: true,
    },

    agentId: {
        type: String,
        required: true,
    },

    available: {
        type: Date,
        required: false,
        default: null,
    }

},
    { timestamps: true },
);


const Estate = mongoose.model('Estate', estateSchema);

export default Estate;