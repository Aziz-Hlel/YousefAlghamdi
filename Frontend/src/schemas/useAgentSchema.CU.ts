import { z } from "zod";
import getText from '@src/i18n/data/getText';
import { capitalizePhrase } from '@src/utils/capitalize_decapitalized';
import { useTranslation } from "react-i18next";


const useAgentSchema = () => {

    const { t } = useTranslation(["errors"]);


    const createAgentSchema = z.object({


        firstName: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.firstName.required)) })
            .min(1, { message: capitalizePhrase(t(getText.errors.profile.firstName.required)) })
            .max(50, { message: capitalizePhrase(t(getText.errors.profile.firstName.max)) }),

        lastName: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.lastName.required)) })
            .min(1, { message: capitalizePhrase(t(getText.errors.profile.lastName.required)) })
            .max(50, { message: capitalizePhrase(t(getText.errors.profile.lastName.max)) }),

        phoneNumber: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.phoneNumber.required)) })
            .min(1, { message: capitalizePhrase(t(getText.errors.profile.phoneNumber.required)) })
            .max(50, { message: capitalizePhrase(t(getText.errors.profile.phoneNumber.max)) }),

        email: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.email.required)) })
            .min(1, { message: capitalizePhrase(t(getText.errors.profile.email.required)) }),

        password: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.password.required)) })
            .min(1, { message: capitalizePhrase(t(getText.errors.profile.password.min)) })
            .max(25, { message: capitalizePhrase(t(getText.errors.profile.password.max)) }),
        // .optional(),

        confirmPassword: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.confirmPassword.required)) })
            .min(1, { message: capitalizePhrase(t(getText.errors.profile.confirmPassword.min)) })
            .max(25, { message: capitalizePhrase(t(getText.errors.profile.confirmPassword.max)) }),
        // .optional(),



        agentInfo: z.object({

            imageGallery: z.object({

                folderId: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.agentInfo.imageGallery.folderId)) }),

                mainImage: z.object({
                    key: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.agentInfo.imageGallery.mainImage.key)) }),
                    url: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.agentInfo.imageGallery.mainImage.url)) }).optional(),
                }),

                miniImage: z.object({

                    key: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.agentInfo.imageGallery.miniImage.key)) }),
                    url: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.agentInfo.imageGallery.miniImage.url)) }).optional(),
                },),


            }),


        }),

    }).refine((data) =>
        data.password === data.confirmPassword, {
        message: capitalizePhrase(t(getText.errors.profile.confirmPassword.doNotMatch)),
        path: ["confirmPassword"],
    }
    );

    const updateAgentSchema = createAgentSchema.innerType().omit({ password: true, confirmPassword: true });




    return { createAgentSchema, updateAgentSchema };


}

export default useAgentSchema