import { useEffect, useState } from "react";
import PropertyTextInput from "./PropertyTextInput2";
import PropertyTextArea from "./PropertyTextArea2";
import ImageInput from "./ImageInput2";
import PropertyVideoInput from "./PropertyVideoInput";
import PropertyLocationInput from "./PropertyLocationInput";
import PropertyAminitiesInput from "./PropertyAminitiesInput";
import KeyValueInput from "./KeyValueInput2";
import PropertyPlan from "./PropertyPlan";
import PropertyTextAreaV2 from "./PropertyTextAreaV2";
import SwitcherBtn from "./SwitcherBtn";
import IaddProperty from "@src/models/addProperty.type";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckInput2 from "./CheckInput3";
import SelectiveInputForm from "./SelectiveInputForm";
import { categoriesType, ResidentialProperties, sub_categories } from "@src/types/categories.subcategories.types";
import { additionalDetailsAttributes } from "@src/types/additionalDetails.types";


const SubmitPropertySchema = z.object({
  title: z.string({ required_error: "Title is required" })
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(25, { message: "Title must be at most 25 characters long" }),

  category: z.string({ required_error: "Category is required" })
    .min(2, { message: "Type must be at least 2 characters long" })
    .max(25, { message: "Type must be at most 25 characters long" }),

  sub_category: z.string({ required_error: "Sub category is required" }),


  filterFields: z.object({

    price: z.string({ required_error: "Price is required" })
      .min(3, { message: "Price must be at least 100" })
      .max(5, { message: "Price must be at most 100000" })
      .regex(/^\d+$/, "Price must be a number")
      .transform(Number),

    area: z.string({ required_error: "Area is required" })
      .min(1, { message: "Area must be at least 0" })
      .max(5, { message: "Area must be at most 100000" })
      .regex(/^\d+$/, "Price must be a number")
      .transform(Number),

    rooms: z.string({ required_error: "Rooms is required" })
      .min(1, { message: "Rooms must be at least 0" })
      .max(2, { message: "Rooms must be at most 99" })
      .regex(/^\d+$/, "Price must be a number")
      .optional()
      .transform(Number),

    bathrooms: z.string({ required_error: "Bathrooms is required" })
      .min(1, { message: "Bathrooms must be at least 0" })
      .max(2, { message: "Bathrooms must be at most 99" })
      .regex(/^\d+$/, "Price must be a number")
      .optional()
      .transform(Number),

  }),

  description: z.string({ required_error: "Description is required" })
    .min(2, { message: "Description must be at least 2 characters long" })
    .max(200, { message: "Description must be at most 200 characters long" }),


  additionalDetails: z.array(z.string()).default([]),
  // imgs: z.array(z.string({ required_error: "Image is required" })),
  // videos: z.array(z.string({ required_error: "Video is required" })),
  // listing_type: z.string({ required_error: "Listing type is required" }),

  nearestPlaces: z.array(z.object({ placeName: z.string(), distance: z.string() })).default([{ placeName: "", distance: "" }]),

});

type SubmitPropertyType = z.infer<typeof SubmitPropertySchema>;


type imageArray = (File | null)[];

const PropertyFrom = ({ whatFor }: { whatFor: string }) => {

  const { register, watch, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<SubmitPropertyType>({ resolver: zodResolver(SubmitPropertySchema) });


  const propertyCategoryValue = watch('category');


  const [NearestLocation, setNearestLocation] = useState<{ placeName: string, distance: string }[]>([{ placeName: "", distance: "" }]);
  const [additionalDetails, setAdditionalDetails] = useState<string[]>([])

  const initialImgArray: imageArray = [null, null, null];
  const [imgs, setImgs] = useState<imageArray>(initialImgArray);

  const setAdditionalDetailsWrapper = (event: any) => {
    event.target.checked ? setAdditionalDetails((prev) => [...prev, event.target.name]) : setAdditionalDetails((prev) => prev.filter((item) => item !== event.target.name));

  };


  const [property, setProperty] = useState<IaddProperty>({
    city: "",
    filterFields: {
      area: 0,
      forRent: whatFor === "forRent",
      forSale: whatFor === "forSale",
      price: 0,
      rooms: 0,
      bathrooms: 0,

    },
    productTier: "",
    title: "",
    type: "",
    description: "",

    imgs: [
      "https://placehold.co/165x205",
      "https://placehold.co/165x205",
      "https://placehold.co/165x205",
    ],
    videos: [],
    // location: { city: "", address: "", addressDetails: "", googleMap: "" }, mouch t3ml hakka 5ir ?

    nearestPlaces: {},

    additionalDetails: {},


  });

  // handle property information

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  // handle editable textarea
  const handleTextArea = (e: any) => {
    setProperty({ ...property, [e.name]: e.value });
  };

  // delete property image

  const handleImageDelete = (id: any) => {
    // setProperty({
    //   ...property,
    //   propertyImage: property.propertyImage.filter((image) => image.id !== id),
    // });
  };

  // handle property video input sector


  // const handleVideoChange = (e: any) => {
  //   setProperty({
  //     ...property,
  //     video: { ...property.video, [e.target.name]: e.target.value },
  //   });
  // };

  // handle property location input sector

  // const handleLocationChange = (e: any) => {
  //   setProperty({
  //     ...property,
  //     location: { ...property.location, [e.target.name]: e.target.value },
  //   });
  // };

  // // handle property image input sector

  const handleImageInput = (img: any) => {
    //   const updatedImg = [...property.propertyImage];
    //   updatedImg.push({
    //     id: updatedImg.reduce((total, current) => total > current.id, 0) + 1,
    //     img,
    //   });
  };

  // handle aminities

  // const handleCheckBox = (e: any) => {
  //   setProperty({
  //     ...property,
  //     aminities: { ...property.aminities, [e.target.name]: e.target.checked },
  //   });
  // };
  // handle Property Plan, additionalInformation, nearestLocation add new item or delete item

  const handleAddOrDelete = (type: string, idx: number,) => {
    if (type === "add") {

      if (NearestLocation[NearestLocation.length - 1].placeName !== "" && NearestLocation[NearestLocation.length - 1].distance !== "")
        setNearestLocation([...NearestLocation, { placeName: "", distance: "" }]);
    }
    else
      setNearestLocation(NearestLocation.filter((_, index) => index !== idx));


  }


  useEffect(() => {
    console.log(NearestLocation);

  }, [NearestLocation.length])
  // handle Property Plan, additionalInformation, nearestLocation input filled
  const handleKeyValueChange = (idx: any, keyType: "placeName" | "distance", value: string) => {

    setNearestLocation(NearestLocation.map((item, index) => index === idx ? { ...item, [keyType]: value } : item));

  };

  useEffect(() => {
    console.log(errors);

  }, [errors]);


  const handleFormSubmit: SubmitHandler<SubmitPropertyType> = (data) => {
    console.log('t5l form validée');

    data.additionalDetails = additionalDetails;

    if (NearestLocation.length === 1 && NearestLocation[0].placeName === "" && NearestLocation[0].distance === "") data.nearestPlaces = [];
    else data.nearestPlaces = NearestLocation;

    console.log(data);

  };


  return (
    <section className="pd-top-80 pd-btm-80">
      <div className="container">
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
                uploadedImg={imgs}
                handleDelete={handleImageDelete}
                handleImage={handleImageInput}
              />
              {/* <PropertyVideoInput
                handleVideoInput={handleVideoChange}
                video={input.video}
              />
              <PropertyLocationInput
                location={input.location}
                handleLocation={handleLocationChange}
              /> */}
              <div className="row">
                <div className="col-12 d-flex justify-content-end mg-top-40">
                  <button onClickCapture={() => { console.log('t5ll') }} type="submit" className="homec-btn homec-btn__second">
                    <span>Submit Property Now</span>
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
