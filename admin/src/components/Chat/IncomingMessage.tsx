import {motion } from 'framer-motion'

const IncomingMessage = (props: {message: string, by: string}) => {
  return (
    <>
        <motion.div initial={{x: -30, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 0.3}} className='flex justify-start items-center my-2'>
            <img className='w-10 h-10 rounded-full bg-gray-500' src="./profile.webp" />
            <div className='bg-blue-200 rounded-lg p-2 ml-2'>
                <p className='text-gray-700'>{props.message}</p>
            </div>
        </motion.div>
    </>
  )
}

export default IncomingMessage