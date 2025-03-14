import Iproperty from "@src/models/estate.type";
import { useGetProperty } from "@src/useApi/useGetProperty";
import { createContext, ReactNode, useContext, useState } from "react";


interface IpropertySingleProvider {

    property: Iproperty ,
}

export const SinglePropertyContext = createContext<IpropertySingleProvider | undefined>(undefined);




export const SinglePropertyProvider = ({ children, id }: { children: ReactNode, id: string | undefined }) => {


    const { property } = useGetProperty(id ?? "0");


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
