import Iproperty from "@src/models/property.type";
import { useGetProperty } from "@src/useApi/useGetProperty";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";


interface IpropertySingleProvider {

    property: Iproperty,
}

export const SinglePropertyContext = createContext<IpropertySingleProvider | undefined>(undefined);




export const SinglePropertyProvider = ({ children, id }: { children: ReactNode, id: string }) => {

    // const { propertyId } = useParams()
    const { property } = useGetProperty(id ?? "0");

    useEffect(() => {
        id !== "0" && console.log("nik din rbk ?", id);
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
