import React from "react";
import { isAuthenticated } from "../auth/auth";
import { Link } from "react-router-dom";

const Admin = () => {
    const {user} = JSON.parse(isAuthenticated());
    const {name, history} = user

    const userLinks = () => {
        return <>
            <Link to='create/category'>create Category </Link>
            <Link to='create/product'>create Products</Link>
        </>
    }
    return <>
        <p style={{marginTop: '200px'}}>{name} {history}</p>
        {userLinks()}
    </>
};
export default Admin;