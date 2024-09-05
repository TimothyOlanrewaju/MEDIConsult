import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ResendActivation = ({ baseURL }) => {
    const [msg, setMsg] = useState("")
    const [email, setEmail] = useState('')

    const resendActivation = async(e)=>{
        e.preventDefault()
        await axios.post(`${baseURL}/auth/users/resend_activation/`, {email})
        setMsg('Check your email for confirmation link')
    }


  return (
    <>
        <div className="container-fluid about py-5">
            <div className="container py-5">
                <div className="row g-3 align-items">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <h4 style={{color:"green"}}>{msg}</h4>
                        <h5 className="section-about-title pe-3">Resend Activation Link</h5>
                        <div className="row gy-1 gx-4 mb-4">
                            <div className="col-sm-12">
                                <p className="mb-0">Email</p>
                                <input type='text' className='form-control'
                                    placeholder='Enter your email'
                                    value={email}
                                    onChange={e=>setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <button className="btn btn-primary rounded-pill py-3 px-5 mt-2" onClick={resendActivation} >
                            Send Activation Link
                        </button>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ResendActivation