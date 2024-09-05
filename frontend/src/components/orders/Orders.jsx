import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../AxiosInstance";
import Table from 'react-bootstrap/Table';

export default function Orders({ baseURL }) {
  const [data, setData] = useState([])
  const navigate = useNavigate()

  if(localStorage.getItem('access_token') === null){                            
      navigate('/login')
  } 
  const userId = localStorage.getItem('user_id')

  const fetchOrders = async()=>{
    const res = await api.get(`${baseURL}/orders/`)
    if (res.data){
      const filteredOrders = res.data.filter((order)=>order.customer === parseInt(userId))
      setData(filteredOrders)
    }
    
  }

  useEffect(()=>{
    fetchOrders()
  },[])

 return (
    <>
      <br /><br /><br /><br />
      { data.length <= 0 ? 
      <>
        <div className='container'>
        <h2>My Orders  
          <span style={{fontSize:"small"}}>
            ({data.length} {data.length > 1 ? "Orders" : "order"})
          </span>
        </h2>
          <div className='table-responsive'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>Discount</th>
                  <th>VAT</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map(order=>(
                  <>
                    <tr key={order.id}>
                      <td>
                        <div className='d-flex align-orders-center'>
                            <Link to={ `/order_detail/${order.id}`}>
                              <div className='ms-3'>
                                <p className='fw-bold mb-1'>{order.id}</p>
                              </div>
                            </Link>
                        </div>
                      </td>
                      <td>{order.order_date.split('T')[0]}</td>
                      <td>N{new Intl.NumberFormat().format(order.discount)}.00</td>
                      <td>N{new Intl.NumberFormat().format(order.VAT)}.00</td>
                      <td>{ order.processing ? 'Processing' : 'Pending' }</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      
      </> : <h3 className="text-center"> There is no matching record to display</h3>
    }
    </>
  );
}
