import { z } from "zod";
import getText from '@src/i18n/data/getText';
import { capitalizePhrase } from '@src/utils/capitalize_decapitalized';
import { useTranslation } from "react-i18next";



const useSignUpSchema = () => {

    const { t } = useTranslation(["errors"]);

    const SignUpSchema = z.object({
        firstName: z.string({ required_error: capitalizePhrase(t(getText.errors.signUp.firstName.required)) })
            .min(2, { message: capitalizePhrase(t(getText.errors.signUp.firstName.min)) })
            .max(25, { message: capitalizePhrase(t(getText.errors.signUp.firstName.max)) })
            .regex(/^[A-Za-z]+$/, { message: capitalizePhrase(t(getText.errors.signUp.firstName.regex)) }),


        lastName: z.string({ required_error: capitalizePhrase(t(getText.errors.signUp.lastName.required)) })
            .min(1, { message: capitalizePhrase(t(getText.errors.signUp.lastName.min)) })
            .max(25, { message: capitalizePhrase(t(getText.errors.signUp.lastName.max)) })
            .regex(/^[A-Za-z]+$/, { message: capitalizePhrase(t(getText.errors.signUp.lastName.regex)) }),


        phoneNumber: z.string({ required_error: capitalizePhrase(t(getText.errors.signUp.phoneNumber.required)) })
            .min(5, { message: capitalizePhrase(t(getText.errors.signUp.phoneNumber.min)) })
            .max(17, { message: capitalizePhrase(t(getText.errors.signUp.phoneNumber.max)) }),

        email: z.string({ required_error: capitalizePhrase(t(getText.errors.signUp.email.required)) })
            .email({ message: capitalizePhrase(t(getText.errors.signUp.email.invalidEmailAddress)) }),

        password: z.string({ required_error: capitalizePhrase(t(getText.errors.signUp.password.required)) })
            .min(1, { message: capitalizePhrase(t(getText.errors.signUp.password.min)) })
            .max(25, { message: capitalizePhrase(t(getText.errors.signUp.password.max)) }),

        confirmPassword: z.string({ required_error: capitalizePhrase(t(getText.errors.signUp.confirmPassword.required)) })
            .min(1, { message: capitalizePhrase(t(getText.errors.signUp.confirmPassword.min)) })
            .max(25, { message: capitalizePhrase(t(getText.errors.signUp.confirmPassword.max)) }),

    }).refine((data) => data.password === data.confirmPassword, {
        message: capitalizePhrase(t(getText.errors.signUp.confirmPassword.doNotMatch)),
        path: ["confirmPassword"],
    }


    );


    return SignUpSchema;

}

export default useSignUpSchema