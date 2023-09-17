import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function EditAdminModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleSave = () => setShow(true);

    return (
    <>
        <h6 role="button" onClick={handleShow} className="text-secondary text-decoration-none p-0 m-0">Edit</h6>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='fw-bold'>First Name</Form.Label>
                        <Form.Control type='text' placeholder='firstname' autoFocus/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='fw-bold'>Last Name</Form.Label>
                        <Form.Control type='text' placeholder='lastname' />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className='fw-bold'>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="email"/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='fw-bold'>Password</Form.Label>
                        <Form.Control type='password' placeholder='password'/>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose} className='ms-3 px-3 py-1 btn btn-outline-dark rounded-0'>Close</button>
                    <button type='submit' onClick={handleSave} className='ms-3 px-3 py-1 btn btn-dark rounded-0'>Save new employee</button>
                </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditAdminModal;