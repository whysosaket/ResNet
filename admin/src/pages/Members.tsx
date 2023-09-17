import MemberCard from '@/components/Members/MemberCard'
import {useContext, useEffect, useState} from 'react'
import AuthContext from '@/context/Auth/authContext'

const membersSample = [ {name: "Shiv", userid: "FF0881"}, {name: "Kumar", userid: "FK0101"}, {name: "Rahul", userid: "FF0101"}, {name: "Shakib", userid: "HG8172"}, {name: "Roman", userid: "KJ9129"} ]

const Members = () => {

  const {agents, getMembers} = useContext(AuthContext);


  useEffect(()=>{
    getMembers();
  }, [])


  return (
    <div className='w-full md:px-6'>
      <h1 className='my-2 text-center font-bold text-2xl'>Members</h1>
      {agents.map((member:any, index:number)=>{
        return <MemberCard key={index} delay={index} name={member.name} userid={member.agentID} />
      })}
    </div>
  )
}

export default Members