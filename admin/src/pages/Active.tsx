import ActiveCard from '@/components/Active/ActiveCard'
import {motion} from 'framer-motion'

const Active = () => {
  return (
    <motion.div initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.5}} className=''>
        <div className='flex my-4'>
            <h1 className='font-bold mx-auto text-xl text-center'>Active Requests</h1>
        </div>
        <ActiveCard />
        <ActiveCard />
        <ActiveCard />
        <ActiveCard />
    </motion.div>
  )
}

export default Active