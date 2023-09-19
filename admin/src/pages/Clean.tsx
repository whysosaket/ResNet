import React from 'react'
import GlobalContext from '@/context/Global/globalContext'

const Clean = () => {
    const globalContext = React.useContext(GlobalContext)
    const {notify, sendMessage, messages, setMessages} = globalContext
    const cleanMessages = () => {
        setMessages([])
    }
  return (
    <div><button onClick={cleanMessages}></button></div>
  )
}

export default Clean