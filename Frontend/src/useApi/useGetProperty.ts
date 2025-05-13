import apiGateway from "@src/utils/apiGateway";
import Iproperty from "@src/models/property.type";
import Http from "@src/services/Http";
import { useEffect, useState } from "react";


const initialProperty: Iproperty = {
    _id: "",

    title: "",
    description: "",

    category: "",
    sub_category: "",

    city: "",
    delegation: "",
    addresse: "",

    imgs: [],

    listing_type: "",
    productTier: "",

    clientId: "",
    agentId: "",

    filterFields: {
        price: 0,
        area: 0,
        rooms: 0,
        bathrooms: 0,

    },
    nearestPlaces: {},
    additionalDetails: [],


    active: false,

    advanced: {
        available: new Date(),
        state: "",
        updated_version: {},
    },

}




export const useGetProperty = (id: string | undefined) => {

    const [property, setProperty] = useState<any>(initialProperty);

    const updateProperty = async () => {
        // const property: Iproperty =  (await Http.get<Iproperty>(`${apiGateway.property.getById}/${id}`)).data.result;
        const response = await Http.get<any>(`${apiGateway.property.getById}/${id}`);
        response?.status === 200 && setProperty(response.data.result)
        // console.log("property", typeof property);
        // console.log(property)

        // const property: Iproperty = response.data.result

        // setProperty(response.data.result);
    };
    // updateProperty();
    useEffect(() => {
        if (id) updateProperty();
        if (id) console.log("id tbddl fl use hook", id);

    }, [id]);
    // useEffect(() => {
    //   console.log("rab om property = ", property);

    // }, [property]);
    return { property }
}