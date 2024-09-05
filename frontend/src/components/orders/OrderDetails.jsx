import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = ({ baseURL }) => {
    const [ordeDetails, setOrderDetails] = useState([])
    const accessToken = localStorage.getItem('access_token')
    const {id} = useParams()

    const fetchOrderDetails = async()=>{
    const res = await axios.get(`${baseURL}/orders/order_details/${id}/`,{
        headers:{"Authorization":`FRISKY ${accessToken}`}
    })
    setOrderDetails(res.data)
  }

  useEffect(()=>{
    fetchOrderDetails()
  },[])

  return (
    <> <br /><br /><br /><br />
        <div className='container text-center'>
            <h3>Order ID: {id}</h3>
            {ordeDetails.map((detail)=>(
                <div className='container' key={detail.id}>
                    <p>{detail.item}</p>
                </div>
            ))}
        </div>
    </>
  )
}

export default OrderDetails