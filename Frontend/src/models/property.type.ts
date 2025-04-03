type Iproperty = {
    _id: string

    title: string,
    description: string,

    category: string,
    sub_category: string,

    city: string,
    delegation: string,
    addresse: string,

    imgs: string[],

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
        [key: string]: number;
    }
    additionalDetails: string[]

    available: Date | undefined, // badl undefined b null b3d 
}


    export default Iproperty;
