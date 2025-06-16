import { useEffect, useRef, useState } from "react";
import PropertyTextInput from "./PropertyTextInput2";
import PropertyTextArea from "./PropertyTextArea2";
import KeyValueInput from "./KeyValueInput2";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckInput2 from "./CheckInput3";
import SelectiveInputForm from "./SelectiveInputForm";
import { categoriesType, commercialCategories, nonCommercialCategories, ResidentialProperties, sub_categories } from "@src/types/categories.subcategories.types";
import { additionalDetailsAttributes } from "@src/types/additionalDetails.types";
import { FileWithPath } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { cities, delegations } from "@src/types/cities.delegations.types";
import { uploadImageToS3_SIMULATOR } from "@src/utils/getSignedUrlUpload";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { useSinglePropertyContext } from "@src/providers/SingleProperty.context";
import Iproperty from "@src/models/property.type";
import statesTypes from "@src/types/states.types";
import { useAuth } from "@src/providers/AuthProvider.context";
import roles from "@src/types/roles.type";
import { AxiosResponse } from "axios";
import Swal from 'sweetalert2'
import { Alert, ConfirmationAlertAsync } from "@src/utils/createAlert";
import prepareImageForUpload from "./prepareImageForUpload";
import ImageInput from "./ImageInput2";
import useSubmitPropertySchema from "@src/schemas/useSubmitPropertySchema";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import listing_period from "@src/types/listing_period.types";






type imageArray = ({ url: string; key: string; } | null)[];

const PropertyFrom = () => {

  const { user } = useAuth()
  const { property } = useSinglePropertyContext();
  const [InspectedProperty, setInspectedProperty] = useState<Iproperty | undefined>(undefined);
  const imgsFolderId = useRef<string>("");
  const navigate = useNavigate();

  const { t } = useTranslation(['data', 'common', 'submitProperty', 'alerts']);


  const { SubmitPropertySchema } = useSubmitPropertySchema();
  type SubmitPropertyType = z.infer<typeof SubmitPropertySchema>;

  const { register, watch, handleSubmit, setValue, reset, formState: { errors, isSubmitting, }, setError } =
    useForm<SubmitPropertyType>({
      resolver: zodResolver(SubmitPropertySchema),
    });
  useEffect
  const propertyCategoryValue = watch('category');
  const CityValueObserver = watch('city');

  const [NearestLocation, setNearestLocation] = useState<{ placeName: string, distance: string }[]>([{ placeName: "", distance: "" }]);
  const [additionalDetails, setAdditionalDetails] = useState<string[]>([])

  const initialImgArray: imageArray = [null, null, null, null];
  const [imgs, setImgs] = useState<imageArray>(initialImgArray);

  useEffect(() => {
    console.log("imgs", imgs);
  }, [imgs]);

  useEffect(() => {

    if (!property) return
    //walli na77i linspected property w3tih direct ml property
    if ([statesTypes.active, statesTypes.toBeAdded, statesTypes.toBeDeleted, statesTypes.unavailable].includes(property.advanced.state))
      setInspectedProperty(property)


    // else taw tobedited valid , lo5riin n3rch
    if (property.advanced.state === statesTypes.toBeUpdated)
      setInspectedProperty(property.advanced.updated_version as any)

    // property.advanced.state === statesTypes.toBeUpdated ?
    //   setInspectedProperty(property.advanced.updated_version as any)
    //   : setInspectedProperty(property);


    setValue("listing_type", property.listing_type)
  }, [property]);

  useEffect(() => {
    if (!InspectedProperty) return
    //walli na77i linspected property w3tih direct ml property

    reset({
      id: InspectedProperty.id,

      title: InspectedProperty.title,
      description: InspectedProperty.description,

      category: InspectedProperty.category,
      sub_category: InspectedProperty.sub_category,

      city: InspectedProperty.city,
      delegation: InspectedProperty.delegation,
      addresse: InspectedProperty.addresse,

      listing_type: InspectedProperty.listing_type,
      listing_period: InspectedProperty.listing_period,


      filterFields: {
        price: String(InspectedProperty.filterFields.price),
        area: String(InspectedProperty.filterFields.area),
        rooms: InspectedProperty.filterFields.rooms ?? undefined,
        bathrooms: InspectedProperty.filterFields.bathrooms ?? undefined,
      },

      imageGallery: {
        folderId: InspectedProperty.imageGallery.folderId,
        images: InspectedProperty.imageGallery.images.map((img) => ({ key: img.key }))
      },

      additionalDetails: InspectedProperty.additionalDetails,
    })

    imgsFolderId.current = InspectedProperty.imageGallery.folderId;
    setAdditionalDetails(InspectedProperty.additionalDetails)

    setNearestLocation(() =>
      Object.entries(InspectedProperty.nearestPlaces).map(([placeName, distance]) => ({
        placeName,
        distance,
      }))
    );

    //! r u sure ?
    InspectedProperty.imageGallery.images.map((img, index) => urlToFileWithPath(img, index));


  }, [InspectedProperty]);


  useEffect(() => {
    setValue("additionalDetails", [])

    if (propertyCategoryValue && !sub_categories[propertyCategoryValue as keyof typeof sub_categories].includes(watch('sub_category'))) {
      setValue('sub_category', "")
    }

  }, [propertyCategoryValue])


  if (!property) return <></>

  const propertyState = property?.advanced.state







  const setAdditionalDetailsWrapper = (event: any) => {
    event.target.checked ? setAdditionalDetails((prev) => [...prev, event.target.name]) : setAdditionalDetails((prev) => prev.filter((item) => item !== event.target.name));

  };
  // const customErrors: Record<"imgs", string> = {
  //   imgs: "Image is required",
  // }


  const handleImageDelete = (idx: number) => {
    setImgs((prev) => prev.map((_, index) => index === idx ? null : _));
  };


  // handle property image input sector

  const handleImageInput = async (uploadedImg: FileWithPath, idx: number, setProgress: Function, fileName?: string) => {

    const optimizedImg = await prepareImageForUpload(uploadedImg);
    // if (optimizedImg.width !== 1920 || optimizedImg.height !== 1080) {
    //   setError("imageGallery.images", { message: "Image size should be 1920x1080" });
    //   return
    // }

    setError("imageGallery.images", { message: "" });
    const key = await uploadImageToS3_SIMULATOR(optimizedImg.blob, fileName ?? uploadedImg.name, imgsFolderId.current, "property", setProgress);
    const imgWithPreview = Object.assign(uploadedImg, {
      preview: URL.createObjectURL(uploadedImg),
      key: key,
    });

    console.log("imgWithPreview", imgWithPreview);

    setImgs((prev) => {
      const newArray = [...prev];
      newArray[idx] = { url: URL.createObjectURL(uploadedImg), key: key };
      return newArray;
    });

  };




  async function urlToFileWithPath(img: { url?: string, key: string }, index: number) {

    setImgs((prev) => {
      const newArray = [...prev];
      newArray[index] = { key: img.key, url: img.url ?? "#" };
      return newArray;
    });

  }



  // handle aminities

  // const handleCheckBox = (e: any) => {
  //   setProperty({
  //     ...property,
  //     aminities: { ...property.aminities, [e.target.name]: e.target.checked },
  //   });
  // };
  // handle Property Plan, additionalInformation, nearestLocation add new item or delete item

  const handleAddOrDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string, idx: number,) => {
    e.preventDefault();
    if (type === "add") {

      if (NearestLocation[NearestLocation.length - 1].placeName !== "" && NearestLocation[NearestLocation.length - 1].distance !== "")
        setNearestLocation([...NearestLocation, { placeName: "", distance: "" }]);
    }
    else
      setNearestLocation(NearestLocation.filter((_, index) => index !== idx));


  }

  // handle Property Plan, additionalInformation, nearestLocation input filled
  const handleKeyValueChange = (idx: any, keyType: "placeName" | "distance", value: string) => {

    setNearestLocation(NearestLocation.map((item, index) => index === idx ? { ...item, [keyType]: value } : item));

  };

  console.log("errrrrrrrrr:::::", errors)


  const handleFormSubmit: SubmitHandler<SubmitPropertyType> = async (data) => {


    const updateAdditionalDetails = (data: any) => {
      data.additionalDetails = additionalDetails;

    }

    const updateNearestLocation = (data: any) => {
      if (NearestLocation.length === 1 && NearestLocation[0].placeName === "" && NearestLocation[0].distance === "") data.nearestPlaces = {};
      else {
        data.nearestPlaces = {};
        NearestLocation.forEach((item) => {
          if (item.placeName !== "" && item.distance !== "") data.nearestPlaces[item.placeName] = item.distance;
        });
      }

    }

    const updateImages = (data: any) => {
      if (imgs[0] === null) {
        setError("imageGallery.images", { message: "Thumbnail Image is required" });
        return;
      }
      else data.imageGallery.images = imgs.filter((img) => img !== null).map((img) => ({ key: img.key }));


    }


    const checkProperVariables = (data: any) => {
      if (data.category !== ResidentialProperties) {
        delete data.filterFields.rooms
        delete data.filterFields.bathrooms
      }
    }

    const removeId = (data: any) => {
      delete data._id
    }

    const listing_period_Validation = (data: any) => {
      if (!data.listing_type.includes("rent")) delete data.listing_period

    }

    if (!InspectedProperty) return


    const refinedData: any = data;
    refinedData.clientId = InspectedProperty.clientId;
    refinedData.agentId = InspectedProperty.agentId;


    if (property.advanced.state === statesTypes.toBeAdded) {


      if (user?.role === roles.AGENT || user?.role === roles.ADMIN) {

        if (user?.role === roles.ADMIN && !property.agentId) {
          Alert({ title: capitalizePhrase(t(getText.alerts.titles.info)), text: capitalizePhrase(t(getText.alerts.editProperty.associateAgent)), icon: "info" });
        }
        else {
          updateAdditionalDetails(refinedData)
          updateNearestLocation(refinedData)
          updateImages(refinedData)
          checkProperVariables(refinedData)
          removeId(refinedData)
          listing_period_Validation(refinedData)
          const response = await Http.put(`${apiGateway.property.approve}/${property.id}`, refinedData);
          if (response?.status === 200) navigate("./../../");
          else Alert({ title: "Error", text: "Something went wrong", icon: "warning" });
        }

      }

      else if (user?.role === roles.USER || user?.role === roles.CLIENT) {
        Alert({ title: capitalizePhrase(t(getText.alerts.titles.info)), text: capitalizePhrase(t(getText.alerts.editProperty.needToBeAddedBefore)), icon: "info" });
      }

    }

    if (property.advanced.state === statesTypes.active || property.advanced.state === statesTypes.toBeUpdated) {

      updateAdditionalDetails(refinedData)
      updateNearestLocation(refinedData)
      updateImages(refinedData)
      checkProperVariables(refinedData)
      removeId(refinedData)
      listing_period_Validation(refinedData)

      let response: AxiosResponse<any, any> | undefined

      if (user?.role === roles.AGENT || user?.role === roles.ADMIN) {
        response = await Http.put(`${apiGateway.property.approve}/${property.id}`, refinedData);
        if (response?.status === 200) navigate("./../../")
        else {
          console.log(response);
          Alert({ title: "Error", text: "Something went wrong", icon: "warning" });
        }
      }
      // meaning user
      else {
        response = await Http.patch(`${apiGateway.property.update}/${property.id}`, refinedData);
        if (response?.status === 200) navigate("./../../")
        else {
          console.log(response);
          Alert({ title: "Error", text: "Something went wrong", icon: "warning" });
        }
      }

      // const response = await Http.patch(url, refinedData);
      if (response?.status === 200) navigate("./../../")
      else console.log(response);

    }

    if (property.advanced.state === statesTypes.toBeDeleted) {

      if (user?.role === roles.ADMIN || user?.role === roles.AGENT) {

        const result = await createAlert()
        if (result.isConfirmed) {
          const response = await Http.delete(`${apiGateway.property.delete}/${property.id}`);
          if (response?.status === 200) navigate("./../../")
          else Alert({ title: "Error", text: "Something went wrong", icon: "warning" });
        }
      }
      else {
        Alert({ title: capitalizePhrase(t(getText.alerts.titles.info)), text: capitalizePhrase(t(getText.alerts.editProperty.requestToDeletePropSend)), icon: "info" });
      }

    }


  };


  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("./../../")
  }

  const createAlert = async () => {
    return await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
  }

  const handleDecline = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault();



    if (!propertyState) return
    // u prob gone notifications for this to inform the client 
    switch (propertyState) {
      case statesTypes.toBeAdded:
        const result = await ConfirmationAlertAsync({ title: capitalizePhrase(t(getText.alerts.titles.DeclineRequest)), text: capitalizePhrase(t(getText.alerts.editProperty.sureDeclineNDelete)), icon: "warning" })
        if (result.isConfirmed) {
          const response = await Http.delete(`${apiGateway.property.delete}/${property.id}`);
          if (response?.status === 200) navigate("./../../")
          else alert("something went wrong");
        }
        break;

      case statesTypes.toBeUpdated:
        const result2 = await ConfirmationAlertAsync({ title: capitalizePhrase(t(getText.alerts.titles.DeclineRequest)), text: capitalizePhrase(t(getText.alerts.editProperty.sureDeclineUpdate)), icon: "warning" })
        if (result2.isConfirmed) {
          const response = await Http.get(`${apiGateway.property.decline}/${property.id}`);
          if (response?.status === 200) navigate("./../../")
          else alert("something went wrong");
        }
        break;

      case statesTypes.toBeDeleted:
        const result3 = await ConfirmationAlertAsync({ title: capitalizePhrase(t(getText.alerts.titles.DeclineRequest)), text: capitalizePhrase(t(getText.alerts.editProperty.sureDeclineDelete)), icon: "warning" })
        if (result3.isConfirmed) {
          const response = await Http.get(`${apiGateway.property.decline}/${property.id}`);
          if (response?.status === 200) navigate("./../../")
          else alert("something went wrong");
        }
        break;

      default:
        break;
    }
  }

  return (
    <section className="pd-top-80 pd-btm-80"  >
      <div className="container" aria-disabled>
        <div className="row">
          <div className="col-12">

            <form
              method="post"
              onSubmit={handleSubmit(handleFormSubmit)}>


              <div className="homec-submit-form">
                <h4 className="homec-submit-form__title">
                  {capitalizePhrase(t(getText.submitProperty.propertyInformation.title))}
                </h4>
                <div className="homec-submit-form__inner">
                  <div className="row">

                    <PropertyTextInput

                      title={capitalizePhrase(t(getText.submitProperty.propertyInformation.propertyTitle))}
                      placeholder="Title"
                      fieldRegister={register('title')}
                      fieldError={errors.title}

                    />

                    <SelectiveInputForm
                      size="col-lg-6 col-md-6"
                      title={capitalizePhrase(t(getText.submitProperty.propertyInformation.category))}
                      options={InspectedProperty?.listing_type.includes("commercial") ? commercialCategories : nonCommercialCategories}
                      fieldRegister={register('category')}
                      fieldError={errors.category}
                    />

                    <SelectiveInputForm
                      size="col-lg-6 col-md-6"
                      title={capitalizePhrase(t(getText.submitProperty.propertyInformation.subCategory))}
                      options={propertyCategoryValue && Object.keys(categoriesType).includes(propertyCategoryValue) ? sub_categories[propertyCategoryValue as keyof typeof sub_categories] : []}
                      fieldRegister={register('sub_category')}
                      fieldError={errors.sub_category}
                    />

                    <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title={capitalizePhrase(t(getText.submitProperty.propertyInformation.propertyPrice))}
                      placeholder="24345"
                      fieldRegister={register('filterFields.price')}
                      fieldError={errors.filterFields?.price}
                    />

                    {
                      property.listing_type.includes("rent") && <SelectiveInputForm
                        size="col-lg-4 col-md-6 flex items-center mt-3"
                        title={capitalizePhrase(t(getText.submitProperty.propertyInformation.listing_period))}
                        options={Object.values(listing_period)}
                        fieldRegister={register('listing_period')}
                        fieldError={errors.listing_period}
                      />
                    }

                    <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title={capitalizePhrase(t(getText.submitProperty.propertyInformation.totalArea))}
                      fieldRegister={register('filterFields.area')}
                      fieldError={errors.filterFields?.area}
                      placeholder="1200"
                    />

                    {propertyCategoryValue === ResidentialProperties && <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title={capitalizePhrase(t(getText.submitProperty.propertyInformation.rooms))}
                      fieldRegister={register('filterFields.rooms')}
                      fieldError={errors.filterFields?.rooms}
                      placeholder="2"
                    />}

                    {propertyCategoryValue === ResidentialProperties && <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title={capitalizePhrase(t(getText.submitProperty.propertyInformation.bathrooms))}
                      fieldRegister={register('filterFields.bathrooms')}
                      fieldError={errors.filterFields?.bathrooms}
                      placeholder="2"
                    />}

                    <PropertyTextArea
                      title={capitalizePhrase(t(getText.submitProperty.propertyInformation.description))}
                      fieldRegister={register('description')}
                      fieldError={errors.description}
                    />

                  </div>

                </div>
              </div>

              <div className="homec-submit-form mg-top-40">
                <h4 className="homec-submit-form__title">{capitalizePhrase(t(getText.submitProperty.propertyLocation.title))}</h4>
                <div className="homec-submit-form__inner">
                  <div className="row ">
                    {/* Single Form Element   */}
                    <SelectiveInputForm
                      size="col-md-4 flex justify-center items-center mg-top-20"
                      title={capitalizePhrase(t(getText.submitProperty.propertyLocation.city))}
                      options={Object.keys(cities)}
                      fieldRegister={register('city')}
                      fieldError={errors.city}
                    />

                    <SelectiveInputForm
                      size="col-md-4 flex justify-center items-center mg-top-20"
                      title={capitalizePhrase(t(getText.submitProperty.propertyLocation.delegation))}
                      options={CityValueObserver && Object.keys(cities).includes(CityValueObserver) ? delegations[CityValueObserver as keyof typeof delegations] : []}
                      fieldRegister={register('delegation')}
                      fieldError={errors.delegation}
                    />

                    <PropertyTextInput
                      size="col-md-4  flex justify-center items-center -mt-10"
                      title={capitalizePhrase(t(getText.submitProperty.propertyLocation.streetAdresse))}
                      fieldRegister={register('addresse')}
                      fieldError={errors.addresse}
                      placeholder="Emirates Towers, Sheikh Zayed Road"
                    />


                  </div>
                </div>
              </div>

              <div className="homec-submit-form mg-top-40">
                <h4 className="homec-submit-form__title">
                  {capitalizePhrase(t(getText.data.additionalDetails))}
                </h4>
                <div className="homec-submit-form__inner">
                  <div className="row">

                    <div className="flex  flex-wrap gap-12 w-full">

                      {propertyCategoryValue && Object.keys(categoriesType).includes(propertyCategoryValue) &&
                        additionalDetailsAttributes[propertyCategoryValue as keyof typeof additionalDetailsAttributes].map((item: string, index: number) => (
                          <CheckInput2
                            key={index}
                            title={item}
                            setAdditionalDetails={setAdditionalDetailsWrapper}
                            additionalDetails={additionalDetails}
                          />
                        ))}

                    </div>

                  </div>
                </div>
              </div>



              <div className="homec-submit-form mg-top-40">
                <h4 className="homec-submit-form__title">{capitalizePhrase(t(getText.submitProperty.nearestLocation.title))}</h4>

                <KeyValueInput
                  list={NearestLocation}
                  handleAddOrDelete={handleAddOrDelete}
                  handleChange={handleKeyValueChange}
                  filedTitle={capitalizePhrase(t(getText.submitProperty.nearestLocation.nearestLocation))}
                  filedTitleTwo={capitalizePhrase(t(getText.submitProperty.nearestLocation.distance))}

                  placeholderOne={capitalizePhrase(t(getText.submitProperty.nearestLocation.nearestLocationPlaceholder))}
                  placeholderTwo={capitalizePhrase(t(getText.submitProperty.nearestLocation.distancePlaceholder))}
                />

              </div>

              <ImageInput
                imgs={imgs}
                handleDelete={handleImageDelete}
                handleImage={handleImageInput}
                fieldError={errors.imageGallery?.images}

              />

              {/* <PropertyLocationInput                                                                                                                            
                location={input.location}                                                                                                                           
                handleLocation={handleLocationChange}                                                                                                                           
              /> */}






              <div className="row">
                <div className=" w-full ">


                  <div className="col-12 d-flex flex-col items-center sm:flex-row justify-content-end mg-top-40 gap-2">
                    <button className="homec-btn  bg-red-500" onClick={handleCancel}>
                      <span >{isSubmitting ? `${capitalizePhrase(t(getText.common.loading))}...` : capitalizePhrase(t(getText.common.cancel))}</span>
                    </button>
                    {(user?.role === roles.ADMIN || user?.role === roles.AGENT) &&
                      (property.advanced.state === statesTypes.toBeUpdated || property.advanced.state === statesTypes.toBeAdded
                        || property.advanced.state === statesTypes.toBeDeleted
                      ) && < button onClick={handleDecline} value={propertyState} className="homec-btn ">
                        <span  >{isSubmitting ? `${capitalizePhrase(t(getText.common.loading))}...` : capitalizePhrase(t(getText.submitProperty.btns.declineRequest))}</span>
                      </button>}
                    <button type="submit" className="homec-btn homec-btn__second ">
                      {propertyState === statesTypes.active && <span>{isSubmitting ? `${capitalizePhrase(t(getText.common.loading))}...` : capitalizePhrase(t(getText.submitProperty.btns.updateProperty))}</span>}
                      {propertyState === statesTypes.toBeAdded && <span>{isSubmitting ? `${capitalizePhrase(t(getText.common.loading))}...` : capitalizePhrase(t(getText.submitProperty.btns.approveProperty))}</span>}
                      {propertyState === statesTypes.toBeUpdated && <span>{isSubmitting ? `${capitalizePhrase(t(getText.common.loading))}...` : capitalizePhrase(t(getText.submitProperty.btns.updateProperty))}</span>}
                      {propertyState === statesTypes.toBeDeleted && <span>{isSubmitting ? `${capitalizePhrase(t(getText.common.loading))}...` : capitalizePhrase(t(getText.submitProperty.btns.deleteProperty))}</span>}
                      {propertyState === statesTypes.unavailable && <span>{isSubmitting ? `${capitalizePhrase(t(getText.common.loading))}...` : capitalizePhrase(t(getText.submitProperty.btns.makePropertyUnavailable))}</span>}

                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div >
    </section >
  );
}

export default PropertyFrom;
