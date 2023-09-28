import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function OrderInfoModal({orderId, getAllOrders, onClose}) {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        onClose();
    };
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const [oneOrder, setOneOrder] = useState(null);
    const loggedAdmin = useSelector((state) => state.admin);

    // get order info
    
    const [allOrderStatus, setAllOrderStatus] = useState([]);
    const [user, setUser] = useState("");
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState({});
    const [subtotal, setSubtotal] = useState("");
    const [boughtDate, setBoughtDate] = useState("");


    useEffect(() => {
        
        const getOneOrder = async () => {
        try {
            const response = await axios({
            method: 'GET',
            url: `${baseURL}/orders/${orderId._id}`,
            headers:{
            Authorization: `Bearer ${loggedAdmin.token}`,
            },
            });
            handleShow()
            setOneOrder(response.data);
            setUser(response.data.user);
            setProducts(response.data.products);
            setStatus(response.data.status);
            setSubtotal(response.data.subtotal);
            return setBoughtDate(response.data.createdAt);
        } catch (error) {
            console.log(error);
            return toast.error(`Could not update order`, {
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
        getOneOrder();
    },[]);

    // get order status (form options)

    useEffect(() => {
        const getAllOrderStatus = async () => {
        try {
            const response = await axios({
            method: 'GET',
            url: `${baseURL}/orderstatus`,
            headers: {
            Authorization: `Bearer ${loggedAdmin.token}`,
            },
            });
            return setAllOrderStatus(response.data);
        } catch (error) {
            return console.log(error);
        }
        }
    getAllOrderStatus();
    }, []);



    // update order

    const handleSubmit = async (event) => {
        event.preventDefault();
    try {
      await axios({
        method: 'PATCH',
        url: `${baseURL}/orders/${orderId._id}`,
        headers: {
        Authorization: `Bearer ${loggedAdmin.token}`,
        },
        data: { status: status }
      })
        toast.success(`order status updated successfully!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setValidated(false);
        setStatus({});
        handleClose();
        onClose();
        return getAllOrders();
        } catch (error) {
        console.log(error);
        return toast.error(`Could not update order status, try again`, {
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

    return (
        <>
            { user && (<>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order info</Modal.Title>
        </Modal.Header>
                <Modal.Body>
                    <h6 className='fw-bold'>Order tracking number</h6>
                    <p>{orderId._id }</p>
                    <h6 className='fw-bold'>Purchase date </h6>
                    <p>{new Date(boughtDate).toLocaleDateString()}</p>
                    <h6 className='fw-bold'>Client</h6>
                    <p>{user.firstname} {user.lastname}</p>
                    <h6 className='fw-bold'>Delivery Address</h6>
                    <p>{user.address}</p>
                    <h6 className='fw-bold'>Order Amount</h6>
                    <p>USD {orderId.subtotal.toFixed(2)}</p>
                    <h6 className='fw-bold'>Bought products</h6>
                        {products && products.map((product) => (
                    <div key={product._id} className='row'>
                            <div className='d-flex'> 
                        <div className="col-8">
                            <p className='fs-6'>{product.name}</p>
                        </div>
                        <div className="col-2">
                            <p>{product.quantity} u.</p>
                        </div>
                        <div className="col-2">
                            <p>USD {product.price}</p>
                        </div>
                        </div>
                    </div> ))}
                        
                    <Form validated={validated} onSubmit={handleSubmit}>
                        <Form.Group
                        className="mb-3"
                        controlId="orderStatus">
                            <Form.Label className='fw-bold'>Order Status</Form.Label>
                            <Form.Select aria-label="Status" id='orderStatus' value={status} onChange={(e) => {setStatus(e.currentTarget.value)
                            }}>
                                <option>Select new Order Status</option>
                                {allOrderStatus.map((orderStatus) => (
                                <option key={orderStatus._id} value={orderStatus._id} >{orderStatus.status}
                                </option>
                                ))}
                            </Form.Select>
                            </Form.Group>
                            <hr />
                    <button onClick={handleClose} className='ms-3 px-3 py-1 btn btn-outline-dark rounded-0'>Close</button>
                    <button type='submit' className='ms-3 px-3 py-1 btn btn-dark rounded-0'>Update order</button>
                    </Form>
                </Modal.Body>
                </Modal>
            </>)}
    </>
  );
}

export default OrderInfoModal;