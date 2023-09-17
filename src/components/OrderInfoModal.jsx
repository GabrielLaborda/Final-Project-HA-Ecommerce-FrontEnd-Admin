import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function OrderInfoModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleSave = () => setShow(true);

    return (
    <>
        <h7 role="button" href="" onClick={handleShow} className="text-secondary text-decoration-none">View info</h7>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order info</Modal.Title>
        </Modal.Header>
                <Modal.Body>
                    <h6 className='fw-bold'>Order tracking number</h6>
                    <p># id</p>
                    <h6 className='fw-bold'>Purchase date </h6>
                    <p>order.createdAt</p>
                    <h6 className='fw-bold'>Client</h6>
                    <div className='row'>
                        <div className="col-6">
                            <p>user.firstname + user.lastname</p>
                        </div>
                        <div className="col-3">
                            <p>user.address</p>
                        </div>
                        <div className="col-3">
                            <p>products.price</p>
                        </div>
                    </div>
                    <h6 className='fw-bold'>Bought products</h6>
                    <div className='row'>
                        <div className="col-6">
                            <p>products.name</p>
                        </div>
                        <div className="col-3">
                            <p>products.quantity</p>
                        </div>
                        <div className="col-3">
                            <p>products.price</p>
                        </div>
                    </div>
                <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='fw-bold'>Order Status</Form.Label>
                        <Form.Select aria-label="Status">
                            <option value="1">Processing Payment</option>
                            <option value="2">Paid</option>
                            <option value="3">Sent</option>
                            <option value="4">Delivered</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose} className='ms-3 px-3 py-1 btn btn-outline-dark rounded-0'>Close</button>
                    <button type='submit' onClick={handleSave} className='ms-3 px-3 py-1 btn btn-dark rounded-0'>Update order</button>
                </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrderInfoModal;