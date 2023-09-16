import React from 'react'
import Record from './Record'

const Records = () => {
  return (
    <>
        <div className='bg-gray-950 rounded-lg p-4 mt-4 max-h-96 overflow-y-scroll'>
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
        </div>
    </>
  )
}

export default Records