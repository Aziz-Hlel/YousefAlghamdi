import { IUser } from "@src/providers/AuthProvider.context";

type Iproperty = {
    id: string

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
            url?: string,
        }[],
    },

    listing_type: string,
    listing_period?: string,

    clientId: string | IUser,
    agentId?: string,

    filterFields: {
        price: string,
        area: string,
        rooms?: string,
        bathrooms?: string,
    },

    nearestPlaces: {
        [key: string]: string;
    }
    additionalDetails: string[]

    featured: boolean,
    active: boolean,

    advanced: {
        state: string,
        available: Date,
        updated_version: { [key: string]: any }
    },

}


export default Iproperty;
