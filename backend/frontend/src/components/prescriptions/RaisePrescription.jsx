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
            <div className="container form-container">
              <form className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Prescription Name</label>
                  <input type="text" className="form-control" id="prescriptionName" placeholder="Enter prescription name"/>
                </div>
                    <label className="form-label">Dosage</label>
                <div className="d-flex mb-3">
                  <div className="d-flex">
                    <input type="number" className="form-control me-2" id="dosageAmount" placeholder="Mrn" min="1"/>
                    <span className="align-self-center">x</span>
                    <input type="number" className="form-control mx-2" id="timesPerDay" placeholder="Aft" min="1"/>
                    <span className="align-self-center">x</span>
                    <input type="number" className="form-control ms-2" id="days" placeholder="Night" min="1"/>
                  </div>
                  </div>
                <button type="submit" className="btn blue-btn w-100">Submit</button>
              </form>
            </div>
        </div>
    </>
  )
}

export default RaisePrescription