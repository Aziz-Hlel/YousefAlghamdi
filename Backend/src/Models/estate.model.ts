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

    category: {
        type: String,
        required: true,
    },

    sub_category: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: false,

    },

    delegation: {
        type: String,
        required: false,

    },

    addresse: {
        type: String,
        required: false,
    },

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

    filterFields: filterFieldsTypes,

    additionalDetails: { type: Map, of: String },

    nearestPlaces: { type: Map, of: String },


    productTier: {
        type: String,
        required: true,
    },

    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    available: {
        type: Date,
        required: false,
        default: null,
    },


},
    { timestamps: true },
);


const Estate = mongoose.model('Estate', estateSchema);

export default Estate;