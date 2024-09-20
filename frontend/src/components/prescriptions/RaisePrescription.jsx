import React from 'react'
import { useParams } from 'react-router-dom'

const RaisePrescription = ({ baseURL, usersList }) => {
    const {id} = useParams()
    
    const customer = usersList.filter(user => parseInt(user.id) === parseInt(id))[0]

  return (
    <>
        <br /><br /><br />
        <div className='text-center'>
            <h3>{customer.firstname} {customer.lastname}</h3>
            <p>{customer.email} | {customer.phone}</p>
        </div>
    </>
  )
}

export default RaisePrescription