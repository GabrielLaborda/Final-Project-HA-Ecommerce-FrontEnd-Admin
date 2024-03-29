import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import OrderInfoModal from './OrderInfoModal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function OrdersMainSection() {

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [allOrders, setAllOrders] = useState([]);
  const [activeOrderId, setActiveOrderId] = useState(null);
  const loggedAdmin = useSelector((state) => state.admin);
  const handleAxiosModal = (orderId) => setActiveOrderId(orderId);

  const getAllOrders = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseURL}/orders`,
        headers: {
          Authorization: `Bearer ${loggedAdmin.token}`,
        }
      });
      return setAllOrders(response.data);
    } catch (error) {
      console.log(error);
      return toast.error(`Could not get orders list`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  useEffect(() => {
    getAllOrders();
  },[]);

  return (
    <>
      {allOrders.length > 0 && (<div className="row g-0 w-75">
          <div className='m-0'>
          <div className="col-12 p-0">
            <div className="container my-4 py-4">
              <div className='card'>
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                    <h6 className="text-white text-capitalize fs-5 ps-5">CURRENT ORDERS</h6>
                  </div>
                </div>
                <div className="card-body px-5 pb-2 bg-light">
                  <div className="table p-1">
                    <table className="table align-items-center mb-2 table-light">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Order #</th>
                          <th className="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Client</th>
                          <th className="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                          <th className="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Total price</th>
                          <th className="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">check details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allOrders.map((order) => (
                          <tr key={order._id}>
                            <td className="align-middle text-start text-sm">
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{order._id}</h6>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle text-start text-sm">
                              {order.user &&
                              (<p className="text-xs font-weight-bold mb-0">{order.user.firstname} {order.user.lastname}</p>)
                              }
                            </td>
                            <td className="align-middle text-start">
                              <span className="text-secondary text-xs font-weight-bold">{order.status.status} </span>
                            </td>
                            <td className="align-middle text-start text-sm">
                              <span href="" className="text-secondary text-decoration-none">
                                USD {order.subtotal.toFixed(2)}
                              </span>
                            </td>
                            <td className="align-middle text-start text-sm">
                              {order._id === activeOrderId && (
                                <OrderInfoModal 
                                orderId={order} 
                                key={order._id} 
                                onClose={()=> setActiveOrderId(null)}
                                getAllOrders={getAllOrders}
                                />
                              )}
                              <p onClick={()=>handleAxiosModal(order._id)} role='button' className='text-decoration-underline p-0 m-0'>View info</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>
        </div>)}
    </>
  )
}

export default OrdersMainSection