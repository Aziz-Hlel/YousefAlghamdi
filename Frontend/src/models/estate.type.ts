export type Iestate = {
    _id:string
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
        height: number,
        width: number,
        rooms?: number,
        bathrooms?: number,
        forSale: boolean,
        forRent: boolean,
    }

}