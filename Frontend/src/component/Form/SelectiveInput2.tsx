import ProtoTypes from "prop-types";
import Select from "react-dropdown-select";
import { IfilterProperty } from "src/models/filterProperty";
import { useFormContext } from "../Property2/FilterProvider.context";

function SelectiveInput({ title, options, classes, value, formkey }: { title: string, options: any, classes: string, value?: string, formkey: keyof IfilterProperty }) {
  const { updateField } = useFormContext();

  return (
    <div className={`property-sidebar__single ${classes}`}>
      <div className="property-sidebar__filters">
        <h4 className="property-sidebar__title">{title}</h4>
        <div className="form-group">
          <Select
            values={[value ?? ""]}
            options={options}
            labelField="name"
            valueField="id"
            onChange={(values) => { console.log((values[0] as any).id), updateField(formkey, (values[0] as any).id) }}
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
