import ProtoTypes from "prop-types";
import { useState } from "react";
import Select from "react-dropdown-select";

function FromField({ name, options }: any) {
  const [value, setValue] = useState(options[0]);
  return (
    <div className="form-group text-xs  font-light  lg:w-52">
      <span className="homec-filter-group__label  text-xs">{name}</span>
      <select

        onChange={(values) => setValue(values)}
        style={{ border: "none", outline: "none", zIndex: "999" }}

      >
        {options.map((option: any) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

FromField.propTypes = {
  name: ProtoTypes.string.isRequired,
  options: ProtoTypes.array.isRequired,
};

export default FromField;
