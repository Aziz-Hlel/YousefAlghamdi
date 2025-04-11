import z from "zod";

const ApproveSubmitPropertySchema = z.object({

    _id: z.string().optional(),
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

        price: z.number({ required_error: "Price is required" })
            .min(100, { message: "Price must be at least 100" })
            .max(10000000, { message: "Price must be at most 10000000" }),

        area: z.number({ required_error: "Area is required" })
            .min(0, { message: "Area must be at least 0" })
            .max(100000, { message: "Area must be at most 100000" }),

        rooms: z.number({ required_error: "Rooms is required" })
            .min(0, { message: "Rooms must be at least 0" })
            .max(99, { message: "Rooms must be at most 99" })
            .optional(),

        bathrooms: z.number({ required_error: "Bathrooms is required" })
            .min(0, { message: "Bathrooms must be at least 0" })
            .max(99, { message: "Bathrooms must be at most 99" })
            .optional(),

    }),


    additionalDetails: z.array(z.string()).default([]),
    imgs: z.array(z.string({ required_error: "Image is required" })).optional(),
    listing_type: z.string({ required_error: "Listing type is required" }),
    productTier: z.string({ required_error: "Product tier is required" }).default("free"),
    nearestPlaces: z.record(z.string(), z.string()).default({}),




    clientId: z.string({ required_error: "Client id is required" }),
    agentId: z.string({ required_error: "Agent id is required" }),

});


export default ApproveSubmitPropertySchema;