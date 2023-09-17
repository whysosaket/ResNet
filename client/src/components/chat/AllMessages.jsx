import { useContext } from 'react'
import IncomingMessage from './IncomingMessage'
import OutgoingMessage from './OutgoingMessage'
import GlobalContext from '../../context/globalContext'

const AllMessages = () => {

    const {messages} = useContext(GlobalContext);

  return (
    <>
        <div className={`relative w-full px-4 flex flex-col justify-end`}>
            {messages.map((message, index) => {
               return (
               <div key={index}>
                <OutgoingMessage message={message.message} /> 
                <IncomingMessage message={message.reply} />
               </div>)
            })}
        </div>
    </>
  )
}

export default AllMessages