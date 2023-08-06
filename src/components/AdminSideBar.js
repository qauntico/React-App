import React, { useContext, useEffect, useState } from "react";
import './AdminDashBoardDesign.css';
import MainAdminDashBoard from "../admin/MainAdminDashBoard";
import { isAuthenticated } from "../auth/auth";
import CartContex from "../Contex/Cart-Contex";
import UserProfile from "./UserComponents/UserProfile";
import { useNavigate} from "react-router-dom";
import CreateCategories from "../admin/CreateCategories";
import ViewCategories from "../admin/ViewCategories";

export default function AdminSideBar(){
    const data = useContext(CartContex);
    const navigate = useNavigate();
    const [dashboard, setDashboard] = useState({
        AdminName: '',
        ShowSideBar: true
    })
    const {user, token} = JSON.parse(isAuthenticated());
    //state variables 
    const {
        AdminName,
        ShowSideBar
    } = dashboard;

    //navigate to the create event route 
    function NavigateToCreateEventRoute(){
        navigate('create/event')
    }
    
    //get just the user first name
    function GetUserFirstName(name){
        const wordsArray = name.split(' ');
        const firstWord = wordsArray[0];
        setDashboard({...dashboard, AdminName: firstWord})
    }

    //controls the side bar
    function ToggleSideBar(){
        setDashboard(prev => ({
            ...prev,
            ShowSideBar: !prev.ShowSideBar
        }))
    }

    useEffect(() => {
        GetUserFirstName(user.name);
    },[])

    const sidebar = ['sidebar', !ShowSideBar ? 'close' : undefined]//will be use to toggle the side bar
   
    return (
        <>
     <div className={sidebar.join(' ')}>
        <div></div>
        <div className="logo">
            <i className='bx bxl-sketch bx-burst' ></i>
            <div className="logo-name"><span>{AdminName}</span>!</div>
        </div>
        <ul className="side-menu">
            <li className={data.showAdminDashboard ? "active" : ""} onClick={data.ToggleAdminDashboard}><div><i className='bx bxs-dashboard'></i>Dashboard</div></li>
            <li><div onClick={NavigateToCreateEventRoute}><i className='bx bx-store-alt'></i>Create Events</div></li>
            <li className={data.showCreateEvent ? "active" : ""} onClick={data.ToggleCreateCategory}><div ><i className='bx bx-category-alt'></i>Create Category</div></li>
            <li className={data.showViewCategories ? "active" : ""} onClick={data.ToggleViewCategories}><div ><i className='bx bx-edit'></i>View Categories</div></li>
            <li><div><i className='bx bx-book-alt'></i>View Orders</div></li>
            <li><div><i className='bx bxs-id-card'></i>Update Profile</div></li>
        </ul>
        <ul className="side-menu">
            <li>
                <div  className="logout">
                    <i className='bx bx-log-out-circle'></i>
                    Logout
                </div>
            </li>
        </ul>
    </div>

    <div className="content">
        <nav>
            <div onClick={ToggleSideBar}>{ShowSideBar ? <i className='bx bx-menu'></i> : <i className='bx bx-chevron-right bx-lg' ></i>}</div>
        </nav>
        {data.showProfile  && <UserProfile userProfileInfo={data.profileState.user} method={'ADMIN'} /> }
        {data.showAdminDashboard && <MainAdminDashBoard />}
        {data.showCreateEvent && <CreateCategories />}
        {data.showViewCategories && <ViewCategories /> }
    </div>
        </>
    )


}