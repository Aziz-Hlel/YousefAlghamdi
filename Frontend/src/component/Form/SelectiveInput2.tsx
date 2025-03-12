import ProtoTypes from "prop-types";
import { useState } from "react";
import Select from "react-dropdown-select";
import { useFormContext } from "../Sidebar2/FilterProvider.context";
import { IfilterProperty } from "src/models/filterProperty";

function SelectiveInput({ title, options, classes, value, key }: { title: string, options: any, classes: string, value: string, key: keyof IfilterProperty }) {
  const { updateField } = useFormContext();

  return (
    <div className={`property-sidebar__single ${classes}`}>
      <div className="property-sidebar__filters">
        <h4 className="property-sidebar__title">{title}</h4>
        <div className="form-group">
          <Select
            values={[value]}
            options={options}
            labelField="name"
            valueField="id"
            onChange={(values) => updateField(key, values)}
            searchable={true}
            // handle={true}
            placeholder="Select"
            closeOnSelect={true}
            dropdownPosition="auto"
            style={{
              outline: "none",
              padding: "10px",
              color: "#828ea3",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );
}

SelectiveInput.propTypes = {
  title: ProtoTypes.string.isRequired,
  options: ProtoTypes.array.isRequired,
  classes: ProtoTypes.string,
};

export default SelectiveInput;
