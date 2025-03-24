import ProtoTypes from "prop-types";
import KeyValueInputField from "./KeyValueInputField2";

interface IKeyValueInput {
  list: { [key: string]: string }[];
  handleAddOrDelete: Function;
  handleChange: Function;
  filedTitle: string;
  filedTitleTwo: string;
  placeholderOne: string;
  placeholderTwo: string;
}

function KeyValueInput({ list, handleAddOrDelete, handleChange, filedTitle, filedTitleTwo, placeholderOne, placeholderTwo, }: IKeyValueInput) {
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
            btnType={index === list.length - 1 ? "add" : "delete"}
            idx = {index}
          />
        ))}
    </div>

  );
}



export default KeyValueInput;
