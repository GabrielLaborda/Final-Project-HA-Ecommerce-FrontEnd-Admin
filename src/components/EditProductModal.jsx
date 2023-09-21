import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

function EditProductModal({ getAllProducts, productSlug }) {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [show, setShow] = useState(false);
  const loggedAdmin = useSelector((state) => state.admin);
  const [validated, setValidated] = useState(false);

  const [product, setProduct] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // get category options (form options)

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
    }
  };

    const getOneProduct = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `${baseURL}/products/${productSlug}`,
          headers:{
            Authorization: `Bearer ${loggedAdmin.token}`,
            }
        });
        setProduct(response.data); 
        setName(response.data.name);
        setDescription(response.data.description);
        setPicture(response.data.picture);
        setPrice(response.data.price);
        setStock(response.data.stock);
        setFeatured(response.data.featured);
        setCategory(response.data.category);
      } catch (error) {
        console.log(error);
      }
    }

  useEffect(() => {
    getAllCategories();
    getOneProduct();
    handleShow();
  }, []);

  // post new product data

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [picture, setPicture] = useState(null);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [featured, setFeatured] = useState(false);
  const [category, setCategory] = useState(null);

  const hanldeFilesPictures = (pictures) => {
    setPicture(pictures);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      await axios({
        method: 'PATCH',
        url: `${baseURL}/products/${productSlug}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${loggedAdmin.token}`,
        },
      });
      setValidated(true);
      handleClose();
      setName('');
      setDescription('');
      setPicture([]);
      setPrice(0);
      setStock(0);
      setFeatured(false);
      setHandleSubmitListener(prevState => !prevState);
      getAllProducts();
    } catch (error) {
      console.log(error);
      window.alert('Error: ' + error);
      // add Toast!!
    }
  };

  return (
    <>
      {allCategories && (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="fw-bold">New product name</Form.Label>
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
                  <Form.Label className="fw-bold">Featured</Form.Label>
                  <Form.Check
                    name="featured"
                    onChange={(e) => setFeatured(!featured)}
                    value={featured}
                    type="switch"
                    label="Featured"
                  />
                </Form.Group>
                <hr />
                <button type="submit" className="ms-3 px-3 py-1 btn btn-dark rounded-0">
                  Save changes
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

export default EditProductModal;
