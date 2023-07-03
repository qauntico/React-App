import React from "react";
import { isAuthenticated } from "../auth/auth";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const {user} = JSON.parse(isAuthenticated());
    const {name, history} = user

    const userLinks = () => {
        return <>
            <Link to='cart'>cart</Link>
            <Link to='profile/update'>Update Profle</Link>
        </>
    }
    return <>
        <p style={{marginTop: '200px'}}>{name} {history}</p>
        {userLinks()}
    </>
};
export default Dashboard;