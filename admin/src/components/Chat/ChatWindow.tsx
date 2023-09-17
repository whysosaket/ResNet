import TopBar from './TopBar'
import AllMessages from './AllMessages'
import SendMessage from './SendMessage'

const ChatWindow = () => {
  return (
    <div className='w-full bg-black bg-opacity-40'>
        <TopBar />
        <div className='overflow-y-scroll h-[32rem] md:h-[32rem]'>
            <AllMessages />
        </div>
        <SendMessage />
    </div>
  )
}

export default ChatWindow