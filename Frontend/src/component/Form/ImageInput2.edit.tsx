import { FileWithPath } from "react-dropzone";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import UploadedImageCard from "../Cards/UploadedImageCard2.edit";
import UploadThumbnailCard from "./UploadThumbnailCard2.edit";


type ImageInputProps = {
  imgs: ({ key: string, url: string } | null)[];
  handleDelete: Function;
  handleImage: (uploadedImg: FileWithPath, idx: number, setProgress: Function) => void;
  fieldError: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{ key: string; }>> | undefined)[]> | undefined | undefined
};

function ImageInput({ imgs, handleDelete, handleImage, fieldError }: ImageInputProps) {



  return (
    <div className="homec-submit-form mg-top-40">
      <h4 className="homec-submit-form__title">Property Image</h4>
      <div className="homec-submit-form__inner">
        <div className="row">

          <UploadThumbnailCard handleImage={handleImage} img={imgs[0]} handleDelete={() => { }} />


          <div className="col-lg-6 col-md-6 col-12">
            <div className="mg-top-20">
              <div className="homec-submit-form__upload mg-btm-10">
                <p className="homec-img-video-label">
                  Slider Image*
                  {/* <span>(Max. limit 10 & Max. Size 10MB)</span> */}
                  <span>Image must be full HD (1920x1080)</span>
                </p>
                {/* <div className="homec-submit-form__upload-btn">
                  <button className="homec-btn homec-btn--upload">
                    <span>Upload New Image</span>
                  </button>
                </div> */}
              </div>
              {/* Image Input   */}


              <div className="homec-upload-images">
                <div className="row">
                  {imgs.map((image, index) => (
                index !== 0 &&
                    <UploadedImageCard
                      key={index}
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
          <span className="text-red-600 p-2 inline-block">{fieldError?.message}</span>

        </div>
      </div>
    </div>
  );
}



export default ImageInput;
