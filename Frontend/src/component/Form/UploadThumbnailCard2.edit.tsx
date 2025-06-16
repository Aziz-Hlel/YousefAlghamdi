import React, { useEffect, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone';
import CircularProgressBar from './CircularProgressBar ';


interface UploadThumbnailCardProps {
    img: null | { key: string, url: string };
    handleDelete: Function;
    handleImage: (uploadedImg: FileWithPath, idx: number, setProgress: Function) => void;

};

const UploadThumbnailCard = ({ img, handleImage, handleDelete, }: UploadThumbnailCardProps) => {

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ maxFiles: 1, accept: { 'image/*': [] }, disabled: false });

    const [progress, setProgress] = useState<number>();
    useEffect(() => {
        if (acceptedFiles.length > 0) handleImage(acceptedFiles[acceptedFiles.length - 1], 0, (progress: any) => { setProgress(progress) });

    }, [acceptedFiles])
    console.log("img url : = ", img?.url);


    return (
        <div className="col-lg-6 col-md-6 col-12">
            <div className="mg-top-20">
                <p className="homec-img-video-label mg-btm-10 ">
                    Thumbnail Image*
                    {/* <span>(Max. limit 10 & Max. Size 10MB)</span> */}
                    <span>Image must be full HD (1920x1080)</span>
                </p>
                {/* Image Input   */}
                <div
                    className=" homec-border homec-bg-cover  mg-top-20 "

                    {...getRootProps()}
                >
                    <img src={(img ? img.url : "url('https://placehold.co/1920x1080')")} alt="" className='w-full h-full' />
                    <input {...getInputProps()}

                        accept="image/*"
                    />
                    {progress && <CircularProgressBar progress={progress} />}
                    {!progress && <label
                        className="homec-image-video-upload__label md:h-22"
                    >
                        {!img && <>
                            <img src={"/img/upload-file-2.svg"} alt="#" />
                            <span className="homec-image-video-upload__title homec-image-video-upload__title--v2">
                                Drag & Drop or{" "}
                                <span className="homec-primary-color">Choose Image</span> to upload{" "}
                            </span>
                        </>}
                    </label>}
                </div>
            </div>
        </div >
    )
}

export default UploadThumbnailCard