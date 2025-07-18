import z from "zod";

const ApproveSubmitPropertySchema = z.object({

    title: z.string({ required_error: "Title is required" })
        .min(2, { message: "Title must be at least 2 characters long" })
        .max(25, { message: "Title must be at most 25 characters long" }),

    description: z.string({ required_error: "Description is required" })
        .min(2, { message: "Description must be at least 2 characters long" })
        .max(200, { message: "Description must be at most 200 characters long" }),

    category: z.string({ required_error: "Category is required" })
        .min(2, { message: "Type must be at least 2 characters long" })
        .max(25, { message: "Type must be at most 25 characters long" }),

    sub_category: z.string({ required_error: "Sub category is required" }),

    city: z.string({ required_error: "City is required" }),
    delegation: z.string({ required_error: "Delegation is required" }),
    addresse: z.string({ required_error: "Addresse is required" }).optional(),

    filterFields: z.object({


        price: z.string({ required_error: "Price is required" })
            .min(3, { message: "Price must be at least 100" })
            .max(7, { message: "Price must be at most 10000000" })
            .regex(/^\d+$/, "Price must be a number"),

        area: z.string({ required_error: "Area is required" })
            .min(1, { message: "Area must be at least 0" })
            .max(5, { message: "Area must be at most 100000" })
            .regex(/^\d+$/, "Price must be a number"),

        rooms: z.string({ required_error: "Rooms is required" })
            .min(1, { message: "Rooms must be at least 0" })
            .max(2, { message: "Rooms must be at most 99" })
            .regex(/^\d+$/, "Price must be a number")
            .optional(),

        bathrooms: z.string({ required_error: "Bathrooms is required" })
            .min(1, { message: "Bathrooms must be at least 0" })
            .max(2, { message: "Bathrooms must be at most 99" })
            .regex(/^\d+$/, "Price must be a number")
            .optional(),

    }),


    additionalDetails: z.array(z.string()).default([]),
    imageGallery: z.object({

        folderId: z.string({ required_error: "Folder id is required" }),

        images: z.array(z.object({
            key: z.string({ required_error: "Image key is required" }),
        })),

    }),

    listing_type: z.string({ required_error: "Listing type is required" }),
    listing_period: z.string({ required_error: "Listing period is required" }).optional(),
    nearestPlaces: z.record(z.string(), z.string()).default({}),




    clientId: z.string({ required_error: "Client id is required" }),
    agentId: z.string({ required_error: "Agent id is required" }),

}).superRefine((data, ctx) => {
    if (data.listing_type.toLowerCase().includes('rent') && !data.listing_period) {
        ctx.addIssue({
            path: ['listing_period'],
            code: z.ZodIssueCode.custom,
            message: "Listing period is required", // Or a more specific message
        });
    }
});;


export default ApproveSubmitPropertySchema;