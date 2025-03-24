import ProtoTypes from "prop-types";
import KeyValueInputField from "./KeyValueInputField";

interface IKeyValueInput {
  info: any;
  handleAddOrDelete: any;
  handleChange: any;
  title: string;
  filedTitle: string;
  filedTitleTwo: string;
  placeholderOne: string;
  placeholderTwo: string;
  options: any;
  keyType: string;
}

function  KeyValueInput({ info, handleAddOrDelete, handleChange, title, filedTitle, filedTitleTwo, placeholderOne, placeholderTwo, options, keyType, }: IKeyValueInput) {
  return (

      <div className="homec-submit-form__inner">
        {
          info.map((item: any, index: any) => (
            <KeyValueInputField
              key={item.id}
              options={options ? options : false}
              title={filedTitle}
              titleTwo={filedTitleTwo}
              handleKeyValue={handleChange}
              value={item}
              placeholderOne={placeholderOne}
              placeholderTwo={placeholderTwo}
              handleAddOrDelete={handleAddOrDelete}
              btnType={index === 0 ? "add" : "delete"}
              keyType={keyType}
            />
          ))}
      </div>

  );
}

KeyValueInput.propTypes = {
  info: ProtoTypes.array.isRequired,
  handleAddOrDelete: ProtoTypes.func.isRequired,
  handleChange: ProtoTypes.func.isRequired,
  title: ProtoTypes.string.isRequired,
  filedTitle: ProtoTypes.string.isRequired,
  filedTitleTwo: ProtoTypes.string.isRequired,
  placeholderOne: ProtoTypes.string,
  placeholderTwo: ProtoTypes.string,
  keyType: ProtoTypes.string.isRequired,
  options: ProtoTypes.array.isRequired,
};

export default KeyValueInput;
