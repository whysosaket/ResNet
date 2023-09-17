import superheroes from "superheroes";
import {BsFillChatFill} from 'react-icons/bs'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'

const AgencyCard = (props:{delay: number, name: string, userid: string, contact: string, category: string, location: []}) => {
  return (
    <>

<motion.div initial={{x: -20, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{delay: (0.5+props.delay/3.0)}} className="m-3 md:mx-auto max-w-sm md:w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link to="/chat" className='flex'>
            <div className='w-1/4'>
                <img
                className="w-8 h-8 rounded-full"
                src={`https://avatars.dicebear.com/api/micah/${superheroes.random()}.svg`}
                alt="user photo"
              />
            </div>
            <div className='w-2/4'>
                <h5 className="text-md font-bold flex tracking-tight text-gray-900 dark:text-white">
                {props.name}
                </h5>
                <p className="font-normal text-xs text-gray-700 dark:text-gray-400">
                {props.userid}
                </p>
                <p className="font-normal text-xs text-gray-700 dark:text-gray-400">
                {props.contact}
                </p>
                <p className="font-semibold text-xs text-gray-700 dark:text-gray-100">
                {props.category}
                </p>
            </div>
            <div className='w-1/4 flex justify-end'>
                <BsFillChatFill size={30} className='my-auto' />
            </div>
        </Link>
    </motion.div>   
    </>
  )
}

export default AgencyCard