import mongoose, { model, Schema, Document, mongo } from "mongoose";






interface ISponsor {
    _id: string;
    name: string;
    logo: string;
    url: string;
}


interface ISponsorModel extends Document, ISponsor {
    _id: string;
}



const sponsorSchema = new Schema<ISponsorModel>(
    {

        name: { type: String, required: true },
        logo: { type: String, required: true },
        url: { type: String, required: true },
    },
    { timestamps: true }
);



export const Sponsors = model<ISponsorModel>("Sponsor", sponsorSchema);