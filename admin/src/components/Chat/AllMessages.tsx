import { useEffect, useState } from 'react'
import IncomingMessage from './IncomingMessage'
import OutgoingMessage from './OutgoingMessage'
import GlobalContext from '@/context/Global/globalContext'
import { useContext } from 'react'

const AllMessages = () => {

  const {messages} = useContext(GlobalContext);

  useEffect(() => {
    console.log(messages);
  }, [messages])

  return (
    <>
        <div className="w-full px-4 flex flex-col justify-end align-bottom my-auto">
          {messages.map((message:any, index:number)=>{
            return (message.by=="Me")?<OutgoingMessage key={index} message={message.text} by="Me" />:<IncomingMessage key={index} message={message.text} by="Joh" />;
          })}
        </div>
    </>
  )
}

export default AllMessages