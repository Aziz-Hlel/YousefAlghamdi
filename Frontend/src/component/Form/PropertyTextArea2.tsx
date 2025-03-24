import ProtoTypes from "prop-types";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { useEffect } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";


interface IPropertyTextArea {
  title: string,
  fieldRegister: UseFormRegisterReturn<string>,
  fieldError: FieldError | undefined,
}

const PropertyTextArea = ({ title, fieldRegister, fieldError }: IPropertyTextArea) => {


  return (
    <div className="mg-top-20">
      <h4 className="homec-submit-form__heading">{title}</h4>
      <div className={`form-group homec-form-input ${fieldError && 'border-2  border-red-600 rounded-sm'}`}>
        <input
          className="h-full form-group homec-form-input "
          {...fieldRegister}
          type="text"
        />

      </div>
    </div>
  );
}



export default PropertyTextArea;
