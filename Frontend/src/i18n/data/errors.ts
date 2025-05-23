const errors = {

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