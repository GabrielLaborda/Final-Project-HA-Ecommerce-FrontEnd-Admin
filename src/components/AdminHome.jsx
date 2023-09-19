import React from "react";
import DashboardMenu from "./DashboardMenu";
import "./AdminHome.css"
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminLogin from "./AdminLogin";
import { useEffect } from "react";

function AdminHome() {

    const loggedAdmin = useSelector((state) => state.admin);

    const navigate = useNavigate();

    useEffect(() => { if (!loggedAdmin) return navigate("/login"); }), [];

    return (
        <>
            <div className="container-fluid" >
                <div className="row g-0">
                    <div className="col-2">
                        <DashboardMenu />
                    </div>
                    <div className="col d-flex justify-content-center">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminHome;