import Iproperty from "@src/models/property.type";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IfilterProperty } from "src/models/filterProperty";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { useParams, useSearchParams } from "react-router-dom";
import { citiesType } from "@src/types/cities.delegations.types";


export const defaultFilter: IfilterProperty = {

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
    properties: Iproperty[] | null,
    totalCount: number,

    updateField: (field: keyof IfilterProperty, value: any, mnin?: string) => void,
    resetFilter: () => void,
    updateEstate: () => void,

}

const FormContext = createContext<IFormContext | undefined>(undefined);



export const FormProvider = ({ children }: { children: ReactNode }) => {


    const [filterObject, setFilter] = useState(defaultFilter);

    const [properties, setProperties] = useState<Iproperty[] | null>(null);

    const [totalCount, setTotalCount] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();

    
    // useEffect(() => {
    //     console.log(filterObject);

    // }, [filterObject])

    // useEffect(() => {
    //     updateEstate()
    // }, [filterObject.page])

    const { city } = useParams();




    // useEffect(() => {
    //     const handleCityChange = async (city: string) => {
    //         await updateField("city", city);
    //         console.log("cityyyyy", city);

    //         // Make sure this is called after the state is updated
    //     };
    //     // console.log('mountedddddddddd');
    //     const aa = async () => {
    //         if (city !== undefined && city !== "undefined") {

    //             await handleCityChange(city);
    //             defaultFilter.city = city as citiesType
    //             updateEstate(defaultFilter);
    //         }
    //     }
    //     aa()

    // }, [city])

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

        let filter = {}
        searchParams.forEach((value, key) => {
            filter = { ...filter, [key]: value }
        })
        const filterSend = defaultFilter ? defaultFilter : filterObject
        const response = await Http.get<any>(apiGateway.property.list, { params: filter });
        const properties: Iproperty[] = response?.data.result
        const totalCount = Number(response?.headers["x-total-count"]);
        setTotalCount(totalCount)
        // console.log("estates", estates);
        console.log("t5l ????????????");

        setProperties(properties);
    };

    useEffect(() => {
        console.log("mounta context");
        updateEstate();
    }, []);


    return (
        <FormContext.Provider value={{ properties, filterObject, totalCount, updateField, resetFilter, updateEstate }}>
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
