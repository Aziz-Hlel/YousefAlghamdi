import Iproperty from "@src/models/property.type";
import { createContext, ReactNode, RefObject, useContext, useEffect, useRef, useState } from "react";
import { IfilterProperty } from "src/models/filterProperty";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { useSearchParams } from "react-router-dom";


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
    updateEstate: (page?: number) => void,

    listRef: RefObject<HTMLDivElement | null>

}

const FormContext = createContext<IFormContext | undefined>(undefined);



export const FormProvider = ({ children }: { children: ReactNode }) => {


    const [filterObject, setFilter] = useState(defaultFilter);

    const [properties, setProperties] = useState<Iproperty[] | null>(null);

    const [totalCount, setTotalCount] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();

    const listRef = useRef<HTMLDivElement | null>(null);

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


    const updateEstate = async (page?: number) => {
        if (listRef?.current) {
            const offset = 100; // Adjust this value to scroll a bit further
            const elementTop = listRef.current.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top: elementTop - offset,
                behavior: 'smooth',
            });
        }
        let filter: any = {}
        console.log("nanana chouf 9addeh l pag mil prams l context :", page);
        searchParams.forEach((value, key) => {

            console.log(value, key);

            filter = { ...filter, [key]: value }
        })
        if (page) filter = { ...filter, page }
        else {
            filter["page"] = 1
            searchParams.delete('page')
            setSearchParams(searchParams, { replace: true });
        };

        console.log('rabk om l filter : ', filter);

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
        <FormContext.Provider value={{ properties, filterObject, totalCount, updateField, resetFilter, updateEstate, listRef }}>
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
