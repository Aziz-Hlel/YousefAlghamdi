import ProtoTypes from "prop-types";
import { IfilterProperty } from "src/models/filterProperty";
import { useFormContext } from "../Property2/FilterProvider.context";

function CheckInput({ title, properties }: { title: string, properties: { key: keyof IfilterProperty, value: boolean, name: string }[] }) {

  const { updateField } = useFormContext();

  return (
    <div className="property-sidebar__single mg-top-20">
      <div className="property-sidebar__checkboxd">
        <h4 className="property-sidebar__title m-0">{title}</h4>
        <div className="row">
          {properties.map((item, index) => (
            <div className="col-md-6 col-12" key={index}>
              <div className="form-group homec-form-checkbox mg-top-15">
                <input type="checkbox" id={item.key} name={item.key} value={item.value ? 1 : 0} checked={item.value} onChange={(e) => updateField(item.key, e.target.checked)} />
                <label className="homec-form-label" htmlFor="room1">
                  {item.name}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

CheckInput.propTypes = {
  title: ProtoTypes.string.isRequired,
  properties: ProtoTypes.array.isRequired,
  name: ProtoTypes.string.isRequired,
};

export default CheckInput;