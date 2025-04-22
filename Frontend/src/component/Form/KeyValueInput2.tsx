import ProtoTypes from "prop-types";
import KeyValueInputField from "./KeyValueInputField2";

interface IKeyValueInput {
  list: { placeName: string; distance: string; }[]
  handleAddOrDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string, idx: number) => void;
  handleChange: (idx: any, keyType: "placeName" | "distance", value: string) => void;
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
            formkey={index}
            title={filedTitle}
            titleTwo={filedTitleTwo}
            handleKeyValue={handleChange}
            item={item}
            placeholderOne={placeholderOne}
            placeholderTwo={placeholderTwo}
            handleAddOrDelete={handleAddOrDelete}
            btnType={index === list.length - 1 ? "add" : "delete"}
            idx={index}
          />
        ))}
    </div>

  );
}



export default KeyValueInput;
