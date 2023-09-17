import AuthContext from "@/context/Auth/authContext"
import { useContext } from "react"


const ProfileCard = () => {

    const { agentInfo } = useContext(AuthContext);

  return (
    <div>
        <div className='bg-gray-950 rounded-lg p-4'>
            <div className='flex justify-between'>
            <div className='w-1/4'>
                <img src='https://picsum.photos/200' className='rounded-full md:w-24' />
            </div>
            <div className='w-3/4 ml-4 my-auto'>
                <h1 className='text-xl font-semibold'>{agentInfo.agentID}</h1>
                <p className='text-gray-400'>+91 {agentInfo.mobile}</p>
            </div>
            </div>
            <div className='flex justify-between mt-4'>
                <div className='w-1/2'>
                    <h1 className='text-gray-400'>Name</h1>
                    <p className='text-gray-400'>{agentInfo.name}</p>
                </div>
                <div className='w-1/2'>
                <h1 className='text-gray-400'>Agency</h1>
                <p className='text-gray-400'>{agentInfo.agency.substring(5)}</p>
                </div>
            </div>
            <div className='flex justify-between mt-4'>
                <div className='w-1/2'>
                <h1 className='text-gray-400'>Date Added</h1>
                <p className='text-gray-400'>{agentInfo.date.split("T")[0]}</p>
                </div>
                <div className='w-1/2'>
                <h1 className='text-gray-400'>Email</h1>
                <p className='text-gray-400'>
                <a href="mailto:saket2002@gmail.com"> {agentInfo.email}</a>
                </p>
                </div>
            </div>
            </div>
    </div>
  )
}

export default ProfileCard