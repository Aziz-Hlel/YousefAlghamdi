import { z } from "zod";
import getText from '@src/i18n/data/getText';
import { capitalizePhrase } from '@src/utils/capitalize_decapitalized';
import { useTranslation } from "react-i18next";



const useUserSchema = () => {

    const { t } = useTranslation(["errors"]);

    const userSchema = z.object({


        firstName: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.firstName.required)) })
            .min(1, { message: capitalizePhrase(t(getText.errors.profile.firstName.min)) })  // Custom message for required field
            .max(50, { message: capitalizePhrase(t(getText.errors.profile.firstName.max)) }),

        lastName: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.lastName.required)) })
            .min(1, { message: capitalizePhrase(t(getText.errors.profile.lastName.min)) })  // Custom message for required field
            .max(50, { message: capitalizePhrase(t(getText.errors.profile.lastName.max)) }),

        phoneNumber: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.phoneNumber.required)) })
            .min(5, { message: capitalizePhrase(t(getText.errors.profile.phoneNumber.required)) })  // Custom message for required field
            .max(17, { message: capitalizePhrase(t(getText.errors.profile.phoneNumber.max)) }),


        // image: z.string({ required_error: "About text is required" }),

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
                }),


            }),


        }).optional(),

        adminInfo: z.object({

            imageGallery: z.object({

                folderId: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.adminInfo.imageGallery.folderId)) }),

                mainImage: z.object({
                    key: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.adminInfo.imageGallery.mainImage.key)) }),
                    url: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.adminInfo.imageGallery.mainImage.url)) }).optional(),
                }),

                miniImage: z.object({
                    key: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.adminInfo.imageGallery.miniImage.key)) }),
                    url: z.string({ required_error: capitalizePhrase(t(getText.errors.profile.adminInfo.imageGallery.miniImage.url)) }).optional(),
                }),


            }),


        }).optional(),

    })




    return { userSchema };

}

export default useUserSchema;