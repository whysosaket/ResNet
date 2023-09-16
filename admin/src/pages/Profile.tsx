import ProfileCard from '@/components/Profile/ProfileCard'
import Records from '@/components/Profile/Records'
import {motion} from 'framer-motion'

const Profile = () => {
  return (
    <>
        <motion.div initial={{y: 40, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.5}} className='p-4 md:px-40'>
            <ProfileCard />
            <h1 className='mt-4 text-center font-bold text-2xl'>Past Records</h1>
            <Records />
        </motion.div>
    </>
  )
}

export default Profile