import { useEffect, useRef, useState } from "react";
import PropertyTextInput from "./PropertyTextInput2";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAgents } from "@src/providers/AgentsProvider.context";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { FileWithPath, useDropzone } from "react-dropzone";
import prepareImageForUpload from "./prepareImageForUpload";
import { uploadImageToS3_SIMULATOR } from "@src/utils/getSignedUrlUpload";
import { v4 as uuidv4 } from 'uuid';
import CircularProgressBarAgent from "./CircularProgressBarAgent";
import { AgentFormType, createAgentSchema, createAgentSchemaType, updateAgentSchema, updateAgentSchemaType } from "@src/schemas/AgentSchema.CU";
import { imagePurposes } from "@src/types/imagePurpose.types";
import AgentImageInput from "./AgentImageInput";






function PersonalInfo() {

  const { agents, refreshAgents } = useAgents();
  const { agentId } = useParams();

  const editMode = agentId ? true : false;

  const { register, handleSubmit, formState: { errors, isSubmitting, }, watch, setError, clearErrors, setValue, getValues } =
    useForm<AgentFormType>({
      // * it just works when u add any
      resolver: zodResolver((!editMode ? createAgentSchema : updateAgentSchema) as any),
      defaultValues: agentId ? agents[agentId] : undefined
    });

  if (editMode) {
    createAgentSchema.innerType().omit({ password: true, confirmPassword: true });
  }

  const folderId = useRef<string>("")

  const agentMainImage = watch("agentInfo.imageGallery.mainImage");
  const agentMiniImage = watch("agentInfo.imageGallery.miniImage");

  useEffect(() => {

    if (!editMode) {
      const uid = uuidv4();
      folderId.current = uid
      setValue("agentInfo.imageGallery.folderId", uid)
    }
    else {
      const agentExistinUid = agents[agentId!]?.agentInfo.imageGallery.folderId
      folderId.current = agentExistinUid
      setValue("agentInfo.imageGallery.folderId", agentExistinUid)


    }


  }, [editMode])
  const navigate = useNavigate();;




  const { acceptedFiles: acceptedFilesMini, getRootProps: getRootPropsMini, getInputProps: getInputPropsMini } = useDropzone({
    maxFiles: 1,
    accept: { 'image/*': [], },
    disabled: false,
    maxSize: 5 * 1024 * 1024, // 5MB max file size

  });

  const [progressMain, setProgressMain] = useState<number>();
  const [progressMini, setProgressMini] = useState<number>();


  const handleImageInput = async (uploadedImg: File, attr: "agentInfo.imageGallery.mainImage" | "agentInfo.imageGallery.miniImage", setProgress: Function, fileName?: string) => {

    const optimizedImg = await prepareImageForUpload(uploadedImg);


    const key = await uploadImageToS3_SIMULATOR(optimizedImg.blob, fileName ?? uploadedImg.name, folderId.current, imagePurposes.PROFILE, setProgress);
    const imgWithPreview = Object.assign(uploadedImg, {
      preview: URL.createObjectURL(uploadedImg),
      key: key
    });


    setValue(attr, { key: imgWithPreview.key, url: URL.createObjectURL(uploadedImg) });


  };
  const handleDeleteImage = (attr: "agentInfo.imageGallery.mainImage" | "agentInfo.imageGallery.miniImage") => {
    setValue(attr, { key: "", url: "" });
  }



  useEffect(() => {
    if (acceptedFilesMini.length > 0) {

      handleImageInput(acceptedFilesMini[acceptedFilesMini.length - 1], "agentInfo.imageGallery.miniImage", (progress: any) => { setProgressMini(progress) });
    };

  }, [acceptedFilesMini])

  const onSubmit = (data: updateAgentSchemaType | createAgentSchemaType) => {

    const createAgent = async () => {

      const response = await Http.post(apiGateway.agent.create, data);
      response?.status === 201 && await refreshAgents()
      response?.status === 201 && navigate("../")
      response && response.status !== 201 && Object.keys(response.data.errors).map((key: any) => {
        console.log(response.data.errors[key]);

        setError(key, { message: response.data.errors[key] })
      })

    };

    const updateAgent = async () => {

      const response = await Http.put(`${apiGateway.agent.update}/${agentId}`, data);
      response?.status === 200 && await refreshAgents()
      response?.status === 200 && navigate("../")
      response && response.status !== 200 && Object.keys(response.data.errors).map((key: any) => {
        setError(key, { message: response.data.errors[key] })
      })
    }

    editMode ? updateAgent() : createAgent();

  };

  console.log(getValues())
  console.log(errors);


  const mainImageInputConfig = {
    img: agentMainImage,
    fieldError: errors.agentInfo?.imageGallery?.mainImage,
    folderId: folderId.current,
    handleImage: handleImageInput,
    handleDeleteImage: handleDeleteImage,
    imageSource: "agentInfo.imageGallery.mainImage" as "agentInfo.imageGallery.mainImage",
    placeholderImage: "https://placehold.co/960x1280",
    aspectRatio: 3 / 4,
    copperHeight: "lg:h-96 h-32 ",
    copperWidth: " w-20",
  };

  const miniImageInputConfig = {
    img: agentMiniImage,
    fieldError: errors.agentInfo?.imageGallery?.miniImage,
    folderId: folderId.current,
    handleImage: handleImageInput,
    handleDeleteImage: handleDeleteImage,
    imageSource: "agentInfo.imageGallery.miniImage" as "agentInfo.imageGallery.miniImage",
    placeholderImage: "https://placehold.co/200x200",
    aspectRatio: 1 / 1,
    copperHeight: "lg:h-72 h-20",
    copperWidth: " w-20",

  };


  return (
    <form className="ecom-wc__form-main p-0" method="post"
      onSubmit={handleSubmit(onSubmit)}>

      <div className="row">
        <div className="col-6    ">
          <AgentImageInput props={mainImageInputConfig} />
          {/* {< span className=" text-red-600" > {fieldError?.message}</span >} */}
          <span className=" text-gray-600 text-xs lg:text-base"> Main agent's image</span>
          <div className="text-gray-600 text-xs lg:text-base">Photo resolution: 960 × 1280  </div>

        </div>


        <div className="col-6">
          <AgentImageInput props={miniImageInputConfig} />
          {<span className=" text-red-600"> {errors.agentInfo?.imageGallery?.miniImage?.message}</span>}

          <span className=" text-gray-600 text-xs lg:text-base"> Minimized agent's image</span>
          <div className="text-gray-600 text-xs lg:text-base">Photo resolution: 200x200  </div>

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
        {!editMode && <PropertyTextInput
          title="Password*"
          placeholder="Password"
          fieldRegister={register("password")}
          fieldError={errors.password}
          type="password"
        />}
        {!editMode && <PropertyTextInput
          title="Confirm Password*"
          placeholder="Confirm Password"
          fieldRegister={register("confirmPassword")}
          fieldError={errors.confirmPassword}
          type="password"
        />}


        {<span className="pl-2 text-red-600 ">{errors.root?.message}</span>}
      </div>
      {/* Form Group  */}
      <div className="form-group form-mg-top25">
        <div className="ecom-wc__button ecom-wc__button--bottom">
          <button className="homec-btn homec-btn__second" type="submit" disabled={isSubmitting}>
            <span>{!isSubmitting && editMode && "Update Profile"}</span>
            <span>{!isSubmitting && !editMode && "Create Profile"}</span>
            <span>{isSubmitting && "Submitting..."}</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default PersonalInfo;
