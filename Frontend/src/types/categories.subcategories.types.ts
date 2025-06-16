
export const ResidentialProperties = "Residential Properties";
export const CommercialProperties = "Commercial Properties";
export const LandAndPlots = "Land & Plots";


export const categoriesList = [
    ResidentialProperties,
    CommercialProperties,
    LandAndPlots,
] as const;


export const categoriesType = {
    [ResidentialProperties]: ResidentialProperties,
    [CommercialProperties]: CommercialProperties,
    [LandAndPlots]: LandAndPlots,
} as const;


export const commercialCategories = [CommercialProperties, LandAndPlots] 
export const nonCommercialCategories = [ResidentialProperties, LandAndPlots] 


export type ICategory = keyof typeof categoriesType;


// categories.ResidentialProperties 
export const sub_categories = {

    [ResidentialProperties]: [
        "Apartment",
        "Villa",
        "Townhouse",
        "Studio",
        "Penthouse",
    ],

    [CommercialProperties]: [
        "Office Space",
        "Retail Shop",
        "Warehouse",
        "Business Center"
    ],

    [LandAndPlots]: [
        "Residential Plot",
        "Commercial Plot",
        "Agricultural Land",
        "Industrial Land",
    ],



}



