import Collaborations from '@/components/Collaborations'
import Contact from '@/components/Contact'
import Request from '@/components/Request'
import {motion} from 'framer-motion'
import { useEffect, useState } from 'react'

const Home = () => {

  const [showLogo, setShowLogo] = useState<boolean>(true);

  useEffect(()=>{
    setTimeout(()=>{
      setShowLogo(false);
    }, 3300);
  }, []);


  return (
    <div className=''>
      {showLogo&&<motion.div initial={{y:100}} animate={{y: -100, opacity: 0}} transition={{delay: 3, duration: 0.3}}>
      {<motion.img initial={{x: 100, opacity: 0}} animate={{x: 0, opacity: 1}} exit={{x: 1000}} transition={{delay: 0, duration: 1}} src="./admin-logo.svg" alt="Your Company" className='my-4 mt-8 w-3/4 md:w-1/3 mx-auto' />}
      {<motion.h1 initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1}} exit={{x: 1000}} transition={{delay: 0, duration: 1}} className='my-2 text-center font-bold text-4xl'>WELCOME</motion.h1>}
      </motion.div>}
      <motion.div initial={{y: 2000}} animate={{y: 0}} transition={{delay: 3.3, duration: 0.3}}>
      <h1 className='my-2 text-center font-bold text-2xl'>Request</h1>
      <Request />
      <Collaborations />
      <Contact />
      </motion.div>
    </div>
  )
}

export default Home