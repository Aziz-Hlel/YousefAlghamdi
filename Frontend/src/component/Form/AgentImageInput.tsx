import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import CircularProgressBarAgent from "./CircularProgressBarAgent";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import prepareImageForUpload from "./prepareImageForUpload";
import Cropper, { Area, Point } from "react-easy-crop";
import getCroppedImg from "./cropImg.func";


type AgentImageInputProps = {

    img?: { url?: string, key?: string } | null,
    fieldError: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{ key: string; }>> | undefined)[]> | undefined | undefined
    folderId: string,
    handleImage: Function,
    handleDeleteImage: Function,
    imageSource: "agentInfo.imageGallery.mainImage" | "agentInfo.imageGallery.miniImage",
    placeholderImage: string,
    aspectRatio: number,
    copperHeight: string,
    copperWidth: string

}




const AgentImageInput = ({ props }: { props: AgentImageInputProps }) => {
    const {
        img,
        fieldError,
        folderId,
        handleImage,
        handleDeleteImage,
        placeholderImage,
        imageSource,
        aspectRatio,
        copperHeight,
        copperWidth
    } = props;


    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ maxFiles: 1, accept: { 'image/*': [] }, disabled: false });
    const { acceptedFiles: acceptedFiles2, getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({ maxFiles: 1, accept: { 'image/*': [] }, disabled: false });

    const [uploadedImg, setUploadedImg] = useState<File | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [cropperOpened, setcopperOpened] = useState(false);
    const [compDisplayed, setCompDisplayed] = useState<"placeholder" | "copper" | "img">("placeholder");

    const [progress, setProgress] = useState<number>();

    const onCropComplete = (croppedArea: Point, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    useEffect(() => { if (img?.url && compDisplayed !== "img") setCompDisplayed("img") }, [img])


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







    const showCroppedImage = async () => {
        if (!croppedAreaPixels || !uploadedImg) {
            return
        }

        try {
            setCompDisplayed("img")
            handleDeleteImage(imageSource)
            setcopperOpened(false)
            console.log('t5l 1 uploadedImg name :', uploadedImg.name);
            setProgress(5)
            const croppedImage = await getCroppedImg(
                URL.createObjectURL(uploadedImg),
                uploadedImg.name,
                croppedAreaPixels,
                rotation
            )
            if (!croppedImage) return
            console.log('t5l 2 croppedImage type :', typeof croppedImage);
            console.log("file name ::", croppedImage.name);

            const optimizedImg = await prepareImageForUpload(croppedImage);
            setProgress(10)
            console.log('t5l 3 ');
            console.log(optimizedImg.blob.name);
            setUploadedImg(null)
            handleImage(optimizedImg.blob as File, imageSource, (progress: any) => { setProgress(progress) }, croppedImage.name);
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
            // handleDeleteImage(imageSource);
        }
    }

    useEffect(() => {
        console.log("compDisplayed", compDisplayed);

    }, [compDisplayed])


    return (
        <>
            {compDisplayed === "placeholder" &&
                <div className=""    {...getRootProps()}>

                    <img src={placeholderImage} alt="" />
                    {/* <div className="-overlay -overlay--img-video"></div> */}
                    <input {...getInputProps()} accept="image/*" />

                    {progress && <CircularProgressBarAgent progress={progress} />}
                </div>
            }
            {compDisplayed === "copper" &&
                <div className='flex flex-col  '>
                    <div className={"crop-container " + copperHeight}>
                        <Cropper
                            image={uploadedImg ? URL.createObjectURL(uploadedImg) : ""}
                            crop={crop}
                            zoom={zoom}
                            aspect={aspectRatio}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}

                        />
                    </div>
                    <div className={"controls" }>
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
                    <div className={' flex lg:gap-4 w-5 gap-0.5 ' }>
                        <div className='w-fit text-xs p-0.5 lg:text-lg lg:p-2 bg-red-500 rounded-xl text-white hover:bg-red-600 cursor-pointer ' onClick={handleCancel}>cancel</div>
                        <div className='w-fit text-xs p-0.5 lg:text-lg lg:p-2 bg-green-500 rounded-xl text-white hover:bg-green-600 cursor-pointer ' onClick={showCroppedImage}>confirm</div>

                    </div>
                </div>
            }

            {
                compDisplayed === "img" &&
                <div className={' w-full  relative ' + (img ? "bg-slate-200" : "")}>
                    <img src={img?.url ? img.url : undefined} alt="" className=" w-full h-full" />
                    <div className=" w-full flex justify-end px-2 py-2 lg:gap-4 gap-0.5">
                        {img?.url &&
                            <div className='w-fit text-xs p-0.5 lg:text-lg lg:p-2 bg-red-500 rounded-xl text-white hover:bg-red-600 cursor-pointer '
                                onClick={(e) => { e.preventDefault(); setCompDisplayed("placeholder"); handleDeleteImage(imageSource) }}>
                                delete
                            </div>
                        }

                        {img?.url &&
                            <div className='w-fit text-xs p-0.5 lg:text-lg lg:p-2 bg-amber-500 rounded-xl text-white hover:bg-amber-600 cursor-pointer ' {...getRootProps2()} >
                                <div >
                                    change
                                    <input {...getInputProps2()} accept="image/*" />
                                </div>
                            </div>}
                        {progress && <CircularProgressBarAgent progress={progress} />}

                    </div>

                </div>
            }







        </>
    )
}












export default AgentImageInput