import AgenciesCard from '@/components/Agency/AgencyCard'
import {useState} from 'react'
import {motion} from 'framer-motion'

const membersSample = [ {name: "Shiv", userid: "FF0881"}, {name: "Kumar", userid: "FK0101"}, {name: "Rahul", userid: "FF0101"}, {name: "Shakib", userid: "HG8172"}, {name: "Roman", userid: "KJ9129"} ]

const Agencies = () => {

  const [members, setMembers] = useState<any[]>(membersSample);



  return (
    <div className='w-full md:px-6'>
      <h1 className='my-2 text-center font-bold text-2xl'>Agencies</h1>
      {members.map((member, index)=>{
        return <AgenciesCard key={index} delay={index} name={member.name} userid={member.userid} />
      })}
    </div>
  )
}

export default Agencies