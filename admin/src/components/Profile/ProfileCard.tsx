import React from 'react'

const ProfileCard = () => {
  return (
    <div>
        <div className='bg-gray-950 rounded-lg p-4'>
            <div className='flex justify-between'>
            <div className='w-1/4'>
                <img src='https://picsum.photos/200' className='rounded-full md:w-24' />
            </div>
            <div className='w-3/4 ml-4 my-auto'>
                <h1 className='text-xl font-semibold'>RQ1344</h1>
                <p className='text-gray-400'>+91 9876543210</p>
            </div>
            </div>
            <div className='flex justify-between mt-4'>
                <div className='w-1/2'>
                    <h1 className='text-gray-400'>Name</h1>
                    <p className='text-gray-400'>Saket Kumar</p>
                </div>
                <div className='w-1/2'>
                <h1 className='text-gray-400'>Location</h1>
                <p className='text-gray-400'>Delhi, India</p>
                </div>
            </div>
            <div className='flex justify-between mt-4'>
                <div className='w-1/2'>
                <h1 className='text-gray-400'>Date of Birth</h1>
                <p className='text-gray-400'>12/12/2002</p>
                </div>
                <div className='w-1/2'>
                <h1 className='text-gray-400'>Email</h1>
                <p className='text-gray-400'>
                <a href="mailto:saket2002@gmail.com"> email.example.com</a>
                </p>
                </div>
            </div>
            </div>
    </div>
  )
}

export default ProfileCard