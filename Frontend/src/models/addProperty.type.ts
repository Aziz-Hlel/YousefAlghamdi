type IaddProperty = {
    title: string,
    type: string,
    description: string,
    imgs: string[],
    videos: string[],
    city: string,

    filterFields: {
        price: number,
        area: number,
        rooms?: number,
        bathrooms?: number,
        forSale: boolean,
        forRent: boolean,
    }

    nearestPlaces: {
        [key: string]: string;
    }
    additionalDetails: {
        [key: string]: string,
    }
}


export default IaddProperty;
