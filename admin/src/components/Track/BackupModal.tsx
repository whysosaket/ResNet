import { motion } from 'framer-motion'

const BackupModal = (props: {closeModal: Function}) => {

  const unMount = () => {
    props.closeModal(false)
  }

  return (
    <>
         <motion.div className='cancel-modal w-screen h-screen bg-black bg-opacity-50 absolute top-0 z-50' onClick={unMount}>
            <div className='w-5/6 md:w-1/2 p-4 h-40 bg-white dark:bg-gray-950 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <h1 className='font-semibold text-xl text-center mx-4'>Are you sure want to cancel this request?</h1>
              <div className='flex justify-center mt-6'>
                <button className='bg-red-600 px-4 py-1 rounded-lg text-white'>Cancel Request</button>
                <button className='bg-gray-500 px-4 py-1 rounded-lg text-white ml-2' onClick={unMount}>Close</button>
              </div>
            </div>
          </motion.div>
    </>
  )
}

export default BackupModal