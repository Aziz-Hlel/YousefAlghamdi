import Iproperty from "src/models/estate.type";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IfilterProperty } from "src/models/filterProperty";
import Http from "@src/services/Http";
import apiGateway from "@src/apiGateway";


export const defaultFilter: IfilterProperty = {
    forRent: true,
    forSale: true,
    maxNumberOfRooms: 10,
    minNumberOfRooms: 0,
    maxNumberOfBathrooms: 5,
    minNumberOfBathrooms: 1,
    maxNumberOfSquareFeet: 2000,
    minNumberOfSquareFeet: 1,
    maxPrice: 3000000,
    minPrice: 1,

    page: 1,
}


interface IFormContext {
    filterObject: IfilterProperty,
    updateField: (field: keyof IfilterProperty, value: any) => void,
    resetFilter: () => void,

    estates: Iproperty[] | null,
    updateEstate: () => void,
}

export const FormContext = createContext<IFormContext | undefined>(undefined);



export const FormProvider = ({ children }: { children: ReactNode }) => {


    const [filterObject, setFilter] = useState(defaultFilter);

    const [estates, setEstates] = useState<Iproperty[] | null>(null);

    useEffect(()=>{
        console.log(filterObject);
      
          },[filterObject])


    const updateField = (field: keyof IfilterProperty, value: any) => {
        console.log("field",field)
        setFilter((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const resetFilter = () => {
        setFilter((_) => defaultFilter)
    };


    const updateEstate = async () => {
        const response = await Http.get<any>(apiGateway.estate, { params: filterObject });
        const estates: Iproperty[] = response.data.result
        // console.log("response estates", estates);
console.log("t5l ????????????");

        setEstates(estates);
    };

    useEffect(() => {
        updateEstate();
    }, []);


    return (
        <FormContext.Provider value={{ filterObject, updateField, resetFilter, estates, updateEstate }}>
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
