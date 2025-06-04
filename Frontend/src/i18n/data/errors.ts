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
        filterFields: {
            price: {
                required: "errors:submitProperty.filterFields.price.required",
                min: "errors:submitProperty.filterFields.price.min",
                max: "errors:submitProperty.filterFields.price.max",
                regex: "errors:submitProperty.filterFields.price.regex",
            },
            area: {
                required: "errors:submitProperty.filterFields.area.required",
                min: "errors:submitProperty.filterFields.area.min",
                max: "errors:submitProperty.filterFields.area.max",
                regex: "errors:submitProperty.filterFields.area.regex",
            },
            rooms: {
                required: "errors:submitProperty.filterFields.rooms.required",
                min: "errors:submitProperty.filterFields.rooms.min",
                max: "errors:submitProperty.filterFields.rooms.max",
                regex: "errors:submitProperty.filterFields.rooms.regex",
            },
            bathrooms: {
                required: "errors:submitProperty.filterFields.bathrooms.required",
                min: "errors:submitProperty.filterFields.bathrooms.min",
                max: "errors:submitProperty.filterFields.bathrooms.max",
                regex: "errors:submitProperty.filterFields.bathrooms.regex",
            },

        },
        imageGallery:{
            folderId: "errors:submitProperty.imageGallery.folderId.required",
            images:{
                key:"errors:submitProperty.imageGallery.images.key.required",
            }
        },
        listing_type:"errors:submitProperty.listing_type.required",
        listing_period:"errors:submitProperty.listing_period",


    },

    changePassword: {
        root: {
            somethingWentWrong: "errors:changePassword.root.somethingWentWrong",
        },
        password: {
            required: "errors:changePassword.password.required",
            atLeast6: "errors:changePassword.password.atLeast6",
        },
        confirmPassword: {
            required: "errors:changePassword.confirmPassword.required",
            atLeast6: "errors:changePassword.confirmPassword.atLeast6",
            doNotMatch: "errors:changePassword.confirmPassword.doNotMatch"
        },


    },


    signUp: {
        firstName: {
            required: "errors:signUp.firstName.required",
            min: "errors:signUp.firstName.min",
            max: "errors:signUp.firstName.max",
            regex: "errors:signUp.firstName.regex",
        },
        lastName: {
            required: "errors:signUp.lastName.required",
            min: "errors:signUp.lastName.min",
            max: "errors:signUp.lastName.max",
            regex: "errors:signUp.lastName.regex",
        },
        phoneNumber: {
            required: "errors:signUp.phoneNumber.required",
            min: "errors:signUp.phoneNumber.min",
            max: "errors:signUp.phoneNumber.max",
        },
        email: {
            required: "errors:signUp.email.required",
            invalidEmailAddress: "errors:signUp.email.invalidEmailAddress",
            alreadyExists: "errors:signUp.email.alreadyExists"
        },
        password: {
            required: "errors:signUp.password.required",
            min: "errors:signUp.password.min",
            max: "errors:signUp.password.max"
        },
        confirmPassword: {
            required: "errors:signUp.confirmPassword.required",
            min: "errors:signUp.confirmPassword.min",
            max: "errors:signUp.confirmPassword.max",
            doNotMatch: "errors:signUp.confirmPassword.doNotMatch"
        }
    },

    login: {
        email: {
            required: "errors:login.email.required",
            invalidEmailAddress: "errors:login.email.invalidEmailAddress"
        },
        password: {
            required: "errors:login.password.required",
            min: "errors:login.password.min",
        },
        invalidCredentials: "errors:login.invalidCredentials",
    },

    profile: {
        firstName: {
            required: "errors:profile.firstName.required",
            min: "errors:profile.firstName.min",
            max: "errors:profile.firstName.max",
            regex: "errors:profile.firstName.regex",
        },
        lastName: {
            required: "errors:profile.lastName.required",
            min: "errors:profile.lastName.min",
            max: "errors:profile.lastName.max",
            regex: "errors:profile.lastName.regex",
        },
        phoneNumber: {
            required: "errors:profile.phoneNumber.required",
            min: "errors:profile.phoneNumber.min",
            max: "errors:profile.phoneNumber.max",
        },
        email: {
            required: "errors:profile.email.required",
            invalidEmailAddress: "errors:profile.email.invalidEmailAddress",
            alreadyExists: "errors:profile.email.alreadyExists"
        },
        password: {
            required: "errors:profile.password.required",
            min: "errors:profile.password.min",
            max: "errors:profile.password.max"
        },
        confirmPassword: {
            required: "errors:profile.confirmPassword.required",
            min: "errors:profile.password.min",
            max: "errors:profile.password.max",
            doNotMatch: "errors:profile.confirmPassword.doNotMatch"

        },



        agentInfo: {
            imageGallery: {
                folderId: "errors:profile.agentInfo.imageGallery.folderId.required",
                mainImage: {
                    key: "errors:profile.agentInfo.imageGallery.mainImage.key.required",
                    url: "errors:profile.agentInfo.imageGallery.mainImage.url.required"
                },
                miniImage: {
                    key: "errors:profile.agentInfo.imageGallery.miniImage.key.required",
                    url: "errors:profile.agentInfo.imageGallery.miniImage.url.required"
                },
            },
        },

        adminInfo:{
            imageGallery: {
                folderId: "errors:profile.adminInfo.imageGallery.folderId.required",
                mainImage: {
                    key: "errors:profile.adminInfo.imageGallery.mainImage.key.required",
                    url: "errors:profile.adminInfo.imageGallery.mainImage.url.required"
                },
                miniImage: {
                    key: "errors:profile.adminInfo.imageGallery.miniImage.key.required",
                    url: "errors:profile.adminInfo.imageGallery.miniImage.url.required"
                },
            },
        }
    },










}

export default errors;