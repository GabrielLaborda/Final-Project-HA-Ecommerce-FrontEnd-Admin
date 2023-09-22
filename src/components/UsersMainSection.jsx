import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

function UsersMainSection() {

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [allUsers, setAllUsers] = useState(null);

  const getAllUsers = async () => {
    const response = await axios({
      method: 'GET',
      url: `${baseURL}/users`,
    });
    setAllUsers(response.data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      {allUsers && (
        <div className="row g-0 w-75">
          <div className='m-0'>
          <div className="col-12 p-0">
            <div className="container my-4 py-4">
              <div className='card'>
                <div className="card-header bg-light p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                    <h6 className="text-white fs-5 ps-5">ACTIVE USERS</h6>
                  </div>
                </div>
                <div className="card-body px-5 pb-2 bg-light">
                  <div className="table p-1">
                    <table className="table table-light align-items-center mb-2">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">User</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Email</th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Address</th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Orders</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUsers.map((user) => (
                          <tr key={user._id}>
                            <td className="align-middle text-start text-sm">
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{user.firstname}</h6>
                                  <p className="text-xs text-secondary mb-0">{user.lastname}</p>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle text-start text-sm">
                              <p className="text-xs font-weight-bold mb-0">{user.email}</p>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">{user.address}</p>
                            </td>
                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">{user.orders.length}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>
        </div>
      )}
      </>
)}

export default UsersMainSection