import React from "react";
import DashboardMenu from "./DashboardMenu";
import "./AdminHome.css"
import { Outlet } from "react-router-dom";

function AdminHome() {

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