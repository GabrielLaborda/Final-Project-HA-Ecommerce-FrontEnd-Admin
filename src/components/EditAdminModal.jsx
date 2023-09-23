import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function EditAdminModal({adminId, getAllAdmin, onClose}) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const loggedAdmin = useSelector((state) => state.admin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [admin, setAdmin] = useState("");

  const handleClose = () => {
    setShow(false)
    onClose();
  };
  const handleShow = () => setShow(true);

  const getOneAdmin = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseURL}/admins/${adminId}`,
        headers:{
          Authorization: `Bearer ${loggedAdmin.token}`,
          }
      });
      setAdmin(response.data);
      setFirstname(response.data.firstname);
      setLastname(response.data.lastname);
      return setEmail(response.data.email);
    } catch (error) {
      console.log(error);
      return toast.error(`Could not get this info, try again`, {
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
      getOneAdmin();
      handleShow();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: 'PATCH',
        url: `${baseURL}/admins/${adminId}`,
        data: { firstname, lastname, email, password },
        headers:{
            Authorization: `Bearer ${loggedAdmin.token}`,
            }
      })
      toast.success(`${firstname + " " + lastname} updated successfully!`, {
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
      setAdmin(null);
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      return getAllAdmin();
    } catch (error) {
      console.log(error);
      return toast.error(`Could not update admin`, {
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
      {admin &&
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <h6 className='fw-bold'>Firstname</h6>
                <p>{firstname}</p>
                <h6 className='fw-bold'>Lastname</h6>
                <p>{lastname}</p>
                <Form validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className='fw-bold'>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder={email}
                        name='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3">
                        <Form.Label className='fw-bold'>New password</Form.Label>
                        <Form.Control type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} name='password' id='password'/>
                      </Form.Group>
                      <hr />
                      <button onClick={handleClose} className='ms-3 px-3 py-1 btn btn-outline-dark rounded-0'>Close</button>
                    <button type='submit' className='ms-3 px-3 py-1 btn btn-dark rounded-0'>Save Changes</button>
                </Form>
                </Modal.Body>
      </Modal>
      }
    </>
  );
}

export default EditAdminModal;