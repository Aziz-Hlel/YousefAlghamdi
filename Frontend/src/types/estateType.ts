const estateTypes = [
    // "All",
    "Apartement",
    "House",
    "Office",
    "Land",
]

export type IestateTypes = (typeof estateTypes)[number];

export default estateTypes;