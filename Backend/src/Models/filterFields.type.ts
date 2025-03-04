




const filterFieldsTypes = {

    price: {
        type: Number,
        required: true,
    },

    height: {
        type: Number,
        required: true,
    },

    width: {
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
        default: null
    },


};

export default filterFieldsTypes;