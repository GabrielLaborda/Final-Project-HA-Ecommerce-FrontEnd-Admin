import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

function OrderInfoModal({orderId, getAllOrders}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
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
            setBoughtDate(response.data.createdAt);
        } catch (error) {
            console.log(error);
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
            setAllOrderStatus(response.data);
        } catch (error) {
            console.log(error);
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
        setValidated(true);
        setStatus({});
        handleClose();
        getAllOrders();
        } catch (error) {
        console.log(error);
        }
        }

    return (
        <>
            { user && (<>
                {/* <h6 role="button" href="" onClick={handleShow} className="text-secondary text-decoration-none">View info</h6> */}
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
                    <div className='row'>
                        <div className="col-6">
                            <p>{user.firstname} {user.lastname}</p>
                        </div>
                        <div className="col-3">
                            <p>{user.address}</p>
                        </div>
                        <div className="col-3">
                            <p>USD {Math.round(subtotal) }</p>
                        </div>
                    </div>
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
                            <Form.Select aria-label="Status" value={status} onChange={(e) => {setStatus(e.currentTarget.value)
                            }}>
                                <option>Select new Order Status</option>
                                {allOrderStatus.map((orderStatus) => (
                                <option key={orderStatus._id} value={orderStatus._id} >{orderStatus.status}
                                </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose} className='ms-3 px-3 py-1 btn btn-outline-dark rounded-0'>Close</button>
                    <button type='submit' onClick={handleSubmit} className='ms-3 px-3 py-1 btn btn-dark rounded-0'>Update order</button>
                </Modal.Footer>
                </Modal>
            </>)}
    </>
  );
}

export default OrderInfoModal;