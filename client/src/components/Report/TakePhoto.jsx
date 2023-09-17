import React, { useRef } from "react";
import { toast } from "react-toastify";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const TakePhoto = () => {
  const [image, setImage] = React.useState(null);
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const navigate = useNavigate();

  const VictimeRef = useRef(null);
  const CategoryRef = useRef(null);
  const SeverityRef = useRef(null);
  const DetailsRef = useRef(null);

  const handleRequest = async () => {
    const victims = VictimeRef.current.value;
    const category = CategoryRef.current.value;
    const severity = SeverityRef.current.value;
    const details = DetailsRef.current.value;
    if(!image) return toast.error("Please take a photo");
    if(!victims) return toast.error("Please enter number of victims");
    if(!category) return toast.error("Please select a category");
    if(!severity) return toast.error("Please select severity");
    if(!details) return toast.error("Please enter details");
    if(!localStorage.getItem("user-auth-token")) 
        return toast.error("Please login to report");

    const response = await fetch("http://localhost:9000/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("user-auth-token"),
      },
      body: JSON.stringify({
        image: image,
        location: [20.2478872, 85.8010479],
        category: [category],
        victims: victims,
        severity: severity,
        details: details,
      }),
    });
    const json = await response.json();
    if (json.success) {
      toast.success("Request Sent");
        navigate("/success");
    } else {
      toast.error("Request Failed");
    }
  };

  return (
    <>
      {image ? (
        <img src={image} />
      ) : (
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
      )}
      {image == null && (
        <div className="flex justify-center">
          <button
            className="my-4 px-4 py-2 bg-slate-600 mx-auto font-semibold text-white rounded-lg"
            onClick={capture}
          >
            Capture photo
          </button>
        </div>
      )}
      <div className="mt-6 flex justify-center">
        <div className="">
          <label className="mx-4 text-white font-semibold">Victims</label>
          <input
            ref={VictimeRef}
            type="number"
            className="mx-2 bg-white rounded-lg my-4 bg-opacity-20 text-white font-semibold px-4 py-2"
            placeholder="Number ofVictims"
          />
        </div>
        <div name="category mx-auto">
          <label className="mx-4 text-white font-semibold">Category</label>
          <select
            ref={CategoryRef}
            className="bg-white rounded-lg my-4 bg-opacity-20 text-white font-semibold px-4 py-2"
          >
            <option value="fire">Fire</option>
            <option value="police">Police</option>
            <option value="medicine">Flood</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <label className="mx-4 text-white font-semibold">Severity</label>
        <input
          ref={SeverityRef}
          type="range"
          className="mx-4 bg-white rounded-lg my-4 bg-opacity-20 text-white font-semibold px-4 py-2"
          placeholder="Severity"
        />
        <label className="mx-4 text-white font-semibold">Details</label>
        <textarea
          ref={DetailsRef}
          className="bg-white mx-6 rounded-lg my-4 bg-opacity-20 text-white font-semibold px-4 py-2"
          placeholder="Details"
        />
      </div>
      <div className="flex justify-center">
        <button
          className="bg-white rounded-lg my-4 bg-opacity-20 text-white text-xl font-semibold px-7 py-3"
          onClick={handleRequest}
        >
          Report
        </button>
      </div>
    </>
  );
};

export default TakePhoto;
