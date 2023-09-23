import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function EditProductModal({ getAllProducts, productSlug, onClose }) {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [show, setShow] = useState(false);
  const loggedAdmin = useSelector((state) => state.admin);
  const [validated, setValidated] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [featured, setFeatured] = useState(false);

  const [product, setProduct] = useState('');

  const handleClose = () => {
    setShow(false);
    onClose();
  }
  const handleShow = () => setShow(true);

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
        setPrice(response.data.price);
        setStock(response.data.stock);
        return setFeatured(response.data.featured);
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
    getOneProduct();
    handleShow();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: 'PATCH',
        url: `${baseURL}/products/${productSlug}`,
        data: {name, description, price, stock, featured},
        headers: {
          Authorization: `Bearer ${loggedAdmin.token}`,
        },
      });
      toast.success(`${name} updated successfully!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setValidated(true);
      handleClose();
      setName('');
      setDescription('');
      setPrice(0);
      setStock(0);
      setFeatured(false);
      onClose();
      return getAllProducts();
    } catch (error) {
      console.log(error);
      return toast.error(`Could not update this product, try again`, {
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
      {product && (
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
                <Form.Group className="mb-3" controlId="featured">
                  <Form.Label className="fw-bold">Featured</Form.Label>
                  <Form.Check
                    name="featured"
                    onChange={(e) => setFeatured(!featured)}
                    value={featured}
                    checked={featured}
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
      )}
    </>
  );
}

export default EditProductModal;