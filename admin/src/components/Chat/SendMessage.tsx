import React from 'react'
import {IoSend} from 'react-icons/io5'
import {BsFillMicFill} from 'react-icons/bs'

const SendMessage = () => {

    const [text, setText] = React.useState('');

    const handleChange = (event: any) => {
        setText(event.target.value);
    }


  return (
    <>
        <div className='w-full p-2 absolute bottom-2 flex justify-betwee'>
            <input value={text} onChange={handleChange} type='text' placeholder='Send Message' className='w-5/6 rounded-3xl border py-2 px-4 bg-gray-950 bg-opacity-70 border-gray-900' />
            <div className='w-1/6 flex justify-end ml-2'>
                <div className='bg-gray-900 p-2 rounded-full select-none hover:animate-ping'>
                {text.length>0?<button className='text-white p-2 rounded-full'><IoSend size={30} /></button>:
                <button className='text-white p-2 rounded-full'><BsFillMicFill size={30} /></button>}
                </div>
            </div>  
        </div>
    </>
  )
}

export default SendMessage