import ProtoTypes from "prop-types";
import KeyValueInputField from "./KeyValueInputField2";

interface IKeyValueInput {
  list: { [key: string]: string }[];
  handleAddOrDelete: Function;
  handleChange: Function;
  title: string;
  filedTitle: string;
  filedTitleTwo: string;
  placeholderOne: string;
  placeholderTwo: string;
  keyType: string;
}

function KeyValueInput({ list, handleAddOrDelete, handleChange, filedTitle, filedTitleTwo, placeholderOne, placeholderTwo, keyType, }: IKeyValueInput) {
  return (

    <div className="homec-submit-form__inner">
      {
        list.map((item, index) => (
          <KeyValueInputField
            key={index}
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
  filedTitle: ProtoTypes.string.isRequired,
  filedTitleTwo: ProtoTypes.string.isRequired,
  placeholderOne: ProtoTypes.string,
  placeholderTwo: ProtoTypes.string,
  keyType: ProtoTypes.string.isRequired,
  options: ProtoTypes.array.isRequired,
};

export default KeyValueInput;
