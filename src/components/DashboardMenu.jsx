import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./DashboardMenu.css"
import { NavLink } from 'react-router-dom';

function DashboardMenu() {
    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? "bold" : "normal",
            fontSize: isActive ? "1.1em" : "1em",
            color: isActive ? "white" : "gray",
        };
  };
    return (
      <>
        <div className='col-2 p-0'>
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark" id="sidenav-main">
          <div className="sidenav-header fw-normal my-3 d-flex justify-content-center">
            <h2 className="fs-2 fw-normal text-warning py-4"><span className="fw-bold text-white">URBAN</span>RUSH</h2>
            </div>
            <hr className="horizontal text-white mt-0 mb-2"/>
            <div className="w-auto max-height-vh-100">
              <ul className="navbar-nav">
                <li className="nav-item adminMenuOptions">
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <NavLink className={'text-decoration-none'} to={'/dashboard'} end style={navLinkStyles}>DASHBOARD</NavLink>
                  </div>
              </li>
                <li className="nav-item adminMenuOptions">
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <NavLink className={'text-decoration-none'} to={'/users'} end style={navLinkStyles}>USERS</NavLink>
                  </div>
              </li>
              <li className="nav-item adminMenuOptions">
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <NavLink className={'text-decoration-none'} to={'/categories'} end style={navLinkStyles}>CATEGORIES</NavLink>
                  </div>
              </li>
              <li className="nav-item adminMenuOptions">
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <NavLink className={'text-decoration-none'} to={'/products'} end style={navLinkStyles}>PRODUCTS</NavLink>
                  </div>
              </li>
              <li className="nav-item adminMenuOptions">
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <NavLink className={'text-decoration-none'} to={'/orders'} end style={navLinkStyles}>ORDERS</NavLink>
                  </div>
              </li>
              <li className="nav-item adminMenuOptions">
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <NavLink className={'text-decoration-none'} to={'/staff'} end style={navLinkStyles}>STAFF</NavLink>
                  </div>
                </li>
              </ul>
          </div>
          <div className="sidenav-footer position-absolute w-100 bottom-0 ">
            <div className="m-3">
              <a className="btn bg-dark text-warning border-1 border-white mt-4 w-100 py-2" href="/" type="button">GO TO SHOP</a>
            </div>
          </div>
          </aside>
          </div>
    </>
  );
}

export default DashboardMenu;