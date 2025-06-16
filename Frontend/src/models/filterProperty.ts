import { ICategory } from "@src/types/categories.subcategories.types";
import { citiesType } from "@src/types/cities.delegations.types";

export type IfilterProperty = {

    city?: citiesType,
    delegation?: string,
    category?: ICategory,
    sub_category?: string,

    // maxNumberOfRooms: number,
    // minNumberOfRooms: number,

    // maxNumberOfBathrooms: number,
    // minNumberOfBathrooms: number,

    maxNumberOfSquareFeet: number,
    minNumberOfSquareFeet: number,

    minPrice: number,
    maxPrice: number,

    listingType?: string,



};