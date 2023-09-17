import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {FaFireExtinguisher} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {motion } from "framer-motion";

const Request = () => {

  const navigate = useNavigate();
  const [requestData, setRequestData] = useState<any>({image: "https://etimg.etb2bimg.com/photo/89133443.cms", details: "Loading...", distance: "Loading...", date: "Loading...", category: "Loading...", requestID: "Loading..."});
  const [distance, setDistance] = useState<any>("Loading...");
  const [details, setDetails] = useState<any>("Loading...");

  const fetchRequest = async ()=>{
    if(!localStorage.getItem("auth-token")){
      return navigate("/login");
    }

    const response = await fetch("http://localhost:9000/api/request/latest", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token")!,
      },
    });

    let data = await response.json();
    setDistance(data.distance);
    data = data.requests;

    setRequestData({
      image: data.image,
      details: data.details,
      distance: data.distance,
      time: data.date,
      category: data.type[0],
      requestID: data.requestID
    });
    setDetails(data.details);

  }

  const handleAccept = async ()=>{
    const response = await fetch("http://localhost:9000/api/request/accept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token")!,
      },
      body: JSON.stringify({requestID: requestData.requestID})
    });

    let data = await response.json();
    console.log(data);
    if(data.success){
      toast("Request Accepted");
      setDetails("Loading...");
      navigate("/chat");
    }
    else{
      toast("Request Acceptance Failed");
    }
  }

  const handleReject = async ()=>{
    const response = await fetch("http://localhost:9000/api/request/reject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token")!,
      },
      body: JSON.stringify({requestID: requestData.requestID})
    });

    let data = await response.json();
    console.log(data);
    if(data.success){
      toast("Request Rejected");
      setDetails("Loading...");
    }
    else{
      toast("Request Rejection Failed");
    }
  }

  useEffect(()=>{
    const intervalId = setInterval(()=> fetchRequest(), 2000);

    return ()=>{
      clearInterval(intervalId);
    }
  }, [])

  return (
  <>
  {details !== "Loading..." &&
    <motion.div initial={{x: -40, opacity: 0}} animate={{x:0, opacity: 1}} transition={{delay: 0.5, duration: 0.5}} className="flex justify-center">
      <div className="m-3 md:mx-auto max-w-sm md:max-w-max md:w-2/4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="text-2xl font-bold flex tracking-tight text-gray-900 dark:text-white">
            New Incoming Request 
            {/* <span className="text-md text-red-600"><FaFireExtinguisher size={15}/></span> */}
          </h5>
          <p className="mb-4 font-normal text-xs text-gray-700 dark:text-gray-400">
            {requestData.details}
          </p>
        <img className="md:w-2/3 w-full mb-2"
         src={requestData.image}
        />
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {requestData.category.toUpperCase()}
        </p>
        <div className="flex justify-between mb-2">
        <p className="text-sm text-right text-gray-700 dark:text-gray-400">
          {requestData.requestID}
        </p>
        <p className="text-sm text-right text-gray-700 dark:text-gray-400">
          {distance} km away
        </p>
        </div>
        
        <div className="flex justify-between mb-2">
        <div>
        <button
          onClick={handleAccept}
          className="animate-pulse inline-flex mr-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="inline-flex mx-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Reject
        </button>
        </div>
        <Link
          to="/accept"
          className="inline-flex mr-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:animate-ping dark:focus:ring-blue-800"
        >
          More
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
      </div>
    </motion.div>}
    </>
  );
};

export default Request;
