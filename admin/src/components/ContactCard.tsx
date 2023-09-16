import React from "react";

const ContactCard = (props: {agency_name: string}) => {
  return (
    <>
      <div className='m-3 md:mx-auto md:w-2/4 px-6 py-3 flex justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <h1 className="font-bold">{props.agency_name}</h1>
        <svg
          className="w-5 h-5 ml-2"
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
      </div>
    </>
  );
};

export default ContactCard;
