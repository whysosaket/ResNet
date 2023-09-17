import {GoDotFill} from 'react-icons/go'

const TopBar = () => {
  return (
    <>
        <div className='bg-gray-950 p-2 px-4'>
            <div className='flex justify-between'>
                <div className='w-5/6'>
                    <h1 className='text-xl font-semibold'>RQ1344</h1>
                </div>
                <div className='w-1/6 flex justify-end'>
                <GoDotFill className={`my-auto ${Math.random()>0.44?"text-green-400":"text-red-400"}`} />
            </div>
            </div>
        </div>
    </>
  )
}

export default TopBar