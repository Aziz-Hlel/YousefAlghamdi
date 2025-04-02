const propertyTypes = [
    // "All",
    "Apartement",
    "House",
    "Office",
    "Land",
]

export type IestateTypes = (typeof propertyTypes)[number];

export default propertyTypes;