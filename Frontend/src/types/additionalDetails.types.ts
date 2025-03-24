import { categoriesType, CommercialProperties, LandAndPlots, ResidentialProperties } from "./categories.subcategories.types";

const wifi = "Wi-Fi";
const freeParking = "Parking";
const swimmingPool = "Swimming Pool";
const gym = "Gym";
const airConditioning = "Air Conditioning";
const elevator = "Elevator";
const parking = "Parking";
const security = "Security";
const maintenance = "Maintenance";
const cleaning = "Cleaning";
const furnished = "Furnished";
const unfurnished = "Unfurnished";
const balcony = "Balcony";
const terrace = "Terrace";
const garden = "Garden";
const petsAllowed = "Pets Allowed";
const alcohol = "Alcohol";
const internet = "Internet";
const cableTV = "Cable TV";
const viewOfWater = "View of Water";
const viewOfLandmark = "View of Landmark";



export const additionalDetails: { [key in keyof typeof categoriesType]: string[] } = {
    [ResidentialProperties]: [
        wifi,
        freeParking,
        swimmingPool,
        gym,
        airConditioning,
        elevator,
        parking,
        security,
        maintenance,
        cleaning,
        furnished,
        unfurnished,
        balcony,
        terrace,
        garden,
        petsAllowed,
        alcohol,
        internet,
        cableTV
    ],

    [CommercialProperties]: [
        wifi,
        freeParking,
        security,
        maintenance,
        cleaning,
        furnished,
        unfurnished,
        internet,
        cableTV,
    ],
    [LandAndPlots]: [
        viewOfLandmark,
        viewOfWater,
    ],
}