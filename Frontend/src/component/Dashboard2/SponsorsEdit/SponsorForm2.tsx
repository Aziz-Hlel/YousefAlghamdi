import { useEffect, useState } from "react";
import PropertyTextInput from "../../Form/PropertyTextInput2";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { Sponsor, useSponsorsContext } from "./Sponsors.provider";
import { FileWithPath, useDropzone } from "react-dropzone";
import CircularProgressBarAgent from "@src/component/Form/CircularProgressBarAgent";
import prepareImageForUpload from "@src/component/Form/prepareImageForUpload";
import { uploadImageToS3_SIMULATOR } from "@src/utils/getSignedUrlUpload";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";


const SponsorSchema = z.object({


  name: z.string({ required_error: "name is required" })
    .min(1, { message: "name is required" })  // Custom message for required field
    .max(50, { message: "name must be at most 50 characters long" }),

  url: z.string({ required_error: "url is required" })
    .min(1, { message: "url is required" })  // Custom message for required field
    .max(50, { message: "url must be at most 50 characters long" }),

  image: z.object({
    key: z.string(),
    url: z.string().optional(),
  }),



})

type addAgentSchemaType = z.infer<typeof SponsorSchema>



function SponsorForm() {

  const { sponsors, getSponsors } = useSponsorsContext();
  const { sponsorId } = useParams();
  const { t } = useTranslation(['common', 'dashboard']);


  const editMode = sponsorId ? true : false;

  const sponsorToEdit: Sponsor | undefined = editMode ? sponsors.find((sponsor) => sponsor._id === sponsorId) : undefined

  const { register, handleSubmit, reset, formState: { errors, isSubmitting, }, setError, setValue, getValues } =
    useForm<addAgentSchemaType>({
      resolver: zodResolver(SponsorSchema),
      defaultValues: sponsorToEdit
    });


  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: { 'image/*': [], },
    disabled: false,
    maxSize: 10 * 1024 * 1024, // 5MB max file size

  });
  const [progressMain, setProgressMain] = useState<number>();


  const handleImageInput = async (uploadedImg: FileWithPath, setProgress: Function) => {

    const optimizedImg = await prepareImageForUpload(uploadedImg);

    const key = await uploadImageToS3_SIMULATOR(optimizedImg.blob, uploadedImg.name, "folderid", "sponsor", setProgress);

    const imgWithPreview = Object.assign(uploadedImg, {
      preview: URL.createObjectURL(uploadedImg),
      key: key
    });


    setValue("image", { key: imgWithPreview.key, url: URL.createObjectURL(uploadedImg) });


  };

  useEffect(() => {
    if (acceptedFiles.length > 0) {

      handleImageInput(acceptedFiles[acceptedFiles.length - 1], (progress: any) => { setProgressMain(progress) });
    };

  }, [acceptedFiles])


  const navigate = useNavigate();;
  useEffect(() => {

    if (sponsorId) {
      console.log('t5ll5l5l5l5');

      reset()
    }

  }, [sponsorId])

  const onSubmit = (data: addAgentSchemaType) => {

    const createSponsor = async () => {

      const response = await Http.post(apiGateway.sponsor.create, data);
      response?.status === 201 && await getSponsors()
      response?.status === 201 && navigate("../")
      response && response.status !== 201 && Object.keys(response.data.errors).map((key: any) => {
        console.log(response.data.errors[key]);

        setError(key, { message: response.data.errors[key] })
      })

    };

    const updateSponsor = async () => {

      const response = await Http.put(`${apiGateway.sponsor.update}/${sponsorId}`, data);
      response?.status === 200 && await getSponsors()
      response?.status === 200 && navigate("../")
      response && response.status !== 200 && Object.keys(response.data.errors).map((key: any) => {
        setError(key, { message: response.data.errors[key] })
      })
    }

    data.image.url = undefined

    editMode ? updateSponsor() : createSponsor();

  };

  console.log(errors);



  return (
    <form className="ecom-wc__form-main p-0" method="post"
      onSubmit={handleSubmit(onSubmit)}>

      <div className="row">
        <div className="col-12">
          <div className=" flex  max-w-24 w-auto justify-start mg-top-20 rounded-none" {...getRootProps()}>

            <img src={getValues("image.url") ?? ""} className="bg-gray-300 max-w-24 w-24 min-h-24 h-24 rounded-none" />

            <label htmlFor="file-input rounded-none">
              <span className="homec-pimg">
                {
                  progressMain ?
                    <CircularProgressBarAgent progress={progressMain} />
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
        </div>
        <PropertyTextInput
          size="col-lg-6 col-md-6"
          title={capitalizePhrase(t(getText.dashboard.sponsors.cuSponsor.name))}
          placeholder="Demo Name"
          fieldRegister={register("name")}
          fieldError={errors.name}
        />
        <PropertyTextInput
          size="col-lg-6 col-md-6"
          title={capitalizePhrase(t(getText.dashboard.sponsors.cuSponsor.url))}
          placeholder="Demo Name"
          fieldRegister={register("url")}
          fieldError={errors.url}
        />


        {<span className="pl-2 text-red-600 ">{errors.root?.message}</span>}

      </div>
      {/* Form Group  */}
      <div className="form-group form-mg-top25">
        <div className="ecom-wc__button ecom-wc__button--bottom">
          <button className="homec-btn homec-btn__second" type="submit" disabled={isSubmitting}>
            <span>{isSubmitting ? "Loading" : "Update Profile"}</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default SponsorForm;
