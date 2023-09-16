import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const sampleData = [
    {
        time: "12:00",
        message: "backup request sent"
    },
    {
        time: "12:02",
        message: "backup request confirmed"
    },
    {
        time: "12:05",
        message: "backup dispatched"
    }
]

const Realtimeupdates = () => {

    const [data, setData] = useState(sampleData);

    useEffect(() => {
        const interval = setInterval(() => {
            setData(data => [...data, {
                time: "12:10",
                message: "backup arrived"
            }])
            if(data.length > 10) setData(data => data.slice(1));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

  return (
    <>
    <h1 className='text-sm my-3 text-center font-semibold'>Realtime Updates</h1>
    <div className='px-12 md:px-36 mx-auto h-60 overflow-y-scroll py-3'>
        <div className='flex flex-col mx-auto'>
            {data.map((item, index) => {
                return <div key={index}>{messageFormat(item.time, item.message)}</div>
            })}
        </div>

    </div>
    </>
  )
}

const messageFormat = (time: string, message: string) => {
    return (
        <motion.div 
        initial={{ x: -10 , opacity: 0}}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }} 
        className='font-semibold text-xs rounded-md'>
            <span className='flex'>
            <p className='text-gray-500 my-auto'>{time}: </p>
            <p className='text-gray-400 my-auto'>&nbsp; {message}</p>
            </span>
        </motion.div>
    )
}

export default Realtimeupdates