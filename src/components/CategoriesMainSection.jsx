import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdModeEdit } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';

function CategoriesMainSection() {  

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [allCategories, setAllCategories] = useState(null);

  const getAllCategories = async () => {
    const response = await axios({
      method: 'GET',
      url: `${baseURL}/categories`,
    });
    setAllCategories(response.data);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      {allCategories && (<div className="row g-0 w-75">
          <div className='m-0 d-flex justify-content-center'>
          <div className="col-10 p-0">
            <div className="container my-4 py-4">
              <div className='card'>
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                    <h6 className="text-white text-capitalize fs-5 ps-5">Categories</h6>
                  </div>
                </div>
                <div className="card-body px-5 pb-2">
                  <div className="table p-1">
                    <table className="table align-items-center mb-2">
                      <thead>
                        <tr>
                          <th className="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Category</th>
                          <th className="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">prod Quantity</th>
                          <th className="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                          <th className="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {allCategories.map((category) => (
                          <tr key={category._id}>
                            <td className="align-middle text-start text-sm">
                              <div className="d-flex px-0 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{category.name}</h6>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle text-start text-sm">
                              <p className="text-xs font-weight-bold mb-0">{category.products.length} products</p>
                            </td>
                            <td className="align-middle text-start text-sm">
                              <MdModeEdit className='text-warning' role='button'/>
                            </td>
                            <td className="align-middle text-start text-sm">
                              <TiDeleteOutline onClick={() => handleDelete(admin._id, admin.firstname)} className='text-danger' role='button' />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className='d-flex justify-content-center mb-4'>
                    <form action="post" className='d-flex'>
                      <label htmlFor="newCategoryName"></label>
                      <input type="text" name="add-category-name" id="newCategoryName" placeholder='New category' className='mx-3'/>
                      <label htmlFor="newCategoryDescription"></label>
                      <input type="text" name="add-description" id="newCategoryDescription" placeholder='Description' className='mx-3'/>
                      <button type='submit' className='mx-3 px-3 py-1 btn btn-outline-dark rounded-0'>Add new category</button>
                    </form>
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

export default CategoriesMainSection