import ProtoTypes from "prop-types";
import { useState } from "react";
import Select from "react-dropdown-select";

function FromField({ name, options }: any) {
  const [value, setValue] = useState(options[0]);
  return (
    <div className="form-group text-xs  font-light  lg:w-52 flex justify-center">
      <span className="homec-filter-group__label  text-xs   text-wrap">{name}</span>

      <select
        onChange={(values) => setValue(values)}
        style={{ border: "none", outline: "none", zIndex: "999" }}
        className=" text-xs "
      >
        {options.map((option: any) => (
          <option formkey={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}


export default FromField;
