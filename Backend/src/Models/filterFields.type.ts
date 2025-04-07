
const filterFieldsTypes = {

    price: {
        type: Number,
        required: true,
    },

    area: {
        type: Number,
        required: true,
    },

    rooms: {
        type: Number,
        required: false,
        default: undefined,
    },

    bathrooms: {
        type: Number,
        required: false,
        default: undefined,
    },



};

export default filterFieldsTypes;