
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
        default: null,
    },

    bathrooms: {
        type: Number,
        required: false,
        default: null,
    },



};

export default filterFieldsTypes;