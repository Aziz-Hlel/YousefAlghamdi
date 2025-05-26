import UploadedImageCard from "../Cards/UploadedImageCard2";
import UploadThumbnailCard from "./UploadThumbnailCard";
import { FileWithPath } from "react-dropzone";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";


type ImageInputProps = {
  imgs: ({ url: string, key: string } | null)[];
  handleDelete: Function;
  handleImage: (uploadedImg: FileWithPath, idx: number, setProgress: Function) => void;
  fieldError: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{ key: string; }>> | undefined)[]> | undefined | undefined
};

function ImageInput({ imgs, handleDelete, handleImage, fieldError }: ImageInputProps) {

  const { t } = useTranslation(['common', 'submitProperty']);

  return (
    <div className="homec-submit-form mg-top-40">
      <h4 className="homec-submit-form__title">{capitalizePhrase(t(getText.submitProperty.propertyImage.title))}</h4>
      <div className="homec-submit-form__inner">
        <div className="row">
          <p className="homec-img-video-label mg-btm-10  pt-2">
            {capitalizePhrase(t(getText.submitProperty.propertyImage.thumbnaiImage.title))}
            {/* <span>(Max. limit 10 & Max. Size 10MB)</span> */}
            <span> {capitalizePhrase(t(getText.submitProperty.propertyImage.thumbnaiImage.note))}</span>
          </p>
          <UploadThumbnailCard handleImage={handleImage} img={imgs[0]} handleDelete={handleDelete} />


          <div className="col-lg-6 col-md-6 col-12">
            <div className="mg-top-20">
              <div className="homec-submit-form__upload mg-btm-10">

                {/* <div className="homec-submit-form__upload-btn">
                  <button className="homec-btn homec-btn--upload">
                    <span>Upload New Image</span>
                  </button>
                </div> */}
              </div>
              {/* Image Input   */}

            </div>

          </div>

          <span className="text-red-600 p-2 inline-block">{fieldError?.message}</span>

        </div>
        <p className="homec-img-video-label pt-10">
          {capitalizePhrase(t(getText.submitProperty.propertyImage.sliderImages.title))}
          {/* <span>(Max. limit 10 & Max. Size 10MB)</span> */}
          <span> {capitalizePhrase(t(getText.submitProperty.propertyImage.sliderImages.note))}</span>
        </p>
        <div className="homec-upload-images">
          <div className="row">
            {imgs.map((image, index) => (
              index !== 0 &&
              <UploadedImageCard
                key={index + 1}
                img={image}
                handleDelete={handleDelete}
                handleImage={handleImage}
                idx={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



export default ImageInput;
