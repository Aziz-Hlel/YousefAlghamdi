import apiGateway from "@src/apiGateway";
import Iproperty from "@src/models/property.type";
import Http from "@src/services/Http";
import { useEffect, useState } from "react";


const initialProperty: Iproperty = {
    _id: "",
    title: "",
    type: "",
    description: "",
    imgs: [],
    videos: [],
    city: "",
    productTier: "",
    clientId: "",
    agentId: "",

    filterFields: {
        price: 0,
        area: 0,
        rooms: 0,
        bathrooms: 0,
        forSale: true,
        forRent: true,
    },
    nearestPlaces: {},
    additionalDetails: {},
    available: undefined, // badl undefined b null b3d 
}

export const useGetProperty = (id: string) => {

    const [property, setProperty] = useState<Iproperty>(initialProperty);

    const updateProperty = async () => {
        const property: Iproperty = await (await Http.get<any>(`${apiGateway.estate}\\${id}`)).data.result;
        console.log("property", typeof property);
        console.log(property)

        // const property: Iproperty = response.data.result

        setProperty(property);
    };

    useEffect(() => {
        updateProperty();
    }, []);


    return { property }
}