import { useState } from "react";
import PropertyTextInput from "./PropertyTextInput2";
import PropertyTextArea from "./PropertyTextArea2";
import ImageInput from "./ImageInput";
import PropertyVideoInput from "./PropertyVideoInput";
import PropertyLocationInput from "./PropertyLocationInput";
import PropertyAminitiesInput from "./PropertyAminitiesInput";
import KeyValueInput from "./KeyValueInput2";
import PropertyPlan from "./PropertyPlan";
import PropertyTextAreaV2 from "./PropertyTextAreaV2";
import SwitcherBtn from "./SwitcherBtn";
import IaddProperty from "@src/models/addProperty.type";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckInput2 from "./CheckInput3";
import SelectiveInputForm from "./SelectiveInputForm";
import { categoriesType, ResidentialProperties, sub_categories } from "@src/types/categories.subcategories.types";
import { additionalDetailsAttributes } from "@src/types/additionalDetails.types";


const SubmitPropertySchema = z.object({
  title: z.string({ required_error: "Title is required" })
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(25, { message: "Title must be at most 25 characters long" }),

  category: z.string({ required_error: "Type is required" })
    .min(2, { message: "Type must be at least 2 characters long" })
    .max(25, { message: "Type must be at most 25 characters long" }),

  sub_category: z.string({ required_error: "Sub category is required" }),


  filterFields: z.object({
    price: z.number({ required_error: "Price is required" }),
    area: z.number({ required_error: "Area is required" }),
    rooms: z.number({ required_error: "Rooms is required" }),
    bathrooms: z.number({ required_error: "Bathrooms is required" }),
  }),

  description: z.string({ required_error: "Description is required" })
    .min(2, { message: "Description must be at least 2 characters long" })
    .max(200, { message: "Description must be at most 200 characters long" }),

  // imgs: z.array(z.string({ required_error: "Image is required" })),
  // videos: z.array(z.string({ required_error: "Video is required" })),
  listing_type: z.string({ required_error: "Listing type is required" }),

  additionalDetails: z.array(z.string()),
  nearestPlaces: z.record(z.string()),



});

type SubmitPropertyType = z.infer<typeof SubmitPropertySchema>;


const PropertyFrom = ({ whatFor }: { whatFor: string }) => {

  const { register, watch, handleSubmit: handleSubmit2, formState: { errors, isSubmitting }, setError } = useForm<SubmitPropertyType>({ resolver: zodResolver(SubmitPropertySchema) });


  const propertyCategoryValue = watch('category');

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

  // const handleImageDelete = (id: any) => {
  //   setProperty({
  //     ...property,
  //     propertyImage: property.propertyImage.filter((image) => image.id !== id),
  //   });
  // };

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

  // const handleImageInput = (img: any) => {
  //   const updatedImg = [...property.propertyImage];
  //   updatedImg.push({
  //     id: updatedImg.reduce((total, current) => total > current.id, 0) + 1,
  //     img,
  //   });
  // };

  // handle aminities

  // const handleCheckBox = (e: any) => {
  //   setProperty({
  //     ...property,
  //     aminities: { ...property.aminities, [e.target.name]: e.target.checked },
  //   });
  // };
  // handle Property Plan, additionalInformation, nearestLocation add new item or delete item

  const handleAddOrDelete = (type: string, id: any, keyType: string | number) => {
    if (type === "add") {
      const newId =
        property[keyType].reduce(
          (max, current) => (max < current.id ? current.id : max),
          0
        ) + 1;
      setProperty({
        ...property,
        [keyType]: [{ id: newId, key: "", value: "" }, ...property[keyType]],
      });
    } else {
      setProperty({
        ...property,
        [keyType]: property[keyType].filter((item) => item.id != id),
      });
    }
  };
  // handle Property Plan, additionalInformation, nearestLocation input filled
  // const handleKeyValueChange = ({ id, keyType, inputType, value }: any) => {
  //   setProperty({
  //     ...property,
  //     [keyType]: property[keyType].map((item) =>
  //       item.id === id ? { ...item, [inputType]: value } : item
  //     ),
  //   });
  // };
  //handle SEO Sector input
  // const handleSEO = (e, value) => {
  //   if (typeof value === "undefined") {
  //     setProperty({
  //       ...property,
  //       seoInfo: { ...property.seoInfo, [e.target.name]: e.target.value },
  //     });
  //   } else {
  //     setProperty({
  //       ...property,
  //       seoInfo: { ...property.seoInfo, [e]: value },
  //     });
  //   }
  // };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(property);
  };

  return (
    <section className="pd-top-80 pd-btm-80">
      <div className="container">
        <div className="row">
          <div className="col-12">

            <form action="#" onSubmit={(e) => handleSubmit(e)}>


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
                      fieldError={errors.category}
                    />

                    <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title="Property Price"
                      placeholder="24345"
                      fieldRegister={register('filterFields.price')}
                      fieldError={errors.filterFields?.price}
                      type="number"
                    />

                    <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title="Total Area (sq:Mt)*"
                      fieldRegister={register('filterFields.area')}
                      fieldError={errors.filterFields?.area}
                      placeholder="1200"
                      type="number"
                    />


                    {propertyCategoryValue === ResidentialProperties && <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title="Total Rooms*"
                      fieldRegister={register('filterFields.rooms')}
                      fieldError={errors.filterFields?.rooms}
                      placeholder="2"
                      type="number"

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
                            properties={additionalDetailsAttributes[propertyCategoryValue as keyof typeof additionalDetailsAttributes]}
                            fieldRegister={register("additionalDetails")}
                          />
                        ))}

                    </div>

                  </div>
                </div>
              </div>



              <div className="homec-submit-form mg-top-40">
                <h4 className="homec-submit-form__title">Nearest Location</h4>
                <KeyValueInput
                  info={[
                    { id: 1, key: "", value: "" },
                    { id: 2, key: "", value: "" },
                    { id: 3, key: "", value: "" },
                  ]}
                  handleAddOrDelete={handleAddOrDelete}
                  handleChange={handleKeyValueChange}
                  title="Nearest Location"
                  filedTitle="Nearest Location*"
                  filedTitleTwo="Distance(KM)*"
                  options={[
                    {
                      id: 1,
                      name: "Dhaka",
                    },
                    {
                      id: 2,
                      name: "Chittagong",
                    },
                    {
                      id: 2,
                      name: "Khulna",
                    },
                  ]} placeholderOne={""} placeholderTwo={""} keyType="nearestLocation"
                />

              </div>

              <div className="homec-submit-form mg-top-40">
                <h4 className="homec-submit-form__title">
                  SEO Information and Others
                </h4>
                <div className="homec-submit-form__inner">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      {/* Single Form Element   */}
                      {/* <PropertyTextInput
                        title="SEO Title*"
                        placeholder="Type Here"
                        name="title"
                        value={property.seoInfo.title}
                        handleChange={handleSEO}
                      /> */}
                      {/* Single Form Element   */}
                      {/* <PropertyTextAreaV2
                        title="SEO Description"
                        value={property.seoInfo.desc}
                        handleChange={handleSEO}
                        name="desc"
                        placeHolder="Type Here"
                        sizeFull={true}
                      /> */}
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="homeco-switcher-group mg-top-20">
                        <div className="homeco-switcher-group__single">
                          {/* Single Switcher  */}
                          {/* <SwitcherBtn
                            title="Status"
                            name="status"
                            isChecked={property.seoInfo.status}
                            handleChange={handleSEO}
                          /> */}
                          {/* <SwitcherBtn
                            title="Urgent Property"
                            isChecked={property.seoInfo.urgentProperty}
                            name="urgentProperty"
                            handleChange={handleSEO}
                          /> */}

                          {/* End Single Switcher  */}
                        </div>
                        <div className="homeco-switcher-group__single">
                          {/* <SwitcherBtn
                            title="Featured"
                            name="featured"
                            isChecked={property.seoInfo.featured}
                            handleChange={handleSEO}
                          /> */}
                          {/* <SwitcherBtn
                            title="Top Property"
                            name="topProperty"
                            isChecked={property.seoInfo.topProperty}
                            handleChange={handleSEO}
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="row">
                <div className="col-12 d-flex justify-content-end mg-top-40">
                  <button type="submit" className="homec-btn homec-btn__second">
                    <span>Submit Property Now</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PropertyFrom;
