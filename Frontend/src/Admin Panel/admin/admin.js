import React from 'react'
import './admin.css'
import Sidebar from '../Components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'


export default function admin() {
    return (
        <>
            <div className="sb-nav-fixed">
                <div id="layoutSidenav">
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                </div>

                <div className="row p-4" style={{ display: "contents", backgroundColor: "#f9f4ef" }}>
                    <Outlet />
                </div>

            </div>

        </>
    )
}
