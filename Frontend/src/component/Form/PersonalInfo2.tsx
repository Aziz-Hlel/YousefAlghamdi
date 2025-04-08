import { useEffect, useState } from "react";
import PropertyTextInput from "./PropertyTextInput2";
import PropertyTextAreaV2 from "./PropertyTextAreaV22";
import { z } from "zod";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAgents } from "@src/providers/AgentsProvider.context";


const agentSchema = z.object({

  _id: z.string().optional(),

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

  location: z.string({ required_error: "Location is required" })
    .min(1, { message: "Location is required" })  // Custom message for required field
    .max(50, { message: "Location must be at most 50 characters long" }),

  image: z.string({ required_error: "About text is required" }),

  socials: z.object({

    facebook: z.string({ required_error: "Facebook is required" })
      .min(1, { message: "Facebook is required" })  // Custom message for required field
      .max(50, { message: "Facebook must be at most 50 characters long" }),

    twitter: z.string({ required_error: "Twitter is required" })
      .min(1, { message: "Twitter is required" })  // Custom message for required field
      .max(50, { message: "Twitter must be at most 50 characters long" }),

    instagram: z.string({ required_error: "Instagram is required" })
      .min(1, { message: "Instagram is required" })  // Custom message for required field
      .max(50, { message: "Instagram must be at most 50 characters long" }),

    linkedin: z.string({ required_error: "Linkedin is required" })
      .min(1, { message: "Linkedin is required" })  // Custom message for required field
      .max(50, { message: "Linkedin must be at most 50 characters long" }),

  }),

  about: z.string({ required_error: "About text is required" })
    .min(1, { message: "About text is required" })  // Custom message for required field  
    .max(50, { message: "About text must be at most 50 characters long" }),

})

type addAgentSchemaType = z.infer<typeof agentSchema>



function PersonalInfo() {

  const agents = useAgents();
  const { agentId } = useParams();

  const agentToEdit = agentId ? agents[agentId] : {};
  const editMode = agentId ? true : false;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting, }, setError } =
    useForm<addAgentSchemaType>({
      resolver: zodResolver(agentSchema),
      defaultValues: agentToEdit
    });


  useEffect(() => {

    if (agentId) {
      console.log('t5ll5l5l5l5');
      
      reset()
    }

  }, [agentId])


  return (
    <form className="ecom-wc__form-main p-0" action="index.html" method="post">
      <div className="row">
        <div className="col-12">
          <div className="homec-profile__edit mg-top-20">
            <img src="https://placehold.co/90x90" alt="#" />
            <label htmlFor="file-input">
              <span className="homec-pimg">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z"
                    fill="white"
                  ></path>
                  <path
                    d="M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"
                    fill="white"
                  ></path>
                </svg>
              </span>
            </label>
            <input
              id="file-input"
              type="file"
              name="image"
              // value={input.image}
          
            />
          </div>
        </div>
        <PropertyTextInput
          size="col-lg-6 col-md-6"
          title="First Name*"
          placeholder="Demo Name"
          fieldRegister={register("firstName")}
          fieldError={errors.firstName}
        />
        <PropertyTextInput
          size="col-lg-6 col-md-6"
          title="Last Name*"
          placeholder="Demo Name"
          fieldRegister={register("lastName")}
          fieldError={errors.lastName}
        />
        <PropertyTextInput
          title="Phone Number*"
          placeholder="Phone Number"
          fieldRegister={register("phoneNumber")}
          fieldError={errors.phoneNumber}
        />
        <PropertyTextInput
          title="Email Address*"
          placeholder="Email Address"
          fieldRegister={register("email")}
          fieldError={errors.email}
        />
        <PropertyTextInput
          title="Location*"
          placeholder="Your Location"
          fieldRegister={register("location")}
          fieldError={errors.location}
        />
        <PropertyTextAreaV2
          title="About Text*"
          name="aboutText"
          sizeFull={true}
        />
        <h4 className="homec-modal-form__middle">Social Link</h4>
        <div className="row">
          <PropertyTextInput
            size="col-lg-6 col-md-6"
            title="Facebook*"
            placeholder="Facebook Link"
            fieldRegister={register("socials.facebook")}
            fieldError={errors.socials?.facebook}
          />
          <PropertyTextInput
            size="col-lg-6 col-md-6"
            title="Twitter*"
            placeholder="Twitter Link"
            fieldRegister={register("socials.twitter")}
            fieldError={errors.socials?.twitter}
          />
          <PropertyTextInput
            size="col-lg-6 col-md-6"
            title="Instagram*"
            placeholder="Instagram Link"
            fieldRegister={register("socials.instagram")}
            fieldError={errors.socials?.instagram}
          />
          <PropertyTextInput
            size="col-lg-6 col-md-6"
            title="Linkedin*"
            placeholder="Linkedin Link"
            fieldRegister={register("socials.linkedin")}
            fieldError={errors.socials?.linkedin}
          />
        </div>
      </div>
      {/* Form Group  */}
      <div className="form-group form-mg-top25">
        <div className="ecom-wc__button ecom-wc__button--bottom">
          <button className="homec-btn homec-btn__second" type="submit">
            <span>Update Profile</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default PersonalInfo;
