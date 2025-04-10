import Iproperty from "@src/models/property.type";
import { useGetProperty } from "@src/useApi/useGetProperty";
import { createContext, ReactNode, useContext, useState } from "react";
import { useParams } from "react-router-dom";


interface IpropertySingleProvider {

    property: Iproperty,
}

export const SinglePropertyContext = createContext<IpropertySingleProvider | undefined>(undefined);




export const SinglePropertyProvider = ({ children, }: { children: ReactNode }) => {

    const { propertyId } = useParams()
    const { property } = useGetProperty(propertyId ?? "0");


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
