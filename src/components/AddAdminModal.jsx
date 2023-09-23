import axios from 'axios';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


function AddAdminModal({ getAllAdmin }) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const loggedAdmin = useSelector((state) => state.admin);
  
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  // ADD NEW ADMIN

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: "POST",
        url: `${baseURL}/admins`,
        data: { firstname, lastname, email, password },
        headers:{
            Authorization: `Bearer ${loggedAdmin.token}`,
            }
      })
      toast.success(`${firstname + " " + lastname} created successfully!`, {
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
      handleClose();
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      return getAllAdmin();
    } catch (error) {
      return toast.error('could not store admin', {
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
                  <button onClick={handleClose} className='ms-3 px-3 py-1 btn btn-outline-dark rounded-0'>Close</button>
                  <button type='submit' className='ms-3 px-3 py-1 btn btn-dark rounded-0'>Save new employee</button>
            </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddAdminModal;