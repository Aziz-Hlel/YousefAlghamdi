import React, { useEffect } from 'react'
import { useDropzone } from 'react-dropzone';


type UploadThumbnailCardProps = {
    img: (File | null),
    handleDelete: Function;
    handleImage: Function;

};

const UploadThumbnailCard = ({ img, handleImage, handleDelete, }: UploadThumbnailCardProps) => {

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ maxFiles: 1, accept: { 'image/*': [] }, disabled: false });


    useEffect(() => {
        if (acceptedFiles.length > 0) handleImage(acceptedFiles[acceptedFiles.length - 1]);

    }, [acceptedFiles])

    return (
        <div className="col-lg-6 col-md-6 col-12">
            <div className="mg-top-20">
                <p className="homec-img-video-label mg-btm-10 ">
                    Thumbnail Image* <span>(Max. limit 10 & Max. Size 10MB)</span>
                </p>
                {/* Image Input   */}
                <div
                    className="homec-image-video-upload homec-border homec-bg-cover  mg-top-20"
                    style={{
                        backgroundImage: "url('https://placehold.co/100x600')",
                    }}
                    {...getRootProps()}
                >
                    <div className="homec-overlay homec-overlay--img-video"></div>
                    <input {...getInputProps()}

                        accept="image/*"
                    />
                    <label
                        className="homec-image-video-upload__label"
                        htmlFor="input-video1"
                    >
                        <img src={img ? URL.createObjectURL(img) : "img/upload-file-2.svg"} alt="#" />
                        <span className="homec-image-video-upload__title homec-image-video-upload__title--v2">
                            Drag & Drop or{" "}
                            <span className="homec-primary-color">Choose Image</span> to
                            upload{" "}
                        </span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default UploadThumbnailCard