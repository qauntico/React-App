import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/auth";
import { Link } from "react-router-dom";
import UserProfile from "../components/UserComponents/UserProfile";
import { UserPurchaseHistory } from "./userApi/userApi";

const Dashboard = () => {
    const {user,token} = JSON.parse(isAuthenticated());
    const {name,_id} = user
    //user dashboard data
    const [UserDashboard, setUserDashboard] = useState({
        profileData: [],
        error: ''
    })
    const {profileData, error} = UserDashboard;
    function PurchaseHistory(){
        UserPurchaseHistory(_id,token).then(result => {
            if(result.error){
                console.log(result.error)
            }else{
                setUserDashboard(prev => ({
                    ...prev,
                    profileData: result
                }))
            }
        })
    }

    //useEffect to set the user profile data as soon as the component mounts
    useEffect(() => {
        PurchaseHistory()
    },[])

    const userLinks = () => {
        return <>
            <UserProfile profileData={profileData} userProfileInfo={user} />
        </>
    }
    return <>
            <p style={{marginTop: '80px'}}>
                {userLinks()} 
            </p>
          </>
};
export default Dashboard;