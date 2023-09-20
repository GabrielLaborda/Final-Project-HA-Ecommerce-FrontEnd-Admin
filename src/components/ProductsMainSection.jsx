import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddProductModal from './AddProductModal';
import { useSelector } from 'react-redux';
import { TiDeleteOutline } from 'react-icons/ti';
import { FiEdit2 } from 'react-icons/fi';
import { MdModeEdit } from 'react-icons/md';

function ProductsMainSection() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [allProducts, setAllProducts] = useState(null);
  const [handleSubmitListener, setHandleSubmitListener] = useState(false)
  const loggedAdmin = useSelector((state) => state.admin);
  console.log(handleSubmitListener);

  const getAllProducts = async () => {
    console.log('getting products');
    const response = await axios({
      method: 'GET',
      url: `${baseURL}/products`,
      headers: {
        Authorization: `Bearer ${loggedAdmin.token}`,
      },
    });
    setAllProducts(response.data);
  };

  useEffect(() => {
    getAllProducts();
  }, [handleSubmitListener]);

  return (
    <>
      {allProducts && (
        <div className="row g-0 w-75">
          <div className="m-0">
            <div className="col-12 p-0">
              <div className="container my-4 py-4">
                <div className="card">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                      <h6 className="text-white text-capitalize fs-5 ps-5">LISTED PRODUCTS</h6>
                    </div>
                  </div>
                  <div className="card-body px-4 pb-2">
                    <div className="table p-1">
                      <table className="table align-items-center mb-2">
                        <thead>
                          <tr>
                            <th className="text-starttext-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Product
                            </th>
                            <th className="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Category
                            </th>
                            <th className="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Stock
                            </th>
                            <th className="text-start text-uppercase text-secondary opacity-7">
                              Price
                            </th>
                            <th className="text-uppercase text-secondary opacity-7"></th>
                            <th className="text-uppercase text-secondary opacity-7"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {allProducts.map((product) => (
                            <tr key={product._id}>
                              <td className="align-middle text-start text-sm">
                                <div className="d-flex px-0 py-1">
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">{product.name}</h6>
                                  </div>
                                </div>
                              </td>
                              <td className="align-middle text-start text-sm">
                                <p className="text-xs font-weight-bold mb-0">
                                  {product.category.name}
                                </p>
                              </td>
                              <td className="align-middle text-start">
                                <span className="text-secondary text-xs font-weight-bold">
                                  {product.stock} u.
                                </span>
                              </td>
                              <td className="align-middle text-start text-sm">
                                <a href="" className="text-secondary text-decoration-none">
                                  USD {product.price}
                                </a>
                              </td>
                              <td className="align-middle text-sm">
                                <MdModeEdit className="text-warning" role="button" />
                              </td>
                              <td className="align-middle text-sm">
                                <TiDeleteOutline
                                  onClick={() => handleDelete(admin._id, admin.firstname)}
                                  className="text-danger"
                                  role="button"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex justify-content-center mb-4">
                      <AddProductModal
                        handleSubmitListener={handleSubmitListener} setHandleSubmitListener={setHandleSubmitListener}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsMainSection;
