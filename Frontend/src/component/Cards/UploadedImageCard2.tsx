import ProtoTypes from "prop-types";


type UploadedImageCardProps = {
  img: (File | null),
  handleDelete: Function;
};


function UploadedImageCard({ img, handleDelete }: UploadedImageCardProps) {
  return (
    <div className="col-lg-4 col-md-4 col-12 mg-top-10">
      <div className="homec-upload-images__single">
        <img src={img ? img.name : "https://placehold.co/540x205"} />
        <button
          className="homec-upload-images__single--edit"
          onClick={() => handleDelete(img)}
        >
          <img src="img/delete-icon.svg" />
        </button>
      </div>
    </div>
  );
}



export default UploadedImageCard;
