import { IfilterProperty } from "src/models/filterProperty";
import { useFormContext } from "../Property2/FilterProvider.context";


type ICheckInput = {
  title: string;
  formkey: keyof IfilterProperty;
  properties: { value: string, name: string }[]
}

function CheckInput({ title, formkey: formkey, properties, }: ICheckInput) {

  const { filterObject, updateField } = useFormContext();

  return (
    <div className="property-sidebar__single mg-top-20">
      <div className="property-sidebar__checkboxd">
        <h4 className="property-sidebar__title m-0">{title}</h4>
        <div className="row">
          {properties.map((item, index) => (
            <div className="col-md-6 col-12" formkey={index}>
              <div className="form-group homec-form-checkbox mg-top-15">
                <input type="checkbox" value={item.value} checked={filterObject.listingType === item.value} onChange={(e) => updateField(formkey, e.target.value)} />
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



export default CheckInput;