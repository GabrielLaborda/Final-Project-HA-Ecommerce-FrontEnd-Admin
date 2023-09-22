import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { TiDeleteOutline } from "react-icons/ti";
import EditCategoryModal from "./EditCategoryModal";

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
    const response = await axios({
      method: "GET",
      url: `${baseURL}/categories`,
    });
    setAllCategories(response.data);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const hanldeFilesPictures = (pictures) => {
    setPictures(pictures);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(pictures);
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
      getAllCategories();
      setName("");
      setDescription("");
      setPictures(null);
    } catch (error) {
      console.log(error);
      window.alert("Error: " + error);
      // add Toast!!
    }
  };

  const handleDelete = async (name, slug) => {
    try {
      await axios({
        method: "DELETE",
        url: `${baseURL}/categories/${slug}`,
        data: { slug: slug },
        headers: {
          Authorization: `Bearer ${loggedAdmin.token}`,
        },
      });
      window.alert("product deleted");
      getAllCategories();
    } catch (error) {
      console.error(error);
      window.alert(error);
      // Add toast!!
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
                        CATEGORY
                      </h6>
                    </div>
                  </div>
                  <div className="card-body px-5 pb-2 bg-light">
                    <div className="table p-1">
                      <table className="table table-light align-items-center mb-2">
                        <thead>
                          <tr>
                            <th className="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              CATEGORY
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
                        <h6 className="fw-bold mt-2">ADD NEW CATEGORY</h6>
                        <div className="row">
                          <div className="col-6">
                          <label htmlFor="name"></label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            placeholder="New category"
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
                          <label htmlFor="newCategoryPictures"></label>
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
