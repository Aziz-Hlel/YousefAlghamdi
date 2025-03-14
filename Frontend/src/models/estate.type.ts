type Iestate = {
    _id: string
    title: string,
    type: string,
    description: string,
    imgs: string[],
    videos: string[],
    city: string,
    productTier: string,
    clientId: string,
    agentId: string,

    filterFields: {
        price: number,
        area: number,
        rooms?: number,
        bathrooms?: number,
        forSale: boolean,
        forRent: boolean,
    }
    available: Date | undefined, // badl undefined b null b3d 
}


export default Iestate;