import React, { useEffect, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone';
import CircularProgressBar from './CircularProgressBar ';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImg.func';
import { Point, Area } from "react-easy-crop";
import prepareImageForUpload from './prepareImageForUpload';
import { useTranslation } from 'react-i18next';
import getText from '@src/i18n/data/getText';
import { capitalizePhrase } from '@src/utils/capitalize_decapitalized';


interface UploadThumbnailCardProps {
    img: null | { url: string, key: string };
    handleDelete: Function;
    handleImage: (uploadedImg: FileWithPath, idx: number, setProgress: Function, fileName?: string) => void;

};

const UploadThumbnailCard = ({ img, handleImage, handleDelete, }: UploadThumbnailCardProps) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ maxFiles: 1, accept: { 'image/*': [] }, disabled: false });
    const { acceptedFiles: acceptedFiles2, getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({ maxFiles: 1, accept: { 'image/*': [] }, disabled: false });
    const { t } = useTranslation(["data", 'common']);

    const [progress, setProgress] = useState<number>();

    useEffect(() => { if (img && compDisplayed !== "img") setCompDisplayed("img") }, [img])


    useEffect(() => {
        // if (acceptedFiles.length > 0) handleImage(acceptedFiles[acceptedFiles.length - 1], 0, (progress: any) => { setProgress(progress) });

        if (acceptedFiles.length > 0) {
            setUploadedImg(acceptedFiles[acceptedFiles.length - 1])
            setcopperOpened(true)
            setCompDisplayed("copper")
        }

    }, [acceptedFiles])

    useEffect(() => {
        // if (acceptedFiles.length > 0) handleImage(acceptedFiles[acceptedFiles.length - 1], 0, (progress: any) => { setProgress(progress) });

        if (acceptedFiles2.length > 0) {
            setUploadedImg(acceptedFiles2[acceptedFiles2.length - 1])
            setcopperOpened(true)
            setCompDisplayed("copper")
        }

    }, [acceptedFiles2])



    const [uploadedImg, setUploadedImg] = useState<File | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [cropperOpened, setcopperOpened] = useState(false)
    const [compDisplayed, setCompDisplayed] = useState<"placeholder" | "copper" | "img">(img ? "img" : "placeholder")


    const onCropComplete = (croppedArea: Point, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }


    const showCroppedImage = async () => {
        if (!croppedAreaPixels || !uploadedImg) {
            return
        }

        try {
            setCompDisplayed("img")
            handleDelete(0)
            setcopperOpened(false)
            console.log('t5l 1 uploadedImg name :', uploadedImg.name);
            setProgress(5)
            const croppedImage = await getCroppedImg(
                URL.createObjectURL(uploadedImg),
                uploadedImg.name,
                croppedAreaPixels,
                0
            )
            if (!croppedImage) return
            console.log('t5l 2 croppedImage type :', typeof croppedImage);
            console.log("file name ::", croppedImage.name);

            const optimizedImg = await prepareImageForUpload(croppedImage);
            setProgress(10)
            console.log('t5l 3 ');
            console.log(optimizedImg.blob.name);
            setUploadedImg(null)
            handleImage(optimizedImg.blob as File, 0, (progress: any) => { setProgress(progress) }, croppedImage.name);
            console.log('donee', { croppedImage })
        } catch (e) {
            console.error(e)
        }
    }



    const handleCancel = (e: React.MouseEvent<HTMLDivElement>) => {

        e.preventDefault();
        if (img) {
            setCompDisplayed("img")
            setUploadedImg(null)
        }
        else {
            setCompDisplayed("placeholder");
            handleDelete(0)
        }
    }

    return (
        <div className="col-lg-4 col-md-4 col-12 mg-top-10 ">
            <div className="-upload-images__single  border-2   border-black min-h-40">

                <div className=" ">

                    {compDisplayed === "placeholder" &&
                        <div className=""    {...getRootProps()}>

                            <img src="https://placehold.co/1920x1080" alt="" />
                            {/* <div className="-overlay -overlay--img-video"></div> */}
                            <input {...getInputProps()} accept="image/*" />

                            {progress && <CircularProgressBar progress={progress} />}
                        </div>
                    }
                    {compDisplayed === "copper" &&
                        <div className='flex flex-col h-full'>
                            <div className="crop-container  lg:w  h-52 ">
                                <Cropper
                                    image={uploadedImg ? URL.createObjectURL(uploadedImg) : ""}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={16 / 9}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}

                                />
                            </div>
                            <div className="controls">
                                <input
                                    type="range"
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    aria-labelledby="Zoom"
                                    onChange={(e) => {
                                        setZoom(Number(e.target.value))
                                    }}
                                    className="zoom-range"
                                />
                            </div>
                            <div className=' w-full flex gap-4'>
                                <div className='w-fit p-2 bg-red-500 rounded-xl text-white hover:bg-red-600 cursor-pointer ' onClick={handleCancel}>
                                    {capitalizePhrase(t(getText.common.cancel))}
                                </div>
                                <div className='w-fit p-2 bg-green-500 rounded-xl text-white hover:bg-green-600 cursor-pointer ' onClick={showCroppedImage}> {capitalizePhrase(t(getText.common.confirm))}</div>

                            </div>
                        </div>
                    }
                    {
                        compDisplayed === "img" &&
                        <div className={' h-full w-full  relative ' + (img ? "bg-slate-200" : "")}>
                            <img src={img ? img.url : ""} alt="" className=" w-full h-full" />
                            <div className=" w-full flex justify-end px-2 py-2 gap-2">

                                {img && <div className='w-fit p-2 bg-red-500 rounded-xl text-white hover:bg-red-600 cursor-pointer '
                                    onClick={(e) => { e.preventDefault(); setCompDisplayed("placeholder"); handleDelete(0) }}>
                                    {capitalizePhrase(t(getText.common.delete))}
                                </div>
                                }

                                {img &&
                                    <div className='w-fit p-2 bg-amber-500 rounded-xl text-white hover:bg-amber-600 cursor-pointer ' {...getRootProps2()} >
                                        <div >

                                            {capitalizePhrase(t(getText.common.change))}
                                            <input {...getInputProps2()} accept="image/*" />
                                        </div>
                                    </div>
                                }

                                {progress && <CircularProgressBar progress={progress} />}

                            </div>

                        </div>
                    }


                </div>

            </div>
        </div>
    )
}

export default UploadThumbnailCard