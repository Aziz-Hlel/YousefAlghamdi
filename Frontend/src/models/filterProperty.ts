import { IestateTypes as IestateTypes } from "@src/types/estateType";
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
    forRent: boolean,
    forSale: boolean,


    page: number,


};