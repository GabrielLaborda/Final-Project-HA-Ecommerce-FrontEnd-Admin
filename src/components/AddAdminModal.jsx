import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddAdminModal() {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async () => {
    try {
      console.log(firstname, lastname, email, password)
      await axios({
        method: "POST",
        url: `${baseURL}/admins`,
        data: { firstname, lastname, email, password },
      })
      setValidated(true);
      handleClose();
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      // Add toast!!
    }
    }

    return (
    <>
        <button onClick={handleShow} className='ms-3 px-5 py-2 btn btn-outline-dark rounded-0'>Add new employee</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form validated={validated} onSubmit={handleSubmit}>
                    <Form.Group
                        className="mb-3"
                        controlId="addAdminFirstname">
                        <Form.Label className='fw-bold'>First Name</Form.Label>
                        <Form.Control onChange={(e) => setFirstname(e.target.value)} value={firstname} type='text' placeholder='firstname' autoFocus/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="addAdminLastname">
                        <Form.Label className='fw-bold'>Last Name</Form.Label>
                        <Form.Control onChange={(e) => setLastname(e.target.value)} value={lastname} type='text' placeholder='lastname' />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="addAdminEmail">
                        <Form.Label className='fw-bold'>Email address</Form.Label>
                  <Form.Control onChange={(e) => setEmail(e.target.value)} value={email}
                            type="email"
                            placeholder="email"/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="addAdminPassword">
                        <Form.Label className='fw-bold'>Password</Form.Label>
                        <Form.Control onChange={(e) => setPassword(e.target.value)}  value={password} type='password' placeholder='password'/>
                  </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                  <button onClick={handleClose} className='ms-3 px-3 py-1 btn btn-outline-dark rounded-0'>Close</button>
                  <button onClick={handleSubmit} type='submit' className='ms-3 px-3 py-1 btn btn-dark rounded-0'>Save new employee</button>
                </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddAdminModal;