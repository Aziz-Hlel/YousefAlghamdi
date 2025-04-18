import ProtoTypes from "prop-types";
import Select from "react-dropdown-select";
import { IfilterProperty } from "src/models/filterProperty";
import { useFormContext } from "../Property2/FilterProvider.context";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function SelectiveInput({ title, options, classes, value, formkey }: { title: string, options: any, classes: string, value?: string, formkey: keyof IfilterProperty }) {
  const { updateField } = useFormContext();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (formkey: string, value: string) => {

    if (value) searchParams.set(formkey, value); // update param
    else searchParams.delete(formkey)

    setSearchParams(searchParams, { replace: true });     // push to URL
  };

  useEffect(() => {

  }, [])
  return (
    <div className={`property-sidebar__single ${classes}`}>
      <div className="property-sidebar__filters">
        <h4 className="property-sidebar__title">{title}</h4>
        <div className="form-group">
          <select onChange={(e) => handleChange(formkey, e.target.value)} value={searchParams.get(formkey) ?? undefined}
            className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ">
            <option value={""} ></option>
            {options.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>

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
