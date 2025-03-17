import ProtoTypes from "prop-types";
import Select from "react-dropdown-select";
import { IfilterProperty } from "src/models/filterProperty";
import { useFormContext } from "../Property2/FilterProvider.context";
import { useEffect } from "react";

function SelectiveInput({ title, options, classes, value, formkey }: { title: string, options: any, classes: string, value?: string, formkey: keyof IfilterProperty }) {
  const { updateField } = useFormContext();

  useEffect(() => {

  }, [])
  return (
    <div className={`property-sidebar__single ${classes}`}>
      <div className="property-sidebar__filters">
        <h4 className="property-sidebar__title">{title}</h4>
        <div className="form-group">
          <select onChange={(e) => updateField(formkey, e.target.value) } value={value}
           className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ">
            <option ></option>
            {options.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>

          {/* <Select
            values={[{ id: value, name: value }]}
            options={options}
            labelField="name"
            valueField="id"
            onChange={(values) =>{ console.log(values);
            ;updateField(formkey, (values[0] as any).id)}}
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
          /> */}
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
