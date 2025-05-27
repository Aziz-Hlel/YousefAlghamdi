import { useEffect, useRef } from "react";
import PropertyTextInput from "./PropertyTextInput2";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAgents } from "@src/providers/AgentsProvider.context";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import prepareImageForUpload from "./prepareImageForUpload";
import { uploadImageToS3_SIMULATOR } from "@src/utils/getSignedUrlUpload";
import { v4 as uuidv4 } from 'uuid';
import { imagePurposes } from "@src/types/imagePurpose.types";
import AgentImageInput from "./AgentImageInput";
import useAgentSchema from "@src/schemas/useAgentSchema.CU";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";






function PersonalInfo() {

  const { agents, refreshAgents } = useAgents();
  const { agentId } = useParams();

  const { t } = useTranslation(['data', 'common', 'dashboard']);

  const { createAgentSchema, updateAgentSchema } = useAgentSchema();

  type createAgentSchemaType = z.infer<typeof createAgentSchema>

  type updateAgentSchemaType = z.infer<typeof updateAgentSchema>

  type AgentFormType = createAgentSchemaType & Partial<updateAgentSchemaType>;

  const editMode = agentId ? true : false;

  const { register, handleSubmit, formState: { errors, isSubmitting, }, watch, setError, setValue, getValues } =
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
          <span className=" text-gray-600 text-xs lg:text-base"> {capitalizePhrase(t(getText.dashboard.agents.agentCU.mainAgentImage))}</span>
          <div className="text-gray-600 text-xs lg:text-base">{capitalizePhrase(t(getText.dashboard.agents.agentCU.mainphotoResolution))}  </div>

        </div>


        <div className="col-6">
          <AgentImageInput props={miniImageInputConfig} />
          {<span className=" text-red-600"> {errors.agentInfo?.imageGallery?.miniImage?.message}</span>}

          <span className=" text-gray-600 text-xs lg:text-base"> {capitalizePhrase(t(getText.dashboard.agents.agentCU.minimizedAgentImage))}</span>
          <div className="text-gray-600 text-xs lg:text-base">{capitalizePhrase(t(getText.dashboard.agents.agentCU.minimizePhotoResolution))}</div>

        </div>
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
        <PropertyTextInput
          title={capitalizePhrase(t(getText.common.emailAdress))}
          placeholder="Email Address"
          fieldRegister={register("email")}
          fieldError={errors.email}
        />
        {!editMode && <PropertyTextInput
          title={capitalizePhrase(t(getText.common.password))}
          placeholder="Password"
          fieldRegister={register("password")}
          fieldError={errors.password}
          type="password"
        />}
        {!editMode && <PropertyTextInput
          title={capitalizePhrase(t(getText.common.confirmPassword))}
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
            <span>{!isSubmitting && editMode && capitalizePhrase(t(getText.dashboard.agents.agentCU.btns.updateAgent))}</span>
            <span>{!isSubmitting && !editMode && capitalizePhrase(t(getText.dashboard.agents.agentCU.btns.addAgent))}</span>
            <span>{isSubmitting && `${capitalizePhrase(t(getText.common.submitting))}...`}</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default PersonalInfo;
