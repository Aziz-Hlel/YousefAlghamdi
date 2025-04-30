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
import Iproperty from "@src/models/property.type";
import statesTypes from "@src/types/states.types";
import { pickRandomPhoto } from "@src/pickRandomPhoto";
import useRandomPhoto from "@src/useRandomPhoto";
import { useAuth } from "@src/providers/AuthProvider.context";
import roles from "@src/types/roles.type";
import { AxiosResponse } from "axios";
import Swal from 'sweetalert2'
import { createAlertAsync } from "@src/utils/createAlert";


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

  const { user } = useAuth()
  const { property } = useSinglePropertyContext();
  if (!property) return

  const propertyState = property?.advanced.state

  const [InspectedProperty, setInspectedProperty] = useState<Iproperty | undefined>();

  const { register, watch, handleSubmit, setValue, reset, formState: { errors, isSubmitting, }, setError } =
    useForm<SubmitPropertyType>({
      resolver: zodResolver(SubmitPropertySchema),
    });

  console.log('prrr', property);
  useEffect(() => {

    if (!property) return
    //walli na77i linspected property w3tih direct ml property
    if ([statesTypes.active, statesTypes.toBeAdded, statesTypes.toBeDeleted].includes(property.advanced.state))
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
    console.log("inspected porp = === ", InspectedProperty);

    reset({
      _id: InspectedProperty._id,

      title: InspectedProperty.title,
      description: InspectedProperty.description,

      category: InspectedProperty.category,
      sub_category: InspectedProperty.sub_category,

      city: InspectedProperty.city,
      delegation: InspectedProperty.delegation,
      addresse: InspectedProperty.addresse,

      listing_type: InspectedProperty.listing_type,

      filterFields: {
        price: String(InspectedProperty.filterFields.price),
        area: String(InspectedProperty.filterFields.area),
        rooms: InspectedProperty.filterFields.rooms ?? undefined,
        bathrooms: InspectedProperty.filterFields.bathrooms ?? undefined,
      },

      additionalDetails: InspectedProperty.additionalDetails,
    })
    setAdditionalDetails(InspectedProperty.additionalDetails)

    setNearestLocation(() =>
      Object.entries(InspectedProperty.nearestPlaces).map(([placeName, distance]) => ({
        placeName,
        distance,
      }))
    );


    InspectedProperty.imgs.map((img, index) => urlToFileWithPath(img, "aaa", index))

    console.log('InspectedProperty', InspectedProperty);

  }, [InspectedProperty]);

  const navigate = useNavigate();
  const propertyCategoryValue = watch('category');
  const CityValueObserver = watch('city');
  console.log("category:::::", propertyCategoryValue);

  const [NearestLocation, setNearestLocation] = useState<{ placeName: string, distance: string }[]>([{ placeName: "", distance: "" }]);
  const [additionalDetails, setAdditionalDetails] = useState<string[]>([])

  const initialImgArray: imageArray = [null, null, null, null];
  const [imgs, setImgs] = useState<imageArray>(initialImgArray);

  const setAdditionalDetailsWrapper = (event: any) => {
    event.target.checked ? setAdditionalDetails((prev) => [...prev, event.target.name]) : setAdditionalDetails((prev) => prev.filter((item) => item !== event.target.name));

  };
  // const customErrors: Record<"imgs", string> = {
  //   imgs: "Image is required",
  // }


  const handleImageDelete = (idx: number) => {
    setImgs((prev) => prev.map((_, index) => index === idx ? null : _));
  };

  useEffect(() => {
    setValue("additionalDetails", [])
  }, [propertyCategoryValue])

  // handle property image input sector

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



  const randomPhoto = useRandomPhoto()
  async function urlToFileWithPath(url: string, filename: string, index: number) {
    console.log("url", url);

    const response = await fetch(apiGateway.images + randomPhoto);
    const blob = await response.blob();

    const file: FileWithPath = new File([blob], blob.name, {
      type: blob.type,
    });

    const file2: (FileWithPath & { preview: string; key: string }) = Object.assign(file, { preview: URL.createObjectURL(file), key: "" });
    // Optional: add a fake path if needed by your uploader
    // (file as FileWithPath).path = filename;

    setImgs((prev) => {
      const newArray = [...prev];
      newArray[index] = file2;
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
        setError("imgs", { message: "Thumbnail Image is required" });
        return;
      }
      else data.imgs = imgs.filter((img) => img !== null).map((img) => img.key);

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

    if (!InspectedProperty) return

    console.log('t5l form validée????????');

    const refinedData: any = data;
    refinedData.clientId = InspectedProperty.clientId;
    refinedData.agentId = InspectedProperty.agentId;
    console.log('refinedData', refinedData);

    if (property.advanced.state === statesTypes.toBeAdded) {

      updateAdditionalDetails(refinedData)
      updateNearestLocation(refinedData)
      updateImages(refinedData)
      checkProperVariables(refinedData)
      removeId(refinedData)
      const response = await Http.put(apiGateway.property.approve, refinedData);
      if (response?.status === 200) navigate("./../../")
      else console.log(response);

    }

    if (property.advanced.state === statesTypes.active || property.advanced.state === statesTypes.toBeUpdated) {
      updateAdditionalDetails(refinedData)
      updateNearestLocation(refinedData)
      updateImages(refinedData)
      checkProperVariables(refinedData)
      removeId(refinedData)

      let response: AxiosResponse<any, any> | undefined
      if (user?.role === roles.AGENT) {
        response = await Http.put(`${apiGateway.property.approve}/${property._id}`, refinedData);
        if (response?.status === 200) navigate("./../../")
        else {
          console.log(response);
          alert("something went wrong")
        }
      }
      // meaning user
      else {
        response = await Http.patch(`${apiGateway.property.update}/${property._id}`, refinedData);
        if (response?.status === 200) navigate("./../../")
        else {
          console.log(response);
          alert("something went wrong")
        }
      }

      // const response = await Http.patch(url, refinedData);
      if (response?.status === 200) navigate("./../../")
      else console.log(response);

    }


    return

    updateAdditionalDetails(data)

    updateNearestLocation(data)

    updateImages(data)

    // if (imgs[2] === null) {
    //   setError("imgs", { message: "rest Image is required" });
    //   return;
    // }
    await Http.post(apiGateway.property.create, data);
    console.log(data);

  };


  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate("./../../")
  }

  const createAlert = async (title: string, text: string,) => {
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
        const result = await createAlertAsync({ title: "Decline request", text: "Are you sure you want to decline this property and delete it?", icon: "warning" })
        if (result.isConfirmed) {
          const response = await Http.delete(`${apiGateway.property.delete}/${property._id}`);
          if (response?.status === 200) navigate("./../../")
          else alert("something went wrong");
        }
        break;

      case statesTypes.toBeUpdated:
        const result2 = await createAlertAsync({ title: "Decline request", text: "Are you sure you want to decline the update?", icon: "warning" })
        if (result2.isConfirmed) {
          const response = await Http.get(`${apiGateway.property.decline}/${property._id}`);
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
                  Property Information {property?.clientId}
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
                <div className="col-12 d-flex justify-content-end mg-top-40 gap-2">
                  <button className="homec-btn  bg-red-500">
                    <span onClick={handleCancel}>{isSubmitting ? "Loading..." : "Cancel"}</span>
                  </button>
                  {statesTypes.active !== property.advanced.state && < button onClick={handleDecline} value={propertyState} className="homec-btn ">
                    <span  >{isSubmitting ? "Loading..." : "Decline request"}</span>
                  </button>}
                  <button type="submit" className="homec-btn homec-btn__second ">
                    {propertyState === statesTypes.active && <span>{isSubmitting ? "Loading..." : "Update Property"}</span>}
                    {propertyState === statesTypes.toBeAdded && <span>{isSubmitting ? "Loading..." : "Add Property"}</span>}
                    {propertyState === statesTypes.toBeUpdated && <span>{isSubmitting ? "Loading..." : "Update Property"}</span>}
                    {propertyState === statesTypes.toBeDeleted && <span>{isSubmitting ? "Loading..." : "Delete Property"}</span>}
                    {propertyState === statesTypes.unavailable && <span>{isSubmitting ? "Loading..." : "Make Property unavailable"}</span>}

                  </button>
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
