import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function AddProductModal({ getAllProducts }) {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [show, setShow] = useState(false);
  const loggedAdmin = useSelector((state) => state.admin);
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // GET CATEGORIES (form options)

  const [allCategories, setAllCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseURL}/categories`,
        headers: {
          Authorization: `Bearer ${loggedAdmin.token}`,
        },
      });
      setAllCategories(response.data);
    } catch (error) {
      console.log(error);
      toast.error(`Could not get this info, try again`, {
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
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // ADD NEW PRODUCT

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState(null);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [featured, setFeatured] = useState(false);
  const [category, setCategory] = useState('');

  const hanldeFilesPictures = (pictures) => {
    setPicture(pictures);
  };

  const handleSwitch = (event) => {
    setFeatured(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      await axios({
        method: 'POST',
        url: `${baseURL}/products`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${loggedAdmin.token}`,
        },
      });
      toast.success(`${name} added successfully!`, {
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
      setName('');
      setDescription('');
      setPicture([]);
      setPrice(0);
      setStock(0);
      setFeatured(false);
      return getAllProducts();
    } catch (error) {
      console.log(error);
      return toast.error(`Could not add new product, try again`, {
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
  };

  return (
    <>
      {allCategories && (
        <>
          <button onClick={handleShow} className="ms-3 px-5 py-2 btn btn-outline-dark rounded-0">
            Add new
          </button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add new product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="fw-bold">Name</Form.Label>
                  <Form.Control
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="product name"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label className="fw-bold">Description</Form.Label>
                  <Form.Control
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    type="text"
                    placeholder="product description"
                  />
                </Form.Group>
                <Form.Group controlId="picture" className="mb-3">
                  <Form.Label className="fw-bold">Pictures</Form.Label>
                  <Form.Control
                    name="picture"
                    onChange={(e) => hanldeFilesPictures(e.target.files)}
                    type="file"
                    multiple
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Label className="fw-bold">Price</Form.Label>
                  <Form.Control
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    type="number"
                    placeholder="unit price"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="stock">
                  <Form.Label className="fw-bold">Initial stock</Form.Label>
                  <Form.Control
                    name="stock"
                    onChange={(e) => setStock(e.target.value)}
                    value={stock}
                    type="number"
                    placeholder="quantity"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label className="fw-bold">Category</Form.Label>
                  <Form.Select
                    name="category"
                    aria-label="Status"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.currentTarget.value);
                    }}
                  >
                    <option>Select product category</option>
                    {allCategories.map((category) => (
                      <option value={category._id} key={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="featured">
                  <Form.Label className="fw-bold">Featured
                  <Form.Check
                    name="featured"
                    value={featured}
                    type="switch"
                    label="Featured"
                    onChange={(event) => handleSwitch(event)}
                  />
                  </Form.Label>
                </Form.Group>
                <hr />
                <button type="submit" className="ms-3 px-3 py-1 btn btn-dark rounded-0">
                  Save new product
                </button>
                <button
                  onClick={handleClose}
                  className="ms-3 px-3 py-1 btn btn-outline-dark rounded-0"
                >
                  Close
                </button>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
}

export default AddProductModal;
