import SelectiveInput from "../Form/SelectiveInput";
import CheckInput from "../Form/CheckInput";
import RangeInput from "../Form/RangeInput";
import AgentsSidebarSlider from "../Agents/AgentsSidebarSlider";
import imarates from "../../imarates";
import estateTypes from "../../estateType";
import TitleBtn from "../Button/TitleBtn";

function index() {
  return (
    <div className="col-lg-4 col-12 mg-top-30">
      <div className="property-sidebar">

        <SelectiveInput
          title="City"
          options={
            imarates.map((imarate, idx) => {
              return { id: idx, name: imarate }
            })}
          classes="mg-top-20"
        />
        <SelectiveInput
          title="Property Category"
          options={
            estateTypes.map((estateType, idx) => {
              return { id: idx, name: estateType }
            })
          }
          classes="mg-top-20"
        />
        <CheckInput
          title="For rent/sale"
          properties={[
            "For rent",
            "For sale",
          ]}
          name="rent_sale"
        />
        <RangeInput
          minRange={0}
          maxRange={10}
          defaultMinRange={1}
          defaultMaxRange={10}
          title="Number Of Rooms"
          standard="rooms"
          symbol={null}
          text={null}
        />
        <RangeInput
          minRange={0}
          maxRange={5}
          defaultMinRange={1}
          defaultMaxRange={5}
          title="Number Of Bathrooms"
          standard="bathrooms"
          symbol={null}
          text={null}
        />
        <RangeInput
          minRange={0}
          maxRange={2000}
          defaultMinRange={400}
          defaultMaxRange={1200}
          title="Square feet"
          standard="sq. ft."
          symbol={null}
          text={null}
        />
        <RangeInput
          minRange={0}
          maxRange={600}
          defaultMinRange={120}
          defaultMaxRange={450}
          title="Price"
          text="Range: "
          symbol="$"
          standard={null}
        />
        <div className="w-full flex justify-center pt-4">
          <button className="homec-btn">Apply filter</button>
        </div>
      </div>
      <AgentsSidebarSlider />
    </div>
  );
}

export default index;
