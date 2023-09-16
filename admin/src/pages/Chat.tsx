import ChatWindow from '@/components/Chat/ChatWindow'
import {motion} from 'framer-motion'

const Chat = () => {
  return (
    <motion.div initial={{y: 30}} animate={{y: 0}} transition={{duration: 0.4}}>
        <ChatWindow />
    </motion.div>
  )
}

export default Chat