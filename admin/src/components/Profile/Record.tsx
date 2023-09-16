import React from 'react'

const Record = () => {
  return (
    <>
        <div className='m-3 md:mx-auto md:w-5/6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex justify-between'>
                <p className='font-semibold text-sm'>RQ9912</p>
                <p className='font-semibold text-xs text-gray-400'>01/01/2021</p>
            </div>
            <div className='flex justify-between mt-1'>
                <p className='text-xs text-gray-500'>Fire, Medic</p>
                <p className='text-xs text-gray-600'>01:00</p>
            </div>
        </div>
    </>
  )
}

export default Record