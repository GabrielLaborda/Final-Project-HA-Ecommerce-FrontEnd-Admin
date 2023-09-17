import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddProductModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleSave = () => setShow(true);

    return (
    <>
        <button onClick={handleShow} className='ms-3 px-5 py-2 btn btn-outline-dark rounded-0'>Add new product</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='fw-bold'>New product name</Form.Label>
                        <Form.Control type='text' placeholder='product name' autoFocus/>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='fw-bold'>Slug</Form.Label>
                        <Form.Control type='text' placeholder='product slug'/>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='fw-bold'>Description</Form.Label>
                        <Form.Control type='text' placeholder='product description'/>
                    </Form.Group>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label className='fw-bold'>Pictures</Form.Label>
                        <Form.Control type="file" multiple />
                        </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='fw-bold'>Price</Form.Label>
                        <Form.Control type='number' placeholder='unit price'/>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='fw-bold'>Initial stock</Form.Label>
                        <Form.Control type='number' placeholder='quantity'/>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='fw-bold'>Category</Form.Label>
                        <Form.Select aria-label="category">
                            <option value="1">Completes</option>
                            <option value="2">Decks</option>
                            <option value="3">Trucks</option>
                            <option value="4">Wheels</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='fw-bold'>Featured</Form.Label>
                        <Form.Check 
                            type="switch"
                            id="featured"
                            label="Featured" />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose} className='ms-3 px-3 py-1 btn btn-outline-dark rounded-0'>Close</button>
                    <button type='submit' onClick={handleSave} className='ms-3 px-3 py-1 btn btn-dark rounded-0'>Save new product</button>
                </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProductModal;