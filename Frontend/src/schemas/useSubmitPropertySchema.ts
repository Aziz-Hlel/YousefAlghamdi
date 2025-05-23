import getText from '@src/i18n/data/getText';
import { capitalizePhrase } from '@src/utils/capitalize_decapitalized';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const useSubmitPropertySchema = () => {


    const { t } = useTranslation();


    const SubmitPropertySchema = z.object({

        _id: z.string().optional(),
        title: z.string({ required_error: capitalizePhrase(t(getText.errors.submitProperty.title.required)) })
            .min(2, { message: capitalizePhrase(t(getText.errors.submitProperty.title.max)) })
            .max(25, { message: capitalizePhrase(t(getText.errors.submitProperty.title.min)) }),

        description: z.string({ required_error: capitalizePhrase(t(getText.errors.submitProperty.description.required)) })
            .min(2, { message: capitalizePhrase(t(getText.errors.submitProperty.description.min)) })
            .max(200, { message: capitalizePhrase(t(getText.errors.submitProperty.description.max)) }),

        category: z.string({ required_error: capitalizePhrase(t(getText.errors.submitProperty.category.required)) })
            .min(2, { message: capitalizePhrase(t(getText.errors.submitProperty.category.min)) })
            .max(25, { message: capitalizePhrase(t(getText.errors.submitProperty.category.max)) }),

        sub_category: z.string({ required_error: capitalizePhrase(t(getText.errors.submitProperty.sub_category.required)) }),

        city: z.string({ required_error: capitalizePhrase(t(getText.errors.submitProperty.city.required)) }),
        delegation: z.string({ required_error: capitalizePhrase(t(getText.errors.submitProperty.delegation.required)) }),
        addresse: z.string({ required_error: capitalizePhrase(t(getText.errors.submitProperty.addresse.required)) }).optional(),

        filterFields: z.object({

            price: z.string({ required_error: capitalizePhrase(t(getText.errors.submitProperty.filterFields.price.required)) })
                .min(3, { message: capitalizePhrase(t(getText.errors.submitProperty.filterFields.price.min)) })
                .max(7, { message: capitalizePhrase(t(getText.errors.submitProperty.filterFields.price.max)) })
                .regex(/^\d+$/, capitalizePhrase(t(getText.errors.submitProperty.filterFields.price.regex))),

            area: z.string({ required_error: capitalizePhrase(t(getText.errors.submitProperty.filterFields.area.required)) })
                .min(1, { message: capitalizePhrase(t(getText.errors.submitProperty.filterFields.area.min)) })
                .max(5, { message: capitalizePhrase(t(getText.errors.submitProperty.filterFields.area.max)) })
                .regex(/^\d+$/, capitalizePhrase(t(getText.errors.submitProperty.filterFields.area.regex))),

            rooms: z.string({ required_error: capitalizePhrase(t(getText.errors.submitProperty.filterFields.rooms.required)) })
                .min(1, { message: capitalizePhrase(t(getText.errors.submitProperty.filterFields.rooms.min)) })
                .max(2, { message: capitalizePhrase(t(getText.errors.submitProperty.filterFields.rooms.max)) })
                .regex(/^\d+$/, capitalizePhrase(t(getText.errors.submitProperty.filterFields.rooms.regex)))
                .optional(),

            bathrooms: z.string({ required_error: capitalizePhrase(t(getText.errors.submitProperty.filterFields.bathrooms.required)) })
                .min(1, { message: capitalizePhrase(t(getText.errors.submitProperty.filterFields.bathrooms.min)) })
                .max(2, { message: capitalizePhrase(t(getText.errors.submitProperty.filterFields.bathrooms.max)) })
                .regex(/^\d+$/, capitalizePhrase(t(getText.errors.submitProperty.filterFields.bathrooms.regex)))
                .optional(),
        }),



        additionalDetails: z.array(z.string()).default([]),
        imageGallery: z.object({

            folderId: z.string({ required_error: "Folder id is required" }),

            images: z.array(z.object({
                key: z.string({ required_error: "Image key is required" }),
            })),

        }).optional(),
        listing_type: z.string({ required_error: "Listing type is required" }),
        productTier: z.string({ required_error: "Product tier is required" }).default("free"),
        nearestPlaces: z.record(z.string(), z.string()).default({}),

    });

    return { SubmitPropertySchema }

}

export default useSubmitPropertySchema