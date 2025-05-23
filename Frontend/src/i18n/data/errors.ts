const errors = {

    submitProperty: {
        title: {
            required: "errors:submitProperty.title.required",
            min: "errors:submitProperty.title.min",
            max: "errors:submitProperty.title.max",
        },
        description: {
            required: "errors:submitProperty.description.required",
            min: "errors:submitProperty.description.min",
            max: "errors:submitProperty.description.max",
        },
        category: {
            required: "errors:submitProperty.category.required",
            min: "errors:submitProperty.category.min",
            max: "errors:submitProperty.category.max",
        },
        sub_category: {
            required: "errors:submitProperty.sub_category.required",
        },
        city: {
            required: "errors:submitProperty.city.required",
        },
        delegation: {
            required: "errors:submitProperty.delegation.required",
        },
        addresse: {
            required: "errors:submitProperty.addresse.required",
        },
        filterFields:{
            price:{
                required: "errors:submitProperty.filterFields.price.required",
                min: "errors:submitProperty.filterFields.price.min",
                max: "errors:submitProperty.filterFields.price.max",
                regex: "errors:submitProperty.filterFields.price.regex",
            },
            area:{
                required: "errors:submitProperty.filterFields.area.required",
                min: "errors:submitProperty.filterFields.area.min",
                max: "errors:submitProperty.filterFields.area.max",
                regex: "errors:submitProperty.filterFields.area.regex",
            },
            rooms:{
                required: "errors:submitProperty.filterFields.rooms.required",
                min: "errors:submitProperty.filterFields.rooms.min",
                max: "errors:submitProperty.filterFields.rooms.max",
                regex: "errors:submitProperty.filterFields.rooms.regex",
            },
            bathrooms:{
                required: "errors:submitProperty.filterFields.bathrooms.required",
                min: "errors:submitProperty.filterFields.bathrooms.min",
                max: "errors:submitProperty.filterFields.bathrooms.max",
                regex: "errors:submitProperty.filterFields.bathrooms.regex",
            },

        },
      

    },

    changePassword: {
        root: {
            somethingWentWrong: "errors:changePassword.root.somethingWentWrong",
        },
        password: {
            required: "errors:changePassword.password.required",
            atLeast8: "errors:changePassword.password.atLeast8",
        },
        confirmPassword: {
            required: "errors:changePassword.confirmPassword.required",
            atLeast8: "errors:changePassword.confirmPassword.atLeast8",
            doNotMatch: "errors:changePassword.confirmPassword.doNotMatch"
        },


    }










}


export default errors;