import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface IPropertyTextInput {
  size?: string,
  title?: string,
  placeholder?: string,
  type?: string,
  margin?: string,
  fieldRegister: UseFormRegisterReturn<string>,
  fieldError: FieldError | undefined,
}

const PropertyTextInput = ({ size, title, fieldError, placeholder, type, margin, fieldRegister }: IPropertyTextInput) => {
  return (
    <div className={`${size && size} col-12 `}>
      {/* Single Form Element */}
      <div className="mg-top-20">
        <h4
          className="homec-submit-form__heading"
          style={{ marginBottom: margin }}
        >
          {title}
        </h4>
        <div className={`form-group homec-form-input ${fieldError && 'border-2  border-red-600 rounded-sm'}`}>
          <input
            {...fieldRegister}
            type={type ? type : "text"}
            placeholder={placeholder}
          />
        </div>
        <span className="text-red-600 p-2 inline-block">{fieldError?.message}</span>
      </div>
    </div>
  );
}


export default PropertyTextInput;
