import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { TiDeleteOutline } from "react-icons/ti";
import EditCategoryModal from "./EditCategoryModal";
import { toast } from 'react-toastify';

function CategoriesMainSection() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [allCategories, setAllCategories] = useState(null);
  const loggedAdmin = useSelector((state) => state.admin);
  const [pictures, setPictures] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [activeCategorySlug, setActiveCategorySlug] = useState(null);
  const handleAxiosModal = (categorySlug) =>
    setActiveCategorySlug(categorySlug);

  const getAllCategories = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${baseURL}/categories`,
      });
      return setAllCategories(response.data);
    } catch (error) {
      console.log(error);
      return toast.error(`Could not get categories list, try again`, {
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
    getAllCategories();
  }, []);

  const hanldeFilesPictures = (pictures) => {
    setPictures(pictures);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      await axios({
        method: "POST",
        url: `${baseURL}/categories`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
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
        setName("");
        setDescription("");
        setPictures(null);
        return getAllCategories();
    } catch (error) {
      console.log(error);
      return toast.error(`Could not add new category, try again`, {
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

  const handleDelete = async (name, slug) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`))
    try {
      await axios({
        method: "DELETE",
        url: `${baseURL}/categories/${slug}`,
        data: { slug: slug },
        headers: {
          Authorization: `Bearer ${loggedAdmin.token}`,
        },
      });
      toast.success(`${name} deleted successfully!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return getAllCategories();
    } catch (error) {
      console.error(error);
      return toast.error(`Could not delete category, try again`, {
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
        <div className="row g-0 w-75">
          <div className="m-0 d-flex justify-content-center">
            <div className="col-10 p-0">
              <div className="container my-4 py-4">
                <div className="card">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-light">
                    <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                      <h6 className="text-white fs-5 ps-5">
                        CATEGORIES
                      </h6>
                    </div>
                  </div>
                  <div className="card-body px-5 pb-2 bg-light">
                    <div className="table p-1">
                      <table className="table table-light align-items-center mb-2">
                        <thead>
                          <tr>
                            <th className="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Category
                            </th>
                            <th className="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              prod Quantity
                            </th>
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
                                    <h6 className="mb-0 text-sm">
                                      {category.name}
                                    </h6>
                                  </div>
                                </div>
                              </td>
                              <td className="align-middle text-start text-sm">
                                <p className="text-xs font-weight-bold mb-0">
                                  {category.products.length} products
                                </p>
                              </td>
                              <td className="align-middle text-start text-sm">
                                {category.slug === activeCategorySlug && (
                                  <EditCategoryModal
                                    categorySlug={category.slug}
                                    key={category._id}
                                    onClose={() => setActiveCategorySlug(null)}
                                    getAllCategories={getAllCategories}
                                  />
                                )}
                                <p
                                  onClick={() =>
                                    handleAxiosModal(category.slug)
                                  }
                                  className="p-0 m-0"
                                >
                                  <MdModeEdit
                                    className="text-warning"
                                    role="button"
                                  />
                                </p>
                              </td>
                              <td className="align-middle text-start text-sm">
                                <TiDeleteOutline
                                  onClick={() =>
                                    handleDelete(category.name, category.slug)
                                  }
                                  className="text-danger"
                                  role="button"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex justify-content-start mb-4 px-2">
                      <form
                        className="d-flex flex-column"
                        onSubmit={handleSubmit}
                      >
                        <h6 className="fw-bold text-secondary mt-2">ADD NEW CATEGORY</h6>
                        <div className="row">
                          <div className="col-6">
                          <label htmlFor="name"></label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            placeholder="Category name"
                            onChange={(event) => setName(event.target.value)}
                            className="form-control rounded-0"
                          />
                          </div>
                          <div className="col-6">
                          <label htmlFor="description"></label>
                          <input
                            type="text"
                            name="description"
                            id="description"
                            value={description}
                            placeholder="Description"
                            onChange={(event) =>
                              setDescription(event.target.value)
                            }
                            className="form-control rounded-0"
                          />
                          </div>
                          <div className="col-12">
                          <label htmlFor="pictures"></label>
                          <input
                            id="pictures"
                            name="pictures"
                            onChange={(e) =>
                              hanldeFilesPictures(e.target.files)
                            }
                            type="file"
                            multiple
                            className="form-control rounded-0"
                          />
                          </div>
                          <div className="col-12">
                          <button
                          type="submit"
                          className="pt-1 mt-4 btn btn-outline-dark rounded-0 form-control"
                        >
                          Add new category
                        </button>
                          </div>
                        </div>
                     
                      </form>
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

export default CategoriesMainSection;
