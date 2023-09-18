import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function EditAdminModal({adminId}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [oneAdmin, setOneAdmin] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  useEffect(() => {
    const getOneAdmin = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `${baseURL}/admins/${adminId}`,
        });
        setOneAdmin(response.data);
        setFirstname(response.data.firstname);
        setLastname(response.data.lastname);
        setEmail(response.data.email);
      } catch (error) {
        console.log(error);
      }
    }
      getOneAdmin();
  }, []);

  const handleSubmit = async (e) => {
    try {
      await axios({
        method: 'PATCH',
        url: `${baseURL}/admins/${adminId}`,
        data: { firstname, lastname, email, password }
      })
      setValidated(true);
      handleClose();
      setOneAdmin(null);
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  }

    return (
    <>
        <h6 role="button" onClick={handleShow} className="text-secondary text-decoration-none p-0 m-0">Edit</h6>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <h6 className='fw-bold'>Firstname</h6>
                <p>{firstname}</p>
                <h6 className='fw-bold'>Lastname</h6>
                <p>{lastname}</p>
                <Form validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label className='fw-bold'>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="password">
                        <Form.Label className='fw-bold'>New password</Form.Label>
                        <Form.Control type='password' placeholder='password'/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="passwordRepeat">
                        <Form.Label className='fw-bold'>Repeat new password</Form.Label>
                        <Form.Control type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
                      </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose} className='ms-3 px-3 py-1 btn btn-outline-dark rounded-0'>Close</button>
                    <button type='submit' onClick={() => handleSubmit(adminId._id,adminId.email, adminId.password)} className='ms-3 px-3 py-1 btn btn-dark rounded-0'>Save new employee</button>
                </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditAdminModal;