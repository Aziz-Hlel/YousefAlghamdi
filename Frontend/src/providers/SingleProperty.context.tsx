import Iproperty from "@src/models/property.type";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface IpropertySingleProvider {

    property: Iproperty | undefined,
}

const SinglePropertyContext = createContext<IpropertySingleProvider | undefined>(undefined);





export const SinglePropertyProvider = ({ children, id }: { children: ReactNode, id: string | undefined }) => {

    // const { propertyId } = useParams()

    const [property, setProperty] = useState<Iproperty | undefined>(undefined);
    const navigate = useNavigate();
    const updateProperty = async () => {
        // const property: Iproperty =  (await Http.get<Iproperty>(`${apiGateway.property.getById}/${id}`)).data.result;
        const response = await Http.get(`${apiGateway.property.getById}/${id}`);
        response?.status === 200 && setProperty(response.data.result)

        if (response?.status !== 200)
            navigate("*")

        // console.log("property", typeof property);
        // console.log(property)

        // const property: Iproperty = response.data.result

        // setProperty(response.data.result);
    };

    useEffect(() => {
        id && updateProperty();
    }, [id]);

    return (
        <SinglePropertyContext.Provider value={{ property }}>
            {children}
        </SinglePropertyContext.Provider>
    )
}





export const useSinglePropertyContext = () => {
    const context = useContext(SinglePropertyContext);
    if (!context) {
        throw new Error("useSinglePropertyContext must be used within a SinglePropertyContext");
    }
    return context;
};
