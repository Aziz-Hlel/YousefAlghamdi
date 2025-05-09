import mongoose, { model, Schema, Document, mongo } from "mongoose";






export interface ISponsor {
    _id: string;
    name: string;
    image: {
        key: string,
        url?: string,
    }
    url: string;
}


interface ISponsorModel extends Document, ISponsor {
    _id: string;
}


const imageSchema = new Schema({
    key: { type: String, required: true },

}, { _id: false });

const sponsorSchema = new Schema<ISponsorModel>(
    {

        name: { type: String, required: true },
        image: imageSchema,
        url: { type: String, required: true },
    },
    { timestamps: true }
);



export const Sponsors = model<ISponsorModel>("Sponsor", sponsorSchema);