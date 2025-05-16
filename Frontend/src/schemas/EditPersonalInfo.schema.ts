import { z } from "zod"


export const userSchema = z.object({


  firstName: z.string({ required_error: "First name is required" })
    .min(1, { message: "First name is required" })  // Custom message for required field
    .max(50, { message: "First name must be at most 50 characters long" }),

  lastName: z.string({ required_error: "Last name is required" })
    .min(1, { message: "Last name is required" })  // Custom message for required field
    .max(50, { message: "Last name must be at most 50 characters long" }),

  phoneNumber: z.string({ required_error: "Phone number is required" })
    .min(1, { message: "Phone number is required" })  // Custom message for required field
    .max(50, { message: "Phone number must be at most 50 characters long" }),


  // image: z.string({ required_error: "About text is required" }),

  agentInfo: z.object({

    imageGallery: z.object({

      folderId: z.string({ required_error: "FolderId text is required" }),

      mainImage: z.object({
        key: z.string({ required_error: "Key text is required" }),
        url: z.string({ required_error: "Url text is required" }).optional(),
      }),

      miniImage: z.object({
        key: z.string({ required_error: "Key text is required" }),
        url: z.string({ required_error: "Url text is required" }).optional(),
      }),


    }),


  }).optional(),

  adminInfo: z.object({

    imageGallery: z.object({

      folderId: z.string({ required_error: "FolderId text is required" }),

      mainImage: z.object({
        key: z.string({ required_error: "Key text is required" }),
        url: z.string({ required_error: "Url text is required" }).optional(),
      }),

      miniImage: z.object({
        key: z.string({ required_error: "Key text is required" }),
        url: z.string({ required_error: "Url text is required" }).optional(),
      }),


    }),


  }).optional(),

})

export type addAgentSchemaType = z.infer<typeof userSchema>
