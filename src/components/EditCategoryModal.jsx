import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

function EditCategoryModal({ categorySlug, getAllCategories, onClose }) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const loggedAdmin = useSelector((state) => state.admin);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState('');

  const handleClose = () => {
    setShow(false);
    onClose();
  }
  const handleShow = () => setShow(true);

  const getOneCategory = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${baseURL}/categories/${categorySlug}`,
        headers: {
          Authorization: `Bearer ${loggedAdmin.token}`,
        },
      });
      setCategory(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOneCategory();
    handleShow();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: "PATCH",
        url: `${baseURL}/categories/${categorySlug}`,
        data: { name, description },
        headers: {
          Authorization: `Bearer ${loggedAdmin.token}`,
        },
      });
      setValidated(false);
      handleClose();
      setCategory(null);
      setName("");
      setDescription("");
      getAllCategories();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    {category &&
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={name}
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="description"
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                id="description"
                value={description}
              />
            </Form.Group>
            <hr />
            <button
              onClick={handleClose}
              className="ms-3 px-3 py-1 btn btn-outline-dark rounded-0"
            >
              Close
            </button>
            <button
              type="submit"
              className="ms-3 px-3 py-1 btn btn-dark rounded-0"
            >
              Save Changes
            </button>
          </Form>
        </Modal.Body>
      </Modal>
      }
    </>
  );
}

export default EditCategoryModal;
