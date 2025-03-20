
const ResidentialProperties = "Residential Properties";
const CommercialProperties = "Commercial Properties";
const LandAndPlots = "Land & Plots";


export const categories = {
    [ResidentialProperties]: ResidentialProperties,
    [CommercialProperties]: CommercialProperties,
    [LandAndPlots]: [LandAndPlots],
}
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
