import z from "zod";


export const createAgentSchema = z.object({


  firstName: z.string({ required_error: "First name is required" })
    .min(1, { message: "First name is required" })  // Custom message for required field
    .max(50, { message: "First name must be at most 50 characters long" }),

  lastName: z.string({ required_error: "Last name is required" })
    .min(1, { message: "Last name is required" })  // Custom message for required field
    .max(50, { message: "Last name must be at most 50 characters long" }),

  phoneNumber: z.string({ required_error: "Phone number is required" })
    .min(1, { message: "Phone number is required" })  // Custom message for required field
    .max(50, { message: "Phone number must be at most 50 characters long" }),

  email: z.string({ required_error: "Email address is required" })
    .min(1, { message: "Email address is required" })  // Custom message for required field
    .max(50, { message: "Email address must be at most 50 characters long" }),

  password: z.string({ required_error: "Password is required" })
    .min(1, { message: "Password must be at least 6 characters long" })
    .max(25, { message: "Password must be at most 25 characters long" }),
  // .optional(),

  confirmPassword: z.string({ required_error: "Confirm password is required" })
    .min(1, { message: "Confirm password must be at least 6 characters long" })
    .max(25, { message: "Confirm password must be at most 25 characters long" }),
  // .optional(),



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


  }),

}).refine((data) =>
  data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}
);



export const updateAgentSchema = createAgentSchema.innerType().omit({
  password: true,
  confirmPassword: true,
});