import React, { useContext, useEffect, useState } from "react";
import CartContex from "../../Contex/Cart-Contex";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import moment from "moment";
import CompleteProfileOrders from "./CompleteProfileOrders";
import RequestToBeAdmin from "./RequestToBeAdmin";
import SuccessMessage from "../successAtlert";
import EditUserProfileInfo from "./EditUserProfileInfo";
import './UserProfile.css'

//** The method variable  recieved as props will only be passed in by the admin and this will be used to prevent some of the user private elements which can only be accessed by the user for example the user purchase history**//
export default function UserProfile({userProfileInfo,profileData,method}){
    //user dashboard profile Links state handle
    const [profileLinks, setProfileLinks] = useState({
        profileInfoLink: true,
        userOrdersLink: false,
        requestToBeAdmin: false,
        updateProfile: false
    })
    const {profileInfoLink,userOrdersLink,requestToBeAdmin,updateProfile} = profileLinks;

    //Makes global states available 
    const data = useContext(CartContex);

    //handles the returning back to the admin dashboard after viewing user profile makes use of a global state method HideuserProfile
    function ReturnBackToDashboard(){
        data.HideUserProfile()
    }
    //user infor
    const {name, email,about = '' ,createdAt,updatedAt } = userProfileInfo;

  
    //member info to be displayed 
    function MemberStatus(){
      if(profileInfoLink){
        return (
            <>
                <h2>Account Information</h2>
                <Row >
                    <Col lg={7} sm={6}>
                        <h6 className="contact-info">Contact Information</h6>
                        <p className="user-name">Name: {name}</p>
                        <p className="user-name">Email: {email}</p>
                        <p className="user-name">About: {about}</p>
                    </Col>
                    <Col lg={5} sm={6}>
                        <h6 className="contact-info">Member Status</h6>
                        <p className="user-name">Created Account: {moment(createdAt).fromNow()}</p>
                        <p className="user-name">Updated Account: {moment(updatedAt).fromNow()}</p>
                    </Col>
                </Row>  
            </>
        )
      }else{
        return 
      }
    }

    //This is used to display user orders 
    function YourOrders(){
        if(userOrdersLink && !method){
            return (
                <>
                    {profileData.length === 0 && <SuccessMessage method='PURCHASEHISTORY' message='Sorry You Have Never Bought An Event Ticket'/>}
                    {profileData.length != 0 && (
                       <>
                            <div>  
                                <div  className="order-heading"><h3>Your Orders</h3> </div> 
                                <div className="listed-orders">
                                    {profileData.map((data,index) => (
                                        <CompleteProfileOrders key={index} completeOrderDetails={data} />
                                    ))}
                                </div>
                            </div>
                    </>
                    )}
                </>
            )
        }
    }

    //request to be admin display
    function RequestAdmin(){
        if(requestToBeAdmin && !method){
            return (
                <>
                    <div>
                        <RequestToBeAdmin />
                    </div>
                </>
            )
        }
    }

    //update profile info
    function UpdateUserProfile(){
        if(updateProfile && !method){
            return (
                <>
                    <EditUserProfileInfo />
                </>
            )
        }
    }


    //back button for admin viewing of user profile
    function BackButton(){
        if(method){
            return (
                <Row >
                    <Col lg={10} md={5} sm={10}></Col>
                    <Col lg={2} md={6} sm={2}>
                        <Button variant="secondary" className="return-to-dashboard" onClick={ReturnBackToDashboard}>Back</Button>
                    </Col>
                </Row>
            )
        }
    }

    //User dashboard active class toggle
    const profileInfoLinkStyle = ["profile-links", 
                                profileInfoLink ? 'active': undefined]
    const purchaseHistoryStyle = ["profile-links", 
                                userOrdersLink ? 'active': undefined]
    const requestToBeAdminStyle = ["profile-links", 
                                requestToBeAdmin ? 'active': undefined]
    const updateProfileStyle = ["profile-links", 
                                updateProfile ? 'active': undefined]
    return (
        <>
            <Container className='user-main-container'>
                {BackButton()}
                <Row  className="user-secondary-container">
                    <Col lg={3} md={4} sm={6} className="user-column">
                        <div>
                            <p className={profileInfoLinkStyle.join(' ')}
                                onClick={() => {setProfileLinks(prev => (
                                        {...prev, profileInfoLink: true, userOrdersLink: false,requestToBeAdmin:false,updateProfile:false}))}}
                                >Profile Info
                            </p>
                            {!method && (
                                <>
                                    <p className={purchaseHistoryStyle.join(' ')}
                                        onClick={() => {setProfileLinks(prev => (
                                                {...prev,profileInfoLink: false,requestToBeAdmin:false,updateProfile:false, userOrdersLink: true}))}}
                                        >Purchase History
                                    </p>
                                    <p className={requestToBeAdminStyle.join(' ')}
                                        onClick={() => {setProfileLinks(prev => (
                                                {...prev,profileInfoLink: false, userOrdersLink: false,updateProfile: false,requestToBeAdmin:true}))}}
                                        >List Events
                                    </p> 
                                    <p className={updateProfileStyle.join(' ')}
                                        onClick={() => {setProfileLinks(prev => (
                                                {...prev,profileInfoLink: false,requestToBeAdmin:false,updateProfile: true ,userOrdersLink: false}))}}
                                        >Update Profile Info
                                    </p> 
                                </>
                            )}
                        </div>
                    </Col>
                    <Col lg={7} md={7} sm={6} className="user-second-column">
                        <div className="user-detail-info"> 
                           {MemberStatus()}
                           {YourOrders()}
                           {RequestAdmin()}
                           { UpdateUserProfile()}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}