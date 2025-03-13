import { createContext, ReactNode, useContext, useState } from "react";
import { IfilterProperty } from "src/models/filterProperty";


export const defaultFilter: IfilterProperty = {
    forRent: true,
    forSale: true,
    maxNumberOfRooms: 10,
    minNumberOfRooms: 1,
    maxNumberOfBathrooms: 5,
    minNumberOfBathrooms: 1,
    maxNumberOfSquareFeet: 2000,
    minNumberOfSquareFeet: 1,
    maxPrice: 60000000,
    minPrice: 1,

    page: 1,
}


interface IFormContext {
    filterObject: IfilterProperty,
    updateField: (field: keyof IfilterProperty, value: any) => void,
    resetFilter: () => void
}

export const FormContext = createContext<IFormContext | undefined>(undefined);



export const FormProvider = ({ children }: { children: ReactNode }) => {


    const [filterObject, setFilter] = useState(defaultFilter);

    const updateField = (field: keyof IfilterProperty, value: any) => {
        setFilter((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const resetFilter = () => {
        setFilter((_) => defaultFilter)
    };

    return (
        <FormContext.Provider value={{ filterObject, updateField, resetFilter }}>
            {children}
        </FormContext.Provider>
    );
}



export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormContext");
    }
    return context;
};
