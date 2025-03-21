import ProtoTypes from "prop-types";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { useEffect } from "react";


interface IPropertyTextArea {
  title: string,
  name: string,
  handleChange: (e: any) => void
}

const PropertyTextArea = ({ title, name,  handleChange }: IPropertyTextArea) => {
  const [input, setInput] = useState({
    name,
    value: "",
  });
  useEffect(() => {
    handleChange(input);
  }, [input]);

  return (
    <div className="mg-top-20">
      <h4 className="homec-submit-form__heading">{title}</h4>
      <div className="form-group homec-form-input">
        <CKEditor
          editor={ClassicEditor}
          data={input.value}
          onChange={(editor) => {
            const data = editor.getData();
            setInput({ ...input, value: data });
          }}
        />
      </div>
    </div>
  );
}



export default PropertyTextArea;
