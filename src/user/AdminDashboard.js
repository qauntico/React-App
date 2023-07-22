import React from "react";
import { isAuthenticated } from "../auth/auth";
import { Link } from "react-router-dom";
import AdminDashboardDesign from "../components/AdminDashBoardDesign";

const Admin = () => {
    const {user} = JSON.parse(isAuthenticated());
    const {name, history} = user

    const userLinks = () => {
        return <>
            <Link to='create/category'>create Category </Link>
            <Link to='create/product'>create Products</Link>
            <Link to='orders'>view Orders</Link>
        </>
    }
    return <>
        <div style={{marginTop: '90px'}}>
            <AdminDashboardDesign />
            {userLinks()}
            {name}
        </div>
    </>
};
export default Admin;