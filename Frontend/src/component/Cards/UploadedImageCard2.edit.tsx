import CircularProgressBar from "../Form/CircularProgressBar ";
import { useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';


type UploadedImageCardProps = {
  img: ({ key: string, url: string } | null),
  handleDelete: Function;
  handleImage: Function;
  idx: number;

};


function UploadedImageCard({ img, handleImage, handleDelete, idx }: UploadedImageCardProps) {

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: { 'image/*': [], },
    disabled: false,
    maxSize: 5 * 1024 * 1024, // 5MB max file size

  });
  const [progress, setProgress] = useState<number>();

  useEffect(() => {
    if (acceptedFiles.length > 0) {

      handleImage(acceptedFiles[acceptedFiles.length - 1], idx, (progress: any) => { setProgress(progress) });
    };

  }, [acceptedFiles])




  return (
    <div className="col-lg-4 col-md-4 col-12 mg-top-10">
      <div className="homec-upload-images__single  "

      >
        <div className=" w-full h-full flex  justify-center  items-center p-15 bg-[#f7f7fd] cursor-pointer rounded-md overflow-hidden  bg-center  bg-contain  bg-no-repeat  mt-7
                "
          style={{
            backgroundImage: img ? `url(${img.url!})` : undefined,
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {progress && <CircularProgressBar progress={progress} />}
        </div>
        {img && <button
          className="homec-upload-images__single--edit flex justify-center group overflow-hidden"
          onClick={() => handleDelete(idx)}
        >
          <img src="/img/delete-icon.svg" className=" group-hover:scale-110" />
        </button>}
      </div>
    </div>
  );
}



export default UploadedImageCard;
