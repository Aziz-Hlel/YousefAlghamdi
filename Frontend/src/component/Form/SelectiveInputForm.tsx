import { FieldError, UseFormRegisterReturn } from "react-hook-form";



type SelectiveInputFormProps = {
  size?: string,

  title: string;
  value?: string;

  options: string[];
  fieldRegister: UseFormRegisterReturn<string>,
  fieldError: FieldError | undefined,
  dependant?: string,


}



function SelectiveInputForm({ size, title, options, fieldRegister, fieldError }: SelectiveInputFormProps) {





  return (
    <div className={`property-sidebar__single  w-fit *:w-fit  ${size} `}>
      <div className="">
        <h4 className={`homec-submit-form__heading ${options.length === 0 && "text-gray-300"}`}>{title}</h4>
        <div className="form-group homec-form-input">  {/*l mochkla f homec-form-input */}
          <select
            className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
            {...fieldRegister}
            disabled={options.length === 0}
          >
            <option ></option>
            {options.map((value: any) => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>
        <span className="text-red-600 p-2 inline-block">{fieldError?.message}</span>

      </div>
    </div>
  );
}


export default SelectiveInputForm;
