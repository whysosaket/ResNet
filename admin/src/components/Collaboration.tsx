import React from 'react'
import { Link } from 'react-router-dom'

const Collaboration = () => {
  return (
        <div className='m-3 md:mx-auto md:w-2/4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          Fire Department
        </p>
        <div className="flex justify-between mb-2">
        <p className="text-sm text-right text-gray-700 dark:text-gray-400">
          5:10 PM
        </p>
        <p className="text-sm text-right text-gray-700 dark:text-gray-400">
          1.7km away
        </p>
        </div>


        <div className="flex justify-between mb-2">
        <div>
        <Link
          to="/accept"
          className="inline-flex mr-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:animate-ping dark:focus:ring-green-800"
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

  )
}

export default Collaboration