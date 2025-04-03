import mongoose, { Schema } from "mongoose";
import filterFieldsTypes from "./filterFields.type";


export interface Iproperty extends Document {
    _id: mongoose.Types.ObjectId;

    title: string,
    description: string,

    category: string,
    sub_category: string,

    city: string,
    delegation: string,
    addresse: string,

    imgs: string[],
    videos: string[],

    listing_type: string,
    productTier: string,

    clientId: string,
    agentId: string,

    filterFields: {
        price: number,
        area: number,
        rooms?: number,
        bathrooms?: number,
    },

    nearestPlaces: {
        [key: string]: string;
    }
    additionalDetails: {
        [key: string]: string,
    }

    available: Date | undefined, // badl undefined b null b3d 
}


const propertySchema = new mongoose.Schema({

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
        maxlength: 200,
        trim: true,
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

    imgs: {
        type: [String],
        required: true,
    },

    filterFields: filterFieldsTypes,

    listing_type: {
        type: String,
        required: false,
    },

    additionalDetails: {
        type: [String],
    },

    nearestPlaces: { type: Map, of: String },


    productTier: {
        type: String,
        required: true,
    },

    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },

    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },

    available: {
        type: Date,
        required: false,
        default: null,
    },


},

    { timestamps: true },

);


const Property = mongoose.model<Iproperty>('Estate', propertySchema);

export default Property;