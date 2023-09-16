import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';

function ProductsMainSection() {

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [allProducts, setAllProducts] = useState(null);

  const getAllProducts = async () => {
    const response = await axios({
      method: 'GET',
      url: `${baseURL}/products`,
    });
    setAllProducts(response.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      {allProducts && (<div className="row g-0 w-75">
          <div className='m-0'>
          <div className="col-12 p-0">
            <div className="container my-4 py-4">
              <div className='card'>
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                    <h6 className="text-white text-capitalize fs-5 ps-5">Listed products</h6>
                  </div>
                </div>
                <div className="card-body px-5 pb-2">
                  <div className="table p-1">
                    <table className="table align-items-center mb-2">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Product</th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Category</th>
                          <th className="text-end text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Stock</th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {allProducts.map((product) => (
                          <tr key={product._id}>
                            <td className="align-middle text-start text-sm">
                              <div className="d-flex px-2 py-1">
                                {/* <div>
                                  <img src="" alt="user.picture" />
                                </div> */}
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{product.name}</h6>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">{product.category.name}</p>
                            </td>
                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">{ product.stock } u.</span>
                            </td>
                            <td className="align-middle text-sm">
                              <a href="" className="text-secondary text-decoration-none">
                                Edit
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className='d-flex justify-content-center mb-4'>
                      <button className='ms-3 px-5 py-2 btn btn-outline-dark rounded-0'>Add new Product</button>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>
        </div>)}
    </>
  )
}

export default ProductsMainSection