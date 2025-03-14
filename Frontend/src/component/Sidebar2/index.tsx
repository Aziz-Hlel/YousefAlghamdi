import SelectiveInput from "../Form/SelectiveInput2";
import CheckInput from "../Form/CheckInput2";
import RangeInput from "../Form/RangeInput2";
import AgentsSidebarSlider from "../Agents/AgentsSidebarSlider";
import imarates from "../../imarates";
import estateTypes from "../../estateType";
import { useFormContext } from "../Property2/FilterProvider.context";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SideBar22 = () => {

  const { filterObject, updateEstate, updateField } = useFormContext();
  const [aa, setAa] = useState(false)

  useEffect(() => {
console.log("t5l ????????????");
  }, [aa])

  return (
    <div className="col-lg-4 col-12 mg-top-30">
      <div className="property-sidebar">

        <SelectiveInput
          title="City"
          options={
            imarates.map((imarate) => {
              return { id: imarate, name: imarate }
            })}
          classes="mg-top-20"
          value={filterObject.city}
          formkey="city"
        />

        <SelectiveInput
          title="Property Category"
          options={
            estateTypes.map((estateType) => {
              return { id: estateType, name: estateType }
            })
          }
          classes="mg-top-20"
          value={filterObject.type}
          formkey="type"
        />

        <CheckInput
          title="For rent/sale"
          properties={[
            { key: "forRent", value: filterObject.forRent, name: "For rent" },
            { key: "forSale", value: filterObject.forSale, name: "For sale" },
          ]}
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
          <button className="homec-btn" onClick={() => {
            updateEstate();
            setAa(!aa)
          }}>Apply filter</button>
          {/* <div className="underline font-extralight hover:cursor-pointer " onClick={() => resetFilter()}>reset filter</div> */}
        </div>
      </div>
      <AgentsSidebarSlider />
    </div>
  );
}

export default SideBar22;
