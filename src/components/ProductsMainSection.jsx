import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddProductModal from './AddProductModal';
import { useSelector } from 'react-redux';
import { TiDeleteOutline } from 'react-icons/ti';
import { FiEdit2 } from 'react-icons/fi';
import { MdModeEdit } from 'react-icons/md';
import EditProductModal from './EditProductModal';

function ProductsMainSection() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [allProducts, setAllProducts] = useState(null);
  const loggedAdmin = useSelector((state) => state.admin);
  const [activeProductSlug, setActiveProductSlug] = useState(null);
  const handleAxiosModal = (productSlug) => setActiveProductSlug(productSlug);
  
  const getAllProducts = async () => {
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
  }, []);

  const handleDelete = async (name, slug) => {
    try {
      window.confirm(`Are you sure you want to delete ${name}?`);
      await axios({
        method: 'DELETE',
        url: `${baseURL}/products/${slug}`,
        data: { slug: slug },
        headers: {
        Authorization: `Bearer ${loggedAdmin.token}`,
      },
      });
      window.alert('product deleted');
      getAllProducts();
    } catch (error) {
      console.error(error);
      window.alert(error);
      // Add toast!!
    }
  };

  return (
    <>
      {allProducts && (
        <div className="row g-0 w-75">
          <div className="m-0">
            <div className="col-12 p-0">
              <div className="container my-4 py-4">
                <div className="card">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-light">
                    <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                      <h6 className="text-white text-capitalize fs-5 ps-5">LISTED PRODUCTS</h6>
                    </div>
                  </div>
                  <div className="card-body px-4 pb-2 bg-light">
                    <div className="table p-1">
                      <table className="table table-light align-items-center mb-2">
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
                                  USD {product.price.toFixed(2)}
                                </a>
                              </td>
                              <td className="align-middle text-sm">
                              {product.slug === activeProductSlug && (
                                <EditProductModal 
                                productSlug={product.slug} 
                                key={product._id} 
                                onClose={()=> setActiveProductSlug(null)}
                                getAllProducts={getAllProducts}
                                />
                              )}
                              <p onClick={()=>handleAxiosModal(product.slug)} className='p-0 m-0'><MdModeEdit className="text-warning" role="button" /></p>
                              </td>
                              <td className="align-middle text-sm">
                                <TiDeleteOutline
                                  onClick={() => handleDelete(product.name, product.slug)}
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
                         getAllProducts={getAllProducts}
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
