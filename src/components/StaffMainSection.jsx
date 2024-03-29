import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddAdminModal from './AddAdminModal';
import EditAdminModal from './EditAdminModal';
import { TiDeleteOutline } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import { MdModeEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

function StaffMainSection() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [allAdmin, setAllAdmin] = useState(null);
  const loggedAdmin = useSelector((state) => state.admin);

  const [activeAdminId, setActiveAdminId] = useState(null);
  const handleAxiosModal = (adminId) => setActiveAdminId(adminId);

  const getAllAdmin = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseURL}/admins`,
        headers: {
          Authorization: `Bearer ${loggedAdmin.token}`,
        },
      });
      return setAllAdmin(response.data);
    } catch (error) {
      console.log(error);
      return toast.error(`Could not get Staff list`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  useEffect(() => {
    getAllAdmin();
  }, []);

  const handleDelete = async (id, firstname, lastname) => {
    const cantDelete = ['Admin', 'Example'];
    if (cantDelete.includes(firstname) || cantDelete.includes(lastname)) {
      return toast.error(`${firstname} cannot be deleted.`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
    if (window.confirm(`Are you sure you want to delete ${firstname}?`))
      try {
        await axios({
          method: 'DELETE',
          url: `${baseURL}/admins/${id}`,
          data: { id: id },
          headers: {
            Authorization: `Bearer ${loggedAdmin.token}`,
          },
        });
        toast.success(`${firstname + ' ' + lastname} deleted successfully!`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return getAllAdmin();
      } catch (error) {
        console.error(error);
        return toast.error(`Could not delete admin`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
  };

  return (
    <>
      {allAdmin && (
        <div className="row g-0 w-75">
          <div className="m-0">
            <div className="col-12 p-0">
              <div className="container my-4 py-4">
                <div className="card bg-light">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-light">
                    <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                      <h6 className="text-white text-capitalize fs-5 ps-5">CURRENT STAFF</h6>
                    </div>
                  </div>
                  <div className="card-body px-5 pb-2">
                    <div className="table p-1">
                      <table className="table align-items-center mb-2 table-light">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Worker
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Email
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Function
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Employed
                            </th>
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
                                <span className="text-secondary text-xs font-weight-bold">
                                  {new Date(admin.createdAt).toLocaleDateString()}
                                </span>
                              </td>
                              <td className="align-middle text-sm">
                                {admin._id === activeAdminId && (
                                  <EditAdminModal
                                    adminId={admin._id}
                                    key={admin._id}
                                    onClose={() => setActiveAdminId(null)}
                                    getAllAdmin={getAllAdmin}
                                  />
                                )}
                                <p onClick={() => handleAxiosModal(admin._id)} className="p-0 m-0">
                                  <MdModeEdit className="text-warning" role="button" />
                                </p>
                              </td>
                              <td className="align-middle text-sm">
                                <TiDeleteOutline
                                  onClick={() =>
                                    handleDelete(admin._id, admin.firstname, admin.lastname)
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
                    <div className="d-flex justify-content-center mb-4">
                      <AddAdminModal getAllAdmin={getAllAdmin} />
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

export default StaffMainSection;
