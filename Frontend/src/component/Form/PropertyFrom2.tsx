import { useEffect, useState } from "react";
import PropertyTextInput from "./PropertyTextInput2";
import PropertyTextArea from "./PropertyTextArea2";
import ImageInput from "./ImageInput2";
import KeyValueInput from "./KeyValueInput2";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckInput2 from "./CheckInput3";
import SelectiveInputForm from "./SelectiveInputForm";
import { categoriesType, commercialCategories, nonCommercialCategories, ResidentialProperties, sub_categories } from "@src/types/categories.subcategories.types";
import { additionalDetailsAttributes } from "@src/types/additionalDetails.types";
import { FileWithPath } from "react-dropzone";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { listing_typesValues } from "@src/types/listing_types.types";
import { cities, delegations } from "@src/types/cities.delegations.types";
import { uploadImageToS3_SIMULATOR } from "@src/utils/getSignedUrlUpload";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Alert } from "@src/utils/createAlert";
import prepareImageForUpload from "./prepareImageForUpload";
import { useTranslation } from "react-i18next";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import getText from "@src/i18n/data/getText";
import useSubmitPropertySchema from "@src/schemas/useSubmitPropertySchema";
import listing_period from "@src/types/listing_period.types";




type imageArray = ({ url: string; key: string; } | null)[];

const PropertyFrom = () => {


  const { whatFor, } = useParams();

  const imgsFolderId = useRef<string>(uuidv4());

  const { SubmitPropertySchema } = useSubmitPropertySchema();
  type SubmitPropertyType = z.infer<typeof SubmitPropertySchema>;

  const { register, watch, handleSubmit, setValue, formState: { errors, isSubmitting, }, setError } =
    useForm<SubmitPropertyType>({
      resolver: zodResolver(SubmitPropertySchema),

    });

  const navigate = useNavigate();


  const propertyCategoryValue = watch('category');
  const CityValueObserver = watch('city');

  const [NearestLocation, setNearestLocation] = useState<{ placeName: string, distance: string }[]>([{ placeName: "", distance: "" }]);
  const [additionalDetails, setAdditionalDetails] = useState<string[]>([]);

  const initialImgArray: imageArray = [null, null, null, null];
  const [imgs, setImgs] = useState<imageArray>(initialImgArray);

  const setAdditionalDetailsWrapper = (event: any) => {
    event.target.checked ? setAdditionalDetails((prev) => [...prev, event.target.name]) : setAdditionalDetails((prev) => prev.filter((item) => item !== event.target.name));

  };

  const { t } = useTranslation(['data', 'common', 'submitProperty', 'alerts']);

  useEffect(() => {
    setValue("additionalDetails", [])

    if (propertyCategoryValue && !sub_categories[propertyCategoryValue as keyof typeof sub_categories].includes(watch('sub_category'))) {
      setValue('sub_category', "")
    }
  }, [propertyCategoryValue])
  // const customErrors: Record<"imgs", string> = {
  //   imgs: "Image is required",
  // }


  const handleImageDelete = (idx: number) => {

    console.log("delete", idx);

    setImgs((prev) => prev.map((_, index) => index === idx ? null : _));
  };



  // // handle property image input sector




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




  const handleFormSubmit: SubmitHandler<SubmitPropertyType> = async (data) => {
    console.log('t5l form validée');

    data.additionalDetails = additionalDetails;

    if (NearestLocation.length === 1 && NearestLocation[0].placeName === "" && NearestLocation[0].distance === "") data.nearestPlaces = {};
    else {
      data.nearestPlaces = {};
      NearestLocation.forEach((item) => {
        if (item.placeName !== "" && item.distance !== "") data.nearestPlaces[item.placeName] = item.distance;
      });
    }

    data.imageGallery = { folderId: imgsFolderId.current, images: [] };

    if (imgs[0] === null) {
      setError("imageGallery.images", { message: "Thumbnail Image is required" });
      return;
    }
    else data.imageGallery.images = imgs.filter((img) => img !== null).map((img) => { return { key: img.key } });

    if (data.category !== ResidentialProperties) {
      delete data.filterFields.rooms
      delete data.filterFields.bathrooms
    }

    (data as any).imgsFolderId = imgsFolderId.current

    // if (data.listing_type.includes("rent")) delete (data as any).listing_period

    const response = await Http.post(apiGateway.property.create, data);

    response?.status === 201 && navigate("/dashboard/my-properties")
    response?.status !== 201 && Alert({ title: "Error", text: "Something went wrong, cannot create property", icon: "error" })
    console.log(data);

  };

  useEffect(() => {
    whatFor && setValue("listing_type", whatFor)
  }, [whatFor])

  console.log(errors);

  if (whatFor && !listing_typesValues.includes(whatFor)) return < Navigate to="/not-found" replace />;

  console.log("whatFor", whatFor);

  if (whatFor && !listing_typesValues.includes(whatFor)) console.log("nnon ???");


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
                      options={whatFor?.includes("commercial") ? commercialCategories : nonCommercialCategories}
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
                      size="col-lg-4 col-md-6"
                      title={capitalizePhrase(t(getText.submitProperty.propertyInformation.propertyPrice))}
                      placeholder="24345"
                      fieldRegister={register('filterFields.price')}
                      fieldError={errors.filterFields?.price}
                    />

                    {
                      whatFor?.includes("rent") && <SelectiveInputForm
                        size="col-lg-4 col-md-6 flex items-center mt-3"
                        title={capitalizePhrase(t(getText.submitProperty.propertyInformation.listing_period))}
                        options={Object.values(listing_period)}
                        fieldRegister={register('listing_period')}
                        fieldError={errors.listing_period}
                      />
                    }

                    <PropertyTextInput
                      size="col-lg-4 col-md-6"
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
                        additionalDetailsAttributes[propertyCategoryValue as keyof typeof additionalDetailsAttributes].map((item: string, index: number) =>
                          <CheckInput2
                            key={index}
                            title={item}
                            setAdditionalDetails={setAdditionalDetailsWrapper}
                            additionalDetails={additionalDetails}
                          />
                        )}

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




              <div className="row">
                <div className="col-12 d-flex justify-content-end mg-top-40">
                  <button type="submit" className="homec-btn homec-btn__second">
                    {isSubmitting ?
                      <span>{capitalizePhrase(t(getText.common.loading))}...</span>
                      : <span>{capitalizePhrase(t(getText.submitProperty.btns.submit))}</span>
                    }
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section >
  );
}

export default PropertyFrom;
