import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddAdminModal from './AddAdminModal';
import EditAdminModal from './EditAdminModal';
import { TiDeleteOutline } from "react-icons/ti";
import { useSelector } from 'react-redux';

function StaffMainSection() {

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [allAdmin, setAllAdmin] = useState(null);
  const loggedAdmin = useSelector((state) => state.admin);

  const getAllAdmin = async () => {
    const response = await axios({
      method: 'GET',
      url: `${baseURL}/admins`,
      headers:{
            Authorization: `Bearer ${loggedAdmin.token}`,
            }
    });
    setAllAdmin(response.data);
  };

  useEffect(() => {
    getAllAdmin();
  });

  const handleDelete = async (id, firstname) => {
    try {
      window.confirm(`Are you sure you want to delete ${firstname}?`);
      await axios({
        method: "DELETE",
        url: `${baseURL}/admins/${id}`,
        data: { id: id }
      });
      window.alert("admin deleted");
    } catch (error) {
      console.error(error);
      window.alert(error);
      // Add toast!!
    }
  }

  return (
  <>
    {allAdmin && (
      <div className="row g-0 w-75">
        <div className='m-0'>
          <div className="col-12 p-0">
            <div className="container my-4 py-4">
              <div className='card'>
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                    <h6 className="text-white text-capitalize fs-5 ps-5">CURRENT STAFF</h6>
                  </div>
                </div>
                <div className="card-body px-5 pb-2">
                  <div className="table p-1">
                    <table className="table align-items-center mb-2">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Worker</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Email</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Function</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Employed</th>
                          <th className="text-secondary opacity-7"></th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {allAdmin.map((admin) => (
                          <tr key={admin._id}>
                            <td className="align-middle text-start text-sm">
                              <div className="d-flex px-0 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{admin.firstname}</h6>
                                  <p className="text-xs text-secondary mb-0">{admin.lastname}</p>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle text-start text-sm">
                              <p className="text-xs font-weight-bold mb-0">{admin.email}</p>
                            </td>
                            <td className="align-middle text-start text-sm">
                              <div className="d-flex px-0 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">Executive</h6>
                                  <p className="text-xs text-secondary mb-0">Manager</p>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle text-start">
                              <span className="text-secondary text-xs font-weight-bold">{new Date(admin.createdAt).toLocaleDateString()}</span>
                            </td>
                            <td className="align-middle text-sm">
                              <EditAdminModal adminId={ admin._id } />
                            </td>
                            <td className="align-middle text-sm">
                              <TiDeleteOutline onClick={() => handleDelete(admin._id, admin.firstname)} className='text-danger' role='button' />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                    <div className='d-flex justify-content-center mb-4'>
                      <AddAdminModal />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  )
}

export default StaffMainSection