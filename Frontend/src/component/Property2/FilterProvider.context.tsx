import Iproperty from "@src/models/property.type";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IfilterProperty } from "src/models/filterProperty";
import Http from "@src/services/Http";
import apiGateway from "@src/apiGateway";
import { useParams } from "react-router-dom";


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
    updateField: (field: keyof IfilterProperty, value: any, mnin?: string) => void,
    resetFilter: () => void,

    estates: Iproperty[] | null,
    updateEstate: () => void,
}

export const FormContext = createContext<IFormContext | undefined>(undefined);



export const FormProvider = ({ children }: { children: ReactNode }) => {


    const [filterObject, setFilter] = useState(defaultFilter);

    const [estates, setEstates] = useState<Iproperty[] | null>(null);

    useEffect(() => {
        console.log(filterObject);

    }, [filterObject])



    const { city } = useParams();




    useEffect(() => {
        const handleCityChange = async (city: string) => {
            await updateField("city", city);
            console.log("cityyyyy", city);

            // Make sure this is called after the state is updated
        };
        // console.log('mountedddddddddd');
        const aa = async () => {
            if (city !== undefined && city !== "undefined") {

                await handleCityChange(city);
                defaultFilter.city = city
                updateEstate(defaultFilter);
            }
        }
        aa()

    }, [city])

    const updateField = (field: keyof IfilterProperty, value: any, mnin?: string) => {
        // console.log("field", field).
        if (field === "city") {
            console.log("city bch ytbadel jey mnin :", mnin);
            console.log("value", value);

        }


        setFilter((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const resetFilter = () => {
        setFilter((_) => defaultFilter)
    };


    const updateEstate = async (defaultFilter?: IfilterProperty) => {
        if (filterObject.city === "All") delete filterObject.city;
        if (filterObject.type === "All") delete filterObject.type;
        const filterSend = defaultFilter ? defaultFilter : filterObject
        const response = await Http.get<any>(apiGateway.estate, { params: filterSend });
        const estates: Iproperty[] = response.data.result
        // console.log("estates", estates);
        console.log("t5l ????????????");

        setEstates(estates);
    };

    useEffect(() => {
        console.log("mounta context");
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
