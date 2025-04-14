import SelectiveInput from "../Form/SelectiveInput2";
import RangeInput from "../Form/RangeInput2";
import imarates from "../../types/imarates";
import { useFormContext } from "../Property2/FilterProvider.context";
import { useSearchParams } from "react-router-dom";
import { listing_typesValues } from "@src/types/listing_types.types";
import { categoriesType } from "@src/types/categories.subcategories.types";
import { cities, delegations } from "@src/types/cities.delegations.types";

const SideBar22 = () => {

  const { filterObject, updateEstate } = useFormContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const field = e.target.name
    const newValue = e.target.value;
    console.log("newValue", newValue);

    if (newValue) searchParams.set(field, newValue); // update param
    else searchParams.delete(field, newValue)
    setSearchParams(searchParams, { replace: true });     // push to URL
  };
  return (
    <div className="col-lg-4 col-12 mg-top-30">
      <div className="property-sidebar">

        <SelectiveInput
          title="City"
          options={
            Object.keys(cities).map((city) => {
              return { id: city, name: city };
            })}
          classes="mg-top-20"
          value={filterObject.city}
          formkey="city"
        />


        <SelectiveInput
          title="Delegation mouch kemla"
          options={
            filterObject.city ? delegations[(filterObject.city)].map((imarate) => {
              return { id: imarate, name: imarate };
            }) : []
          }
          classes="mg-top-20"
          value={filterObject.city}
          formkey="city"
        />

        <SelectiveInput
          title="Property Category"
          options={
            Object.keys(categoriesType).map((estateType) => {
              return { id: estateType, name: estateType }
            })
          }
          classes="mg-top-20"
          value={filterObject.category}
          formkey="category"
        />

        <SelectiveInput
          title="Lisiting type"
          options={
            listing_typesValues.map((estateType) => {
              return { id: estateType, name: estateType }
            })
          }
          classes="mg-top-20"
          value={filterObject.listingType}
          formkey="listingType"
        />

        <RangeInput
          minRange={0}
          maxRange={10}
          minValue={filterObject.minNumberOfRooms}
          maxValue={filterObject.maxNumberOfRooms}
          minKey={"minNumberOfRooms"}
          maxKey={"maxNumberOfRooms"}
          title="Number Of Rooms"
          standard="rooms"
        />

        <RangeInput
          minRange={0}
          maxRange={5}
          minValue={filterObject.minNumberOfBathrooms}
          maxValue={filterObject.maxNumberOfBathrooms}
          minKey={"minNumberOfBathrooms"}
          maxKey={"maxNumberOfBathrooms"}
          title="Number Of Bathrooms"
          standard="bathrooms"
        />

        <RangeInput
          minRange={0}
          maxRange={2000}
          minValue={filterObject.minNumberOfSquareFeet}
          maxValue={filterObject.maxNumberOfSquareFeet}
          minKey={"minNumberOfSquareFeet"}
          maxKey={"maxNumberOfSquareFeet"}
          title="Square feet"
          standard="sq. ft."
        />

        <RangeInput
          minRange={0}
          maxRange={3000000}
          minValue={filterObject.minPrice}
          maxValue={filterObject.maxPrice}
          minKey={"minPrice"}
          maxKey={"maxPrice"}
          title="Price"
          text="Range: "
          symbol="$"
        />

        <div className="w-full flex flex-col justify-center items-center gap-2 pt-4">
          <button className="homec-btn" onClick={() => { updateEstate(); }}>
            Apply filter
          </button>
          {/* <div className="underline font-extralight hover:cursor-pointer " onClick={() => resetFilter()}>reset filter</div> */}
        </div>
      </div>
      {/* <AgentsSidebarSlider /> */}
    </div>
  );
}

export default SideBar22;
