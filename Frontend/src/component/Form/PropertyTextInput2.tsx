
interface IPropertyTextInput {
  size?: string,
  title?: string,
  name: string,
  value: string | number,
  handleChange: (e: any) => void,
  placeholder?: string,
  type?: string,
  margin?: string,
  wrongCrendentials?: boolean,
}

const PropertyTextInput = ({ size, title, name, value, handleChange, placeholder, type, margin, wrongCrendentials }: IPropertyTextInput) => {
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
        <div className={`form-group homec-form-input ${wrongCrendentials && 'border-2  border-red-600 rounded-sm'}`}>
          <input
            type={type ? type : "text"}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
            }}
            required
          />
        </div>
      </div>
    </div>
  );
}


export default PropertyTextInput;
