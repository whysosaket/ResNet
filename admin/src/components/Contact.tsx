import React from 'react'
import ContactCard from './ContactCard'

const Contact = () => {
  return (
    <>
        <div className=''>
                <h1 className='my-2 text-center font-bold text-2xl'>Contact</h1>
                <ContactCard agency_name="FIRE" />
                <ContactCard agency_name="MEDIC" />
                <ContactCard agency_name="FIRE" />
        </div>
    </>
  )
}

export default Contact