import {useState} from "react";
import { Link } from "react-router-dom";
import {FaFireExtinguisher} from 'react-icons/fa';

const Request = () => {

  const [redirected, setRedirected] = useState(false);


  return (
    <div className="flex justify-center">
      <div className="m-3 md:mx-auto max-w-sm md:max-w-max md:w-2/4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="text-2xl font-bold flex tracking-tight text-gray-900 dark:text-white">
            New Incoming Request 
            {/* <span className="text-md text-red-600"><FaFireExtinguisher size={15}/></span> */}
          </h5>
          <p className="mb-4 font-normal text-xs text-gray-700 dark:text-gray-400">
            2 people trapped in a building
          </p>
        <img className="md:w-2/3 w-full mb-2"
         src="https://etimg.etb2bimg.com/photo/89133443.cms"
        />
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Fire, Ambulance, Police
        </p>
        <div className="flex justify-between mb-2">
        <p className="text-sm text-right text-gray-700 dark:text-gray-400">
          5:12 PM
        </p>
        <p className="text-sm text-right text-gray-700 dark:text-gray-400">
          2.5km away
        </p>
        </div>
        
        <div className="flex justify-between mb-2">
        <div>
        <Link
          to="/accept"
          className="animate-pulse inline-flex mr-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:animate-ping dark:focus:ring-green-800"
        >
          Accept
        </Link>
        <a
          href="#"
          className="inline-flex mx-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Reject
        </a>
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
    </div>
  );
};

export default Request;
