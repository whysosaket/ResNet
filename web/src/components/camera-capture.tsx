/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { v4 as uuidv4 } from "uuid";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { env } from "@/env.mjs";
// import { UploadButton } from "@/utils/uploadthing";

interface ImageData {
  src: string;
  height: number;
  width: number;
}

function CameraCapture({ onUploadImage }: any) {
  // const supabase = createClientComponentClient({
  //   supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
  //   supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ANON_KEY,
  // });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [clicked, setClicked] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // if (file) {
      //   void uploadImage(file);
      // }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const url = URL.createObjectURL(e.target.files[0]);
      const dimensions = new Image();
      dimensions.src = url;
      dimensions.onload = function () {
        setImageData({
          src: url,
          height: dimensions.height,
          width: dimensions.width,
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        onUploadImage(url);
      };

      setClicked(true);
    }
  };

  // const uploadImage = async (file: File) => {
  //   const filename = `${uuidv4()}-${file.name}`;

  //   const bucket = "incidents";

  //   // Call Storage API to upload file
  //   const { data, error } = await supabase.storage
  //     .from(bucket)
  //     .upload(filename, file);

  //   // Handle error if upload failed
  //   if (error) {
  //     alert("Error uploading file.");
  //     return;
  //   }

  //   alert("File uploaded successfully!");

  //   console.log(filename);
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //   onUploadImage(data.path);
  // };

  const stopCamera = () => {
    if (cameraStream) {
      if (videoRef?.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
      }
      const tracks = cameraStream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const startCamera = () => {
    const findMediaDevices = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
    void findMediaDevices();
  };

  useEffect(() => {
    const findMediaDevices = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
    void findMediaDevices();
  }, []);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL("image/png");
        setImageData({
          src: dataUrl,
          width: video.videoWidth,
          height: video.videoHeight,
        });
        setClicked(true);
        stopCamera();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        void onUploadImage(dataUrl);
      }
    }
  };

  // const clearSelection = () => {
  //   setImageData(null);
  //   setCameraStream(null);
  //   setClicked(false);

  //   startCamera();
  // };

  return (
    <>
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Image of the incident
      </label>
      <div className="my-1 flex flex-col items-center gap-4">
        {!clicked && cameraStream != null && (
          <video className="rounded-[10px]" ref={videoRef} autoPlay></video>
        )}

        {imageData && (
          <img
            src={imageData.src}
            alt="Captured"
            className="h-full max-h-[466px] rounded-[10px]"
          />
        )}
        <div className="flex w-full items-center justify-end gap-2">
          {cameraStream != null && !clicked && (
            <label
              className={buttonVariants({
                variant: "ghost",
              })}
              htmlFor="file-upload"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleChange}
              />
            </label>
          )}
          {/* {cameraStream != null && !clicked && (
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          )} */}
          {cameraStream != null && !clicked && (
            <Button variant="outline" onClick={captureImage}>
              Take picture
            </Button>
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>
    </>
  );
}

export default CameraCapture;
