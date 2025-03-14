import Iproperty from "@src/models/estate.type";
import { useGetProperty } from "@src/useApi/useGetProperty";
import { createContext, ReactNode, useContext, useState } from "react";


interface IpropertySingleProvider {

    property: Iproperty | null,
}

export const SinglePropertyContext = createContext<IpropertySingleProvider | undefined>(undefined);




export const SinglePropertyProvider = ({ children, id }: { children: ReactNode, id: string | null }) => {


    const { property } = useGetProperty(id ?? "");


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
