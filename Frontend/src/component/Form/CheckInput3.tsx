import ProtoTypes from "prop-types";
import { IfilterProperty } from "src/models/filterProperty";
import { useFormContext } from "../Property2/FilterProvider.context";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type CheckInput2Props = {
  title: string;
  setAdditionalDetails: Function,
  additionalDetails: string[]
}


function CheckInput2({ title, setAdditionalDetails, additionalDetails }: CheckInput2Props) {


  return (
    <div className="property-sidebar__single mg-top-20 ">
      <div className="property-sidebar__checkboxd">
        <div className="flex  h-fit items-center gap-2">

          <span className="  whitespace-nowrap ">{title}</span>
          <input onChange={(e) => setAdditionalDetails(e)} type="checkbox" name={title} className="flex" checked={additionalDetails.includes(title)} />
    
        </div>
      </div>
    </div>
  );
}


export default CheckInput2;
