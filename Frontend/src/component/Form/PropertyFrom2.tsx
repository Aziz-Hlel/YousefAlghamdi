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
import { categoriesType, ResidentialProperties, sub_categories } from "@src/types/categories.subcategories.types";
import { additionalDetailsAttributes } from "@src/types/additionalDetails.types";
import { FileWithPath } from "react-dropzone";
import { useNavigate, useParams } from "react-router-dom";
import { listing_typesValues } from "@src/types/listing_types.types";
import { cities, delegations } from "@src/types/cities.delegations.types";
import { uploadImageToS3_SIMULATOR } from "@src/utils/getSignedUrlUpload";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { useSinglePropertyContext } from "@src/providers/SingleProperty.context";


export const SubmitPropertySchema = z.object({

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

    price: z.string({ required_error: "Price is required" })
      .min(3, { message: "Price must be at least 100" })
      .max(7, { message: "Price must be at most 10000000" })
      .regex(/^\d+$/, "Price must be a number"),

    area: z.string({ required_error: "Area is required" })
      .min(1, { message: "Area must be at least 0" })
      .max(5, { message: "Area must be at most 100000" })
      .regex(/^\d+$/, "Price must be a number"),

    rooms: z.string({ required_error: "Rooms is required" })
      .min(1, { message: "Rooms must be at least 0" })
      .max(2, { message: "Rooms must be at most 99" })
      .regex(/^\d+$/, "Price must be a number")
      .optional(),

    bathrooms: z.string({ required_error: "Bathrooms is required" })
      .min(1, { message: "Bathrooms must be at least 0" })
      .max(2, { message: "Bathrooms must be at most 99" })
      .regex(/^\d+$/, "Price must be a number")
      .optional(),
  }),



  additionalDetails: z.array(z.string()).default([]),
  imgs: z.array(z.string({ required_error: "Image is required" })).optional(),
  listing_type: z.string({ required_error: "Listing type is required" }),
  productTier: z.string({ required_error: "Product tier is required" }).default("free"),
  nearestPlaces: z.record(z.string(), z.string()).default({}),

});

export type SubmitPropertyType = z.infer<typeof SubmitPropertySchema>;


type imageArray = (FileWithPath & { preview: string; key: string; } | null)[];

const PropertyFrom = () => {


  const { whatFor, } = useParams();

  const { register, watch, handleSubmit, setValue, formState: { errors, isSubmitting, }, setError } =
    useForm<SubmitPropertyType>({
      resolver: zodResolver(SubmitPropertySchema),

    });



  const navigate = useNavigate();
  const propertyCategoryValue = watch('category');
  const CityValueObserver = watch('city');

  const [NearestLocation, setNearestLocation] = useState<{ placeName: string, distance: string }[]>([{ placeName: "", distance: "" }]);
  const [additionalDetails, setAdditionalDetails] = useState<string[]>([])

  const initialImgArray: imageArray = [null, null, null, null];
  const [imgs, setImgs] = useState<imageArray>(initialImgArray);

  const setAdditionalDetailsWrapper = (event: any) => {
    event.target.checked ? setAdditionalDetails((prev) => [...prev, event.target.name]) : setAdditionalDetails((prev) => prev.filter((item) => item !== event.target.name));

  };


  useEffect(() => {
    setValue("additionalDetails", [])
  }, [propertyCategoryValue])
  // const customErrors: Record<"imgs", string> = {
  //   imgs: "Image is required",
  // }


  const handleImageDelete = (idx: number) => {
    setImgs((prev) => prev.map((_, index) => index === idx ? null : _));
  };



  // // handle property image input sector

  const handleImageInput = async (uploadedImg: FileWithPath, idx: number) => {
    const key = await uploadImageToS3_SIMULATOR(uploadedImg, "property");
    const imgWithPreview = Object.assign(uploadedImg, {
      preview: URL.createObjectURL(uploadedImg),
      key: key
    });

    console.log("imgWithPreview", imgWithPreview);

    setImgs((prev) => {
      const newArray = [...prev];
      newArray[idx] = imgWithPreview;
      return newArray;
    });

  };

  console.log("reee: nik rabk", errors);

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

    if (imgs[0] === null) {
      setError("imgs", { message: "Thumbnail Image is required" });
      return;
    }
    else data.imgs = imgs.filter((img) => img !== null).map((img) => img.key);

    if (data.category !== ResidentialProperties) {
      delete data.filterFields.rooms
      delete data.filterFields.bathrooms
    }
    // if (imgs[2] === null) {
    //   setError("imgs", { message: "rest Image is required" });
    //   return;
    // }
    await Http.post(apiGateway.property.create, data);
    console.log(data);

  };
  useEffect(() => {
    whatFor && setValue("listing_type", whatFor)
  }, [whatFor])

  if (whatFor && !listing_typesValues.includes(whatFor)) return <> </>

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
                  Property Information
                </h4>
                <div className="homec-submit-form__inner">
                  <div className="row">

                    <PropertyTextInput

                      title="Property Title*"
                      placeholder="Title"
                      fieldRegister={register('title')}
                      fieldError={errors.title}

                    />

                    <SelectiveInputForm
                      size="col-lg-6 col-md-6"
                      title={"Category"}
                      options={Object.keys(categoriesType)}
                      fieldRegister={register('category')}
                      fieldError={errors.category}
                    />

                    <SelectiveInputForm
                      size="col-lg-6 col-md-6"
                      title={"Sub Category"}
                      options={propertyCategoryValue && Object.keys(categoriesType).includes(propertyCategoryValue) ? sub_categories[propertyCategoryValue as keyof typeof sub_categories] : []}
                      fieldRegister={register('sub_category')}
                      fieldError={errors.sub_category}
                    />

                    <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title="Property Price"
                      placeholder="24345"
                      fieldRegister={register('filterFields.price')}
                      fieldError={errors.filterFields?.price}
                    />

                    <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title="Total Area (sq:Mt)*"
                      fieldRegister={register('filterFields.area')}
                      fieldError={errors.filterFields?.area}
                      placeholder="1200"
                    />

                    {propertyCategoryValue === ResidentialProperties && <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title="Total Rooms*"
                      fieldRegister={register('filterFields.rooms')}
                      fieldError={errors.filterFields?.rooms}
                      placeholder="2"
                    />}

                    {propertyCategoryValue === ResidentialProperties && <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title="Total Bathroom*"
                      fieldRegister={register('filterFields.bathrooms')}
                      fieldError={errors.filterFields?.bathrooms}
                      placeholder="2"
                    />}

                    <PropertyTextArea
                      title="Description*"
                      fieldRegister={register('description')}
                      fieldError={errors.description}
                    />

                  </div>

                </div>
              </div>

              <div className="homec-submit-form mg-top-40">
                <h4 className="homec-submit-form__title">Property Location</h4>
                <div className="homec-submit-form__inner">
                  <div className="row ">
                    {/* Single Form Element   */}
                    <SelectiveInputForm
                      size="col-md-4 flex justify-center items-center mg-top-20"
                      title={"City"}
                      options={Object.keys(cities)}
                      fieldRegister={register('city')}
                      fieldError={errors.city}
                    />

                    <SelectiveInputForm
                      size="col-md-4 flex justify-center items-center mg-top-20"
                      title={"Delegation"}
                      options={CityValueObserver && Object.keys(cities).includes(CityValueObserver) ? delegations[CityValueObserver as keyof typeof delegations] : []}
                      fieldRegister={register('delegation')}
                      fieldError={errors.delegation}
                    />

                    <PropertyTextInput
                      size="col-md-4  flex justify-center items-center -mt-10"
                      title="Street adresse"
                      fieldRegister={register('addresse')}
                      fieldError={errors.addresse}
                      placeholder="Emirates Towers, Sheikh Zayed Road"
                    />


                  </div>
                </div>
              </div>

              <div className="homec-submit-form mg-top-40">
                <h4 className="homec-submit-form__title">
                  Additional Details
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
                <h4 className="homec-submit-form__title">Nearest Location</h4>

                <KeyValueInput
                  list={NearestLocation}
                  handleAddOrDelete={handleAddOrDelete}
                  handleChange={handleKeyValueChange}
                  filedTitle="Nearest Location*"
                  filedTitleTwo="Distance(KM)*"

                  placeholderOne={"Burj khalifa"}
                  placeholderTwo={"15"}
                />

              </div>

              <ImageInput
                imgs={imgs}
                handleDelete={handleImageDelete}
                handleImage={handleImageInput}
                fieldError={errors.imgs}

              />

              {/* <PropertyLocationInput
                location={input.location}
                handleLocation={handleLocationChange}
              /> */}






              <div className="row">
                <div className="col-12 d-flex justify-content-end mg-top-40">
                  <button type="submit" className="homec-btn homec-btn__second">
                    {isSubmitting ? <span>Loading...</span> : <span>Submit Property Now</span>}
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
