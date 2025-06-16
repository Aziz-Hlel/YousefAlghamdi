import PropertyTextInput from "./PropertyTextInput2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { useAuth } from "@src/providers/AuthProvider.context";
import roles from "@src/types/roles.type";
import { FileWithPath, useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import prepareImageForUpload from "./prepareImageForUpload";
import { uploadImageToS3_SIMULATOR } from "@src/utils/getSignedUrlUpload";
import { imagePurposes } from "@src/types/imagePurpose.types";
import CircularProgressBarAgent from "./CircularProgressBarAgent";
import { useAgents } from "@src/providers/AgentsProvider.context";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import useUserSchema from "@src/schemas/useEditPersonalInfo.schema";
import { z } from "zod";





function PersonalInfo({ toggleModal }: { toggleModal: () => void }) {


  const { user, refreshUser } = useAuth();
  const { agents } = useAgents();
  const [folderId, setfolderId] = useState("");
  const { t } = useTranslation(['common', 'dashboard']);
  const { userSchema } = useUserSchema();
  type addAgentSchemaType = z.infer<typeof userSchema>

  if (!user) return null;

  const { register, handleSubmit, formState: { errors, isSubmitting, }, setError, clearErrors, setValue, getValues } =
    useForm<addAgentSchemaType>({
      resolver: zodResolver(userSchema),
      defaultValues: user,
    });

  useEffect(() => {
    if (user.role === roles.AGENT) {

      setValue("agentInfo.imageGallery.mainImage.url", agents[user!.id].agentInfo!.imageGallery.mainImage.url);
      setValue("agentInfo.imageGallery.miniImage.url", agents[user!.id].agentInfo!.imageGallery.miniImage.url);
      setfolderId(agents[user!.id].agentInfo!.imageGallery.folderId)
    }
  }, [user])


  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: { 'image/*': [], },
    disabled: false,
    maxSize: 5 * 1024 * 1024, // 5MB max file size

  });

  const { acceptedFiles: acceptedFilesMini, getRootProps: getRootPropsMini, getInputProps: getInputPropsMini } = useDropzone({
    maxFiles: 1,
    accept: { 'image/*': [], },
    disabled: false,
    maxSize: 5 * 1024 * 1024, // 5MB max file size

  });

  const [progressMain, setProgressMain] = useState<number>();
  const [progressMini, setProgressMini] = useState<number>();






  const handleImageInput = async (uploadedImg: FileWithPath, attr: "agentInfo.imageGallery.mainImage" | "agentInfo.imageGallery.miniImage", setProgress: Function) => {

    const optimizedImg = await prepareImageForUpload(uploadedImg);

    if (attr === "agentInfo.imageGallery.mainImage" && (optimizedImg.width !== 960 || optimizedImg.height !== 1280)) {
      setError(attr, { message: "Image size should be 960x1280" });
      return
    } else if (attr === "agentInfo.imageGallery.mainImage") {
      clearErrors(attr);
    }

    if (attr === "agentInfo.imageGallery.miniImage" && (optimizedImg.width !== 90 || optimizedImg.height !== 90)) {
      setError(attr, { message: "Image size should be 90x90" });
      return
    } else if (attr === "agentInfo.imageGallery.miniImage") {
      clearErrors(attr);
    }


    const key = await uploadImageToS3_SIMULATOR(optimizedImg.blob, uploadedImg.name, folderId, imagePurposes.PROFILE, setProgress);
    const imgWithPreview = Object.assign(uploadedImg, {
      preview: URL.createObjectURL(uploadedImg),
      key: key
    });


    setValue(attr, { key: imgWithPreview.key, url: URL.createObjectURL(uploadedImg) });


  };






  useEffect(() => {
    if (acceptedFiles.length > 0) {

      handleImageInput(acceptedFiles[acceptedFiles.length - 1], "agentInfo.imageGallery.mainImage", (progress: any) => { setProgressMain(progress) });
    };

  }, [acceptedFiles])

  useEffect(() => {
    if (acceptedFilesMini.length > 0) {

      handleImageInput(acceptedFilesMini[acceptedFilesMini.length - 1], "agentInfo.imageGallery.miniImage", (progress: any) => { setProgressMini(progress) });
    };

  }, [acceptedFilesMini])





  const onSubmit = async (data: addAgentSchemaType) => {


    const response = await Http.patch(`${apiGateway.user.update}`, data);
    response?.status === 200 && refreshUser()
    response?.status === 200 && toggleModal()
    response?.status === 200 && window.location.reload()
    response && response.status !== 200 && Object.keys(response.data.errors).map((key: any) => {
      setError(key, { message: response.data.errors[key] })
    })



  };

  console.log(errors);



  return (

    <form className="ecom-wc__form-main p-0" method="post"
      onSubmit={handleSubmit(onSubmit)}>

      <div className="row">
        {(user.role === roles.AGENT) &&
          <>
            <div className="col-6">
              <div className=" mg-top-20" {...getRootProps()}>
                <img src={getValues("agentInfo.imageGallery.mainImage.url") ? getValues("agentInfo.imageGallery.mainImage.url") : "https://placehold.co/960x1280"} alt="#" />
                <label htmlFor="file-input">



                  <span className="homec-pimg">
                    {progressMain ? <CircularProgressBarAgent progress={progressMain} />

                      :
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
                    }
                  </span>
                </label>
                <input {...getInputProps()} />
              </div>
              {<div className=" text-red-600"> {errors.agentInfo?.imageGallery?.mainImage?.message}</div>}
              <span className=" text-gray-600"> {capitalizePhrase(t(getText.dashboard.personalInfo.editProfile.mainImage.title))}</span>
              <div className="text-gray-600">{capitalizePhrase(t(getText.dashboard.personalInfo.editProfile.mainImage.resolution))}  </div>

            </div>


            <div className="col-6">
              <div className="homec-profile__edit mg-top-20" {...getRootPropsMini()}>
                <img src={getValues("agentInfo.imageGallery.miniImage.url") ? getValues("agentInfo.imageGallery.miniImage.url") : "https://placehold.co/90x90"} alt="#" />
                <label htmlFor="file-input">
                  <span className="homec-pimg">
                    {progressMini ? <CircularProgressBarAgent progress={progressMini} /> :
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
                      </svg>}
                  </span>
                </label>
                <input {...getInputPropsMini()} />
              </div>
              {<span className=" text-red-600"> {errors.agentInfo?.imageGallery?.miniImage?.message}</span>}

              <span className=" text-gray-600"> {capitalizePhrase(t(getText.dashboard.personalInfo.editProfile.miniImage.title))}</span>
              <div className="text-gray-600">{capitalizePhrase(t(getText.dashboard.personalInfo.editProfile.miniImage.resolution))}</div>

            </div>
          </>
        }

        <PropertyTextInput
          size="col-lg-6 col-md-6"
          title={capitalizePhrase(t(getText.common.firstName))}
          placeholder="Demo Name"
          fieldRegister={register("firstName")}
          fieldError={errors.firstName}
        />
        <PropertyTextInput
          size="col-lg-6 col-md-6"
          title={capitalizePhrase(t(getText.common.lastName))}
          placeholder="Demo Name"
          fieldRegister={register("lastName")}
          fieldError={errors.lastName}
        />
        <PropertyTextInput
          title={capitalizePhrase(t(getText.common.phoneNumber))}
          placeholder="Phone Number"
          fieldRegister={register("phoneNumber")}
          fieldError={errors.phoneNumber}
        />


        {<span className="pl-2 text-red-600 ">{errors.root?.message}</span>}

      </div>
      {/* Form Group  */}
      <div className="form-group form-mg-top25">
        <div className="ecom-wc__button ecom-wc__button--bottom">
          <button className="homec-btn homec-btn__second" type="submit" disabled={isSubmitting}>
            <span>{isSubmitting ? capitalizePhrase(t(getText.common.loading)) : capitalizePhrase(t(getText.dashboard.personalInfo.editProfile.updateProfile))}</span>
          </button>
        </div>
      </div>
    </form >
  );
}

export default PersonalInfo;
