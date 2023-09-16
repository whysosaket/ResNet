import Realtimeupdates from "@/components/Active/Realtimeupdates";
import Map from "@/components/Track/Map";
import { useState } from "react";
import { motion } from "framer-motion";
import BackupModal from "@/components/Track/BackupModal";
import CancelModal from "@/components/Track/CancelModal";
import TestMap from "@/components/Track/TestMap";

const buttonStyle = 'mx-2 text-white font-semibold py-2 px-3 rounded-md';

const Track = () => {
  const [request, setRequest] = useState<any[]>([""]);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState<boolean>(false);
  const [isCanelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);

  return (
    <>
    {isBackupModalOpen&&<BackupModal closeModal={setIsBackupModalOpen} />}
    {isCanelModalOpen&&<CancelModal closeModal={setIsCancelModalOpen} />}
    <motion.div initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.5}} className="py-4">
      <h1 className="font-bold mx-auto text-xl text-center">
        Realtime Tracking
      </h1>
      {(!isBackupModalOpen&&!isCanelModalOpen)&&<TestMap />}
      {/* <Map /> */}
      <div className="m-3 md:mx-24 px-6 py-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between">
          {request.length <= 0 && (
            <h1 className="font-semibold">No Active Requests</h1>
          )}
          {request.length > 0 && (
            <h1 className="font-semibold">Active Requests</h1>
          )}
          {
            <svg
              className="w-5 h-5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          }
        </div>
        {request.length > 0&&<div className="">
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Fire, Ambulance, Police
          </p>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-right text-gray-700 dark:text-gray-400">
              5:12 PM
            </p>
            <p className="text-sm text-right text-gray-700 dark:text-gray-400">
              2.5km away
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-xs font-semibold">ETA: 12:34</p>
          </div>
        </div>}
      </div>

      {<div className='px-4 flex justify-center'>
            <button className={`${buttonStyle} bg-blue-700 hover:bg-blue-900`} onClick={()=> setIsBackupModalOpen(true)}>
                Backup
            </button>
            <button className={`${buttonStyle} bg-red-600 hover:bg-red-800`} onClick={()=> setIsCancelModalOpen(true)}>
                Cancel
            </button>
      </div>}

      {request.length > 0&&<Realtimeupdates />}
    </motion.div>
    </>
  );
};

export default Track;
