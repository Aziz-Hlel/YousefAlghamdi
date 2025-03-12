import { createContext, ReactNode, useContext, useState } from "react";
import { IfilterProperty } from "src/models/filterProperty";


const defaultFilter: IfilterProperty = {
    city: "All",
    type: "All",
    forRent: true,
    forSale: true,
    maxNumberOfRooms: 10,
    minNumberOfRooms: 1,
    maxNumberOfBathrooms: 5,
    minNumberOfBathrooms: 1,
    maxNumberOfSquareFeet: 2000,
    minNumberOfSquareFeet: 1,
    maxPrice: 600,
    minPrice: 1,

}

export const FormContext = createContext<{ filterObject: IfilterProperty, updateField: (field: keyof IfilterProperty, value: any) => void } | undefined>(undefined);



export const FormProvider = ({ children }: { children: ReactNode }) => {


    const [filterObject, setFilter] = useState(defaultFilter);

    const updateField = (field: keyof IfilterProperty, value: any) => {
        setFilter((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    return (
        <FormContext.Provider value={{ filterObject, updateField }}>
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
