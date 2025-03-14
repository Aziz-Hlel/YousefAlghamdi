import apiGateway from "@src/apiGateway";
import Iproperty from "@src/models/estate.type";
import Http from "@src/services/Http";
import { useEffect, useState } from "react";



export const useGetProperty = ( id :string ) => {

    const [property, setProperty] = useState<Iproperty | null>(null);

    const updateProperty = async () => {
        const response = await Http.get<any>(`${apiGateway.estate}\\${id}`);
        const property: Iproperty = response.data.result

        setProperty(property);
    };

    useEffect(() => {
        updateProperty();
    }, []);


    return {  property }
}