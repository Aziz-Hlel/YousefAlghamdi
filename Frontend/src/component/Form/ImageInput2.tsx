import ProtoTypes from "prop-types";
import UploadedImageCard from "../Cards/UploadedImageCard2";
import CircularProgressBar from "./CircularProgressBar ";
import UploadThumbnailCard from "./UploadThumbnailCard";
import { FileWithPath } from "react-dropzone";


type ImageInputProps = {
  imgs: (File | null)[];
  handleDelete: Function;
  handleImage: (uploadedImg: FileWithPath, idx: number) => void;
};

function ImageInput({ imgs, handleDelete, handleImage }: ImageInputProps) {



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
                  Slider Image* <span>(Max. limit 10 & Max. Size 10MB)</span>
                </p>
                <div className="homec-submit-form__upload-btn">
                  <button className="homec-btn homec-btn--upload">
                    <span>Upload New Image</span>
                  </button>
                </div>
              </div>
              {/* Image Input   */}


              <div className="homec-upload-images">
                <div className="row">
                  {imgs.map((image, index) => (
                    index !== 0 &&
                    <UploadedImageCard
                      key={index + 1}
                      img={image}
                      handleDelete={handleDelete}
                      handleImage={handleImage}
                      idx={index }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}



export default ImageInput;
