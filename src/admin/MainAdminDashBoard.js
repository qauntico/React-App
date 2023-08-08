import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import MemberRequest from "../components/MemberRequest";
import AdminOrderDesign from "../components/AdminOrderDesign";
import { cancelUserRequest, getAllAdminRequest, getAllUsers, listOrders } from "./adminApi";
import { isAuthenticated } from "../auth/auth";


export default function MainAdminDashBoard(){
    const [controlUserRequestState, setControlUserRequestState] = useState({
        state: false})
    const [dashboard, setDashboard] = useState({
        totalOrderCost: 0,
        firstTenOrders: [],
        adminRequest: [],
        numberOfOrders: 0,
        numberOfRequest: 0,
        totalUsers: 0
    })
    const {
        totalOrderCost,
        firstTenOrders,
        adminRequest,
        numberOfOrders,
        numberOfRequest,
        totalUsers
    } = dashboard;

    const {user, token} = JSON.parse(isAuthenticated());

    //Manages the state of everything that contains orders which are to be displayed on the dashboard
    function OrderManager(){
        listOrders(user._id,token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
               const totalAmount = data.reduce((accumulator, currentObject) => {
                    return accumulator + currentObject.amount;
                }, 0);
                const slicedOrders = data.slice(0, 10);
                const totalNumberOfOrders = data.length;
                setDashboard(prev => ({
                    ...prev,
                    totalOrderCost: totalAmount,
                    firstTenOrders: slicedOrders,
                    numberOfOrders: totalNumberOfOrders
                }))
            }
        })
    }

    //manages everything that concerns members requesting to the admin to be displayed on the dashboard
    function AdminRequestManager(){
        getAllAdminRequest(user._id,token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                const totalNumberOfRequest = data.length;
                setDashboard(prevState => ({
                    ...prevState,
                    adminRequest: data,
                    numberOfRequest: totalNumberOfRequest,
                }));
            }
        })
    }
    
    //gets the total users reqistered to the platform 
    function TotalSiteUsers(){
        getAllUsers(user._id,token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                const totalNumberOfUsers = data.length;
                setDashboard(prevState => ({
                    ...prevState,
                    totalUsers: totalNumberOfUsers
                }));
            }
        })
    }

    //this method trys to update the component when a request is either decline or accepted
    function toggleControlUserRequestState(){
        setControlUserRequestState(prev => ({
            state: !prev
        }))
    }

    useEffect(() => {
        OrderManager();
        AdminRequestManager();
        TotalSiteUsers();
    },[controlUserRequestState]);

    return (
        <main>
            <div className="header">
                <div className="left">
                    <h1>Welcome Admin</h1>
                </div>
            </div>

            <ul className="insights">
                <li>
                    <i className='bx bx-calendar-check'></i>
                    <span className="info">
                        <h3>
                            {numberOfOrders}
                        </h3>
                        <p>Paid Order</p>
                    </span>
                </li>
                <li><i className='bx bx-dollar-circle'></i>
                    <span className="info">
                        <h3>
                            CFA {totalOrderCost}
                        </h3>
                        <p>Total Sales</p>
                    </span>
                </li>
                <li><i className='bx bxl-sketch'></i>
                    <span className="info">
                        <h3>
                            {numberOfRequest}
                        </h3>
                        <p>Admin Request</p>
                    </span>
                </li>
                <li><i className='bx bx-male-female'></i>
                    <span className="info">
                        <h3>
                            {totalUsers}
                        </h3>
                        <p>Total Members</p>
                    </span>
                </li>        
            </ul>

            <div className="bottom-data">
                <div className="orders">
                    <div className="header">
                        <i className='bx bx-receipt'></i>
                        <h3>Recent Orders</h3>
                    </div>
                    <div className="scroll"> 
                    <table>
                        <thead>
                            <tr>
                                <th>OrderID</th>
                                <th>Order Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {firstTenOrders.map((orders, index) => {
                                return <AdminOrderDesign key={index} orders={orders} />
                            })}
                        </tbody>
                    </table>
                    </div>
                    
                </div>

                <div className="reminders">
                    <div className="header">
                        <i className='bx bx-note'></i>
                        <h3>Pending Admin Request</h3>
                    </div>
                    <div className='scroll'>
                        <ul className="task-list">
                            {adminRequest.map((members, index)=> (
                                <MemberRequest 
                                key={index} 
                                members={members} 
                                requestState={toggleControlUserRequestState} />
                            ))}
                
                        </ul> 
                    </div>
                </div>

            </div>

        </main>
    )
}
