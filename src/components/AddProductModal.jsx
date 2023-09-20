import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

function AddProductModal() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [show, setShow] = useState(false);
  const loggedAdmin = useSelector((state) => state.admin);
  const [validated, setValidated] = useState(false);

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

  useEffect(() => {
    getAllCategories();
  }, []);

  // post new product data

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

  const handleSubmit = async () => {
    console.log(name);
    console.log(description);
    console.log(picture);
    console.log(price);
    console.log(stock);
    console.log(featured);
    console.log(category);

    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('picture', picture);
      formData.append('price', price);
      formData.append('stock', stock);
      formData.append('featured', featured);
      formData.append('category', category);

      await axios({
        method: 'POST',
        url: `${baseURL}/products`,
        data: formData,
        headers: {
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
          <button onClick={handleShow} className="ms-3 px-5 py-2 btn btn-outline-dark rounded-0">
            Add new product
          </button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add new product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="fw-bold">New product name</Form.Label>
                  <Form.Control
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="product name"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="fw-bold">Description</Form.Label>
                  <Form.Control
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    type="text"
                    placeholder="product description"
                  />
                </Form.Group>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label className="fw-bold">Pictures</Form.Label>
                  <Form.Control
                    onChange={(e) => hanldeFilesPictures(e.target.files)}
                    type="file"
                    multiple
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="fw-bold">Price</Form.Label>
                  <Form.Control
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    type="number"
                    placeholder="unit price"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="fw-bold">Initial stock</Form.Label>
                  <Form.Control
                    onChange={(e) => setStock(e.target.value)}
                    value={stock}
                    type="number"
                    placeholder="quantity"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="fw-bold">Category</Form.Label>
                  <Form.Select
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
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="fw-bold">Featured</Form.Label>
                  <Form.Check
                    onChange={(e) => setFeatured(!featured)}
                    value={featured}
                    type="switch"
                    id="featured"
                    label="Featured"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={handleClose}
                className="ms-3 px-3 py-1 btn btn-outline-dark rounded-0"
              >
                Close
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="ms-3 px-3 py-1 btn btn-dark rounded-0"
              >
                Save new product
              </button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}

export default AddProductModal;
