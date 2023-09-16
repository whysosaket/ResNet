import React from 'react'

const ActiveCard = () => {
  return (
    <>
    <div className='m-3 md:mx-auto max-w-sm md:max-w-max md:w-2/4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <img className="w-full mb-2 mx-auto" src="https://etimg.etb2bimg.com/photo/89133443.cms" />
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
    </div>    
    {/* <hr className="m-2 w-3/4 mx-auto border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" /> */}
    </>
  )
}

export default ActiveCard