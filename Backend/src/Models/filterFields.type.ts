
const filterFieldsTypes = {

    price: {
        type: String,
        required: true,
    },

    area: {
        type: String,
        required: true,
    },

    rooms: {
        type: String,
        required: false,
        default: undefined,
    },

    bathrooms: {
        type: String,
        required: false,
        default: undefined,
    },



};

export default filterFieldsTypes;