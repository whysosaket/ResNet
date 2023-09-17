import { useEffect, useState } from 'react'
import IncomingMessage from './IncomingMessage'
import OutgoingMessage from './OutgoingMessage'

const AllMessages = () => {

  return (
    <>
        <div className={`relative w-full px-4 flex flex-col justify-end`}>
            <IncomingMessage />
            <IncomingMessage />
            <OutgoingMessage />
            <OutgoingMessage />
            <OutgoingMessage />
            <OutgoingMessage />
            <IncomingMessage />
            <OutgoingMessage />
            <IncomingMessage />
            <IncomingMessage />
            <IncomingMessage />
            <IncomingMessage />
        </div>
    </>
  )
}

export default AllMessages