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

    listing_period: string,

    additionalDetails: string[];

    nearestPlaces: {
        [key: string]: string;
    },


    clientId: string,
    agentId?: string,



    featured: boolean,

    active: boolean,

    advanced: {
        state: string,
        available: Date | null,
        updated_version: { [key: string]: any }
    },

}




export interface Iproperty_model extends Document, Iproperty { }



const imageSchema = new mongoose.Schema({

    key: { type: String, default: "", required: true },


}, { _id: false });


const propertySchema = new mongoose.Schema({

    title: { type: String, required: true, default: " ", trim: true },

    description: { type: String, required: true, default: " ", trim: true, },

    category: { type: String, default: " ", required: true, },

    sub_category: { type: String, default: " ", required: true, },

    city: { type: String, default: " ", required: true, },

    delegation: { type: String, default: " ", required: true, },

    addresse: { type: String, default: " ", required: true, },

    imageGallery: {

        folderId: { type: String, default: " ", required: true },

        images: [imageSchema],

    },

    filterFields: filterFieldsTypes,

    listing_type: { type: String, default: "", required: true, },

    listing_period: { type: String, },

    additionalDetails: { type: [String], default: [] },

    nearestPlaces: { type: Map, of: String, default: {} },

    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },

    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },

    featured: { type: Boolean, default: false, },

    active: { type: Boolean, default: false, },


    advanced: {
        state: {
            type: String,
            required: true,
            default: "",
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


    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform(_, ret) {
                // Remove sensitive and internal fields
                delete ret._id;
                delete ret.createdAt;
                delete ret.updatedAt;
                return ret;
            }
        }
    },

);


const Property = mongoose.model<Iproperty_model>('Property', propertySchema);

export default Property;