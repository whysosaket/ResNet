import React from 'react'
import { Link } from 'react-router-dom'


const Success = () => {
  return (
    <>
    <div className="grid h-screen place-items-center">
      <div className="p-6 md:mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto my-6 h-16 w-16 text-green-600"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2Zm0 1.5a8.5 8.5 0 1 0 0 17a8.5 8.5 0 0 0 0-17Zm-1.25 9.94l4.47-4.47a.75.75 0 0 1 1.133.976l-.073.084l-5 5a.75.75 0 0 1-.976.073l-.084-.073l-2.5-2.5a.75.75 0 0 1 .976-1.133l.084.073l1.97 1.97l4.47-4.47l-4.47 4.47Z"
          />
        </svg>
        <div className="text-center">
          <h3 className="text-center text-base font-bold md:text-2xl">
            Informed successfully!
          </h3>
          <p className="text-muted-foreground my-2">
            We have informed the required agency, they will be reaching anytime
            soon.
          </p>

          <div className="space-x-3 py-10 text-center">
            <Link to="/" className="">
              Go back
            </Link>
            <Link
              to="/chat"
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Success