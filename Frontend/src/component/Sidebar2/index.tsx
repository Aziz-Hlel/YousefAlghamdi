import SelectiveInput from "../Form/SelectiveInput";
import CheckInput from "../Form/CheckInput";
import RangeInput from "../Form/RangeInput2";
import AgentsSidebarSlider from "../Agents/AgentsSidebarSlider";
import imarates from "../../imarates";
import estateTypes from "../../estateType";
import { FormProvider } from "./FilterProvider.context";
import SideBar22 from "./SideBar22";

function index() {
  return (
    <FormProvider >
      <SideBar22 />
    </FormProvider>
  );
}

export default index;
