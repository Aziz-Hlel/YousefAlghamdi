import { IestateTypes as IestateTypes } from "@src/types/propertyType";
import { Imarate } from "@src/types/imarates";

export type IfilterProperty = {

    city?: Imarate,
    type?: IestateTypes,
    maxNumberOfRooms: number,
    minNumberOfRooms: number,
    maxNumberOfBathrooms: number,
    minNumberOfBathrooms: number,
    maxNumberOfSquareFeet: number,
    minNumberOfSquareFeet: number,
    minPrice: number,
    maxPrice: number,
    forRent: boolean, // del
    forSale: boolean, // del

    listingType: string,
    page: number,


};