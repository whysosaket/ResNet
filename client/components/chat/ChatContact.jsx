import {GoDotFill} from 'react-icons/go'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'

const ChatContact = (props) => {
  return (
    <>
        <motion.div initial={{x: -20, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{delay: (0.5+props.delay/5.0)}} className='mx-3 my-1 md:mx-auto md:w-2/4 px-6 py-3 flex justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <Link to="/chat" className='w-5/6'>
                <p className='font-semibold text-sm'>{props.userid}</p>
                <p className='font-semibold text-xs text-gray-400'>{props.agency}</p>
                <div className='flex justify-between'>
                    <p className='text-xs text-gray-500'>{props.lastmessage}</p>
                    <p className='text-xs text-gray-600'>{props.time}</p>
                </div>
            </Link>
            <div className='w-1/6 flex justify-end'>
                <GoDotFill className={`my-auto ${props.active?"text-green-400":"text-red-400"}`} />
            </div>
        </motion.div>
    </>
  )
}

export default ChatContact