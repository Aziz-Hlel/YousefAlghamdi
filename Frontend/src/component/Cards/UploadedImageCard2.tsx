import ProtoTypes from "prop-types";
import CircularProgressBar from "../Form/CircularProgressBar ";


type UploadedImageCardProps = {
  img: (File | null),
  handleDelete: Function;
  handleImage: Function;
  idx: number;

};


function UploadedImageCard({ img, handleDelete, idx }: UploadedImageCardProps) {
  return (
    <div className="col-lg-4 col-md-4 col-12 mg-top-10">
      <div className="homec-upload-images__single bg-pink-200 outline-2 outline-black h-32 "

      >
        <div className="outline-2 outline-blue-600 w-full h-full flex  justify-center  items-center p-15 bg-[#f7f7fd] cursor-pointer rounded-md overflow-hidden  bg-center  bg-cover  bg-no-repeat  mt-7
                "
          style={{
            backgroundImage: img ? URL.createObjectURL(img) : "url('https://placehold.co/620x1720')",
          }}
        >

          <CircularProgressBar progress={0} />
        </div>
        <button
          className="homec-upload-images__single--edit flex justify-center fill-gray-600 group overflow-hidden"
          onClick={() => handleDelete(idx)}
        >
          <img src="img/delete-icon.svg" className="fill-gray-600 group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
}



export default UploadedImageCard;
