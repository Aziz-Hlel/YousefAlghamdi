import Iproperty from "@src/models/property.type";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import {  createContext, useState, useEffect, useContext } from "react";

type IFeaturedPropertiesContext = {
    properties: Iproperty[]
}


const FeaturedPropertiesContext = createContext<IFeaturedPropertiesContext | undefined>(undefined);




const FeaturedPropertiesProvider = ({ children }: { children: React.ReactNode, }) => {

    const [properties, setProperties] = useState<Iproperty[]>([]);


    const fetchProperties = async (page?: number) => {



        const url = apiGateway.property.feature.listAll

        const response = await Http.get(url, { params: { page: page ?? 1 } });

        const properties: Iproperty[] = response?.data.result || [];

        setProperties(properties);

    };

    useEffect(() => {
        // Fetch properties from API or any other source


        fetchProperties();

    }, []);


    return (
        <FeaturedPropertiesContext.Provider value={{ properties, }}>
            {children}
        </FeaturedPropertiesContext.Provider>
    );


};



export const useFeaturedPropertiesContext = () => {
    const context = useContext(FeaturedPropertiesContext);
    if (!context) {
        throw new Error("useMyPropertiesContext must be used within a MyPropertiesProvider");
    }
    return context;
};


export default FeaturedPropertiesProvider;