import ProtoTypes from "prop-types";
import { useState } from "react";
import Select from "react-dropdown-select";

function FromField({ name, options, state, setState }: any) {

  return (
    <div className="form-group text-xs  font-light  lg:w-52 flex justify-center">
      <span className="homec-filter-group__label  text-xs   text-wrap">{name}</span>

      <select
        onChange={(value) => setState(value.target.value)}
        style={{ border: "none", outline: "none", zIndex: "999" }}
        className=" text-xs "
        value={state}
      >
        {options.map((option: any) => (
          <option formkey={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}


export default FromField;
