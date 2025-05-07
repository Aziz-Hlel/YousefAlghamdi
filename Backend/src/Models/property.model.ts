import mongoose, { Schema } from "mongoose";
import filterFieldsTypes from "./filterFields.type";

export interface Iproperty {
    _id: mongoose.Types.ObjectId;

    title: string,
    description: string,

    category: string,
    sub_category: string,

    city: string,
    delegation: string,
    addresse: string,

    imageGallery: {
        folderId: string,
        images: {
            key: string,
            url: string,
        }[],
    }
    // videos: string[],

    filterFields: {
        price: string,
        area: string,
        rooms?: string,
        bathrooms?: string,
    },

    listing_type: string,

    additionalDetails: string[];

    nearestPlaces: {
        [key: string]: string;
    },

    productTier: string,

    clientId: string,
    agentId: string,




    active: boolean,

    advanced: {
        state: string,
        available: Date | null,
        updated_version: { [key: string]: any }
    },

}




export interface Iproperty_model extends Document, Iproperty { }



const imageSchema = new mongoose.Schema({

    key: { type: String, required: true },


}, { _id: false });


const propertySchema = new mongoose.Schema({

    title: { type: String, required: true, trim: true },

    description: { type: String, required: true, trim: true, },

    category: { type: String, required: true, },

    sub_category: { type: String, required: true, },

    city: { type: String, required: true, },

    delegation: { type: String, required: true, },

    addresse: { type: String, required: true, },

    imageGallery: {

        folderId: { type: String, required: true },

        images: [imageSchema],

    },

    filterFields: filterFieldsTypes,

    listing_type: { type: String, required: true, },

    additionalDetails: { type: [String], },

    nearestPlaces: { type: Map, of: String },


    productTier: { type: String, required: true, },

    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },

    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', default: null, },


    active: { type: Boolean, default: false, },


    advanced: {
        state: {
            type: String,
            required: true,
        },
        available: {
            type: Date,
            required: false,
            default: null,
        },
        updated_version: {
            type: Map, of: Schema.Types.Mixed,
            default: null,
        } // allows any type for values 

    },



},


    { timestamps: true },

);


const Property = mongoose.model<Iproperty_model>('Estate', propertySchema);

export default Property;