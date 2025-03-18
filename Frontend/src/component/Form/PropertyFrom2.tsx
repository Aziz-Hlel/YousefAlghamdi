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

const PropertyFrom = ({ whatFor }: { whatFor: string }) => {
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

  // const handleAddOrDelete = (type: string, id: any, keyType: string | number) => {
  //   if (type === "add") {
  //     const newId =
  //       property[keyType].reduce(
  //         (max, current) => (max < current.id ? current.id : max),
  //         0
  //       ) + 1;
  //     setProperty({
  //       ...property,
  //       [keyType]: [{ id: newId, key: "", value: "" }, ...property[keyType]],
  //     });
  //   } else {
  //     setProperty({
  //       ...property,
  //       [keyType]: property[keyType].filter((item) => item.id != id),
  //     });
  //   }
  // };
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
                      name="title"
                      value={property.title}
                      handleChange={handleTextChange}
                      placeholder="Title" size={undefined} type={undefined} margin={undefined} />
                    {/* <PropertyTextInput
                      title="Slug*"
                      name="slug"
                      value={property.slug}
                      handleChange={handleTextChange}
                      placeholder="Here is dmeo text"
                    /> */}
                    <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title="Property Type*"
                      name="type"
                      value={property.type}
                      handleChange={handleTextChange}
                      placeholder="Apartment"
                    />
                    {/* <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title="Purpose*"
                      name="purpose"
                      value={property.purpose}
                      handleChange={handleTextChange}
                      placeholder="For Rent"
                    /> */}
                    {/* <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title="Rent Period*"
                      name="rentPeriod"
                      value={property.rentPeriod}
                      handleChange={handleTextChange}
                      placeholder="Monthly"
                    /> */}
                    <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title="Property Price"
                      name="filterFields.price"
                      value={property.filterFields.price}
                      handleChange={handleTextChange}
                      placeholder="24345"
                    />
                    <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title="Total Area (sq:Ft)*"
                      name="filterFields.area"
                      value={property.filterFields.area}
                      handleChange={handleTextChange}
                      placeholder="Here is demo text"
                    />
                    {/* <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title="Total Unit*"
                      name="unit"
                      value={property.unit}
                      handleChange={handleTextChange}
                      placeholder="1"
                      type="number"
                    /> */}
                    <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title="Total Bedroom*"
                      name="bedroom"
                      value={0}
                      handleChange={handleTextChange}
                      placeholder="2"
                      type="number"
                    />
                    {property.filterFields.bathrooms && <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title="Total Bathroom*"
                      name="filterFields.bathrooms"
                      value={property.filterFields.bathrooms}
                      handleChange={handleTextChange}
                      placeholder="2"
                      type="number"
                    />}
                    {/* <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title="Total Garage*"
                      name="garage"
                      value={property.garage}
                      handleChange={handleTextChange}
                      placeholder="1"
                      type="number"
                    /> */}
                    {/* <PropertyTextInput
                      size="col-lg-6 col-md-6"
                      title="Total Kitchen*"
                      name="kitchen"
                      value={property.kitchen}
                      handleChange={handleTextChange}
                      placeholder="1"
                      type="number"
                    /> */}
                  </div>
                  {/* Single Form Element  */}
                  <PropertyTextArea
                    title="Description*"
                    name="description"
                    // value={input.description}
                    handleChange={handleTextArea}
                  // placeholder="Description"
                  />
                </div>
              </div>
              {/* <ImageInput
                uploadedImg={property.imgs}
                handleDelete={handleImageDelete}
                handleImage={handleImageInput}
              /> */}
              {/* <PropertyVideoInput
                handleVideoInput={handleVideoChange}
                video={property.videos}
              /> */}
              {/* <PropertyLocationInput
                location={property.location}
                handleLocation={handleLocationChange}
              /> */}
              {/* <PropertyAminitiesInput
                aminities={property.additionalDetails}
                handleChange={handleCheckBox}
              /> */}

              {/* <KeyValueInput
                info={property.nearestLocation}
                handleAddOrDelete={handleAddOrDelete}
                handleChange={handleKeyValueChange}
                title="Nearest Location"
                filedTitle="Nearest Location*"
                filedTitleTwo="Distance(KM)*"
                placeholderOne=""
                placeholderTwo="10km"
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
                ]}
                keyType="nearestLocation"
              /> */}

              {/* <KeyValueInput
                info={property.additionalInformation}
                handleAddOrDelete={handleAddOrDelete}
                handleChange={handleKeyValueChange}
                title="Additional Information"
                filedTitle="Key*"
                filedTitleTwo="Value*"
                placeholderTwo="Type Here"
                placeholderOne="Type Here"
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
                ]}
                keyType="additionalInformation"
              /> */}

              {/* <PropertyPlan
                info={property.propertyPlan}
                handleChange={handleKeyValueChange}
                handleAddOrDelete={handleAddOrDelete}
              /> */}

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
