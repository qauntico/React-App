import React from "react";
import './AdminDashBoardDesign.css'
import Button from 'react-bootstrap/Button';
import MemberRequest from "./MemberRequest";
import AdminOrderDesign from "./AdminOrderDesign";

export default function AdminDashboardDesign(){

    const sidebar = ['sidebar']//will be use to toggle the side bar

    return (
        <>
     <div className={sidebar.join(' ')}>
        <div className="logo">
            <i class='bx bxl-sketch bx-burst' ></i>
            <div className="logo-name"><span>Quantum</span>!</div>
        </div>
        <ul className="side-menu">
            <li className="active"><div><i className='bx bxs-dashboard'></i>Dashboard</div></li>
            <li><div><i className='bx bx-store-alt'></i>Shop</div></li>
            <li><div><i className='bx bx-message-square-dots'></i>Tickets</div></li>
            <li><div><i className='bx bx-group'></i>Users</div></li>
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
        
        <main>
            <div className="header">
                <div className="left">
                    <h1>Dashboard</h1>
                </div>
            </div>

            <ul className="insights">
                <li>
                    <i className='bx bx-calendar-check'></i>
                    <span className="info">
                        <h3>
                            1,074
                        </h3>
                        <p>Paid Order</p>
                    </span>
                </li>
                <li><i className='bx bx-dollar-circle'></i>
                    <span className="info">
                        <h3>
                            CFA 6,742
                        </h3>
                        <p>Total Sales</p>
                    </span>
                </li>
                <li><i className='bx bxl-sketch'></i>
                    <span className="info">
                        <h3>
                            3,944
                        </h3>
                        <p>Admin Request</p>
                    </span>
                </li>     
            </ul>

            <div className="bottom-data">
                <div className="orders">
                    <div className="header">
                        <i className='bx bx-receipt'></i>
                        <h3>Recent Orders</h3>
                        <Button variant="secondary">View All</Button>
                    </div>
                    <div className="scroll"> 
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Order Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AdminOrderDesign />
                            <AdminOrderDesign />
                            <AdminOrderDesign />
                            <AdminOrderDesign /> 
                        </tbody>
                    </table>
                    </div>
                    
                </div>

                <div className="reminders">
                    <div className="header">
                        <i className='bx bx-note'></i>
                        <h3>Pending Admin Request</h3>
                        <Button variant="secondary">View All</Button>
                    </div>
                    <div className='scroll'>
                        <ul className="task-list">
                            <MemberRequest />
                            <MemberRequest />
                            <MemberRequest />
                            <MemberRequest />
                        </ul> 
                    </div>
                </div>

            </div>

        </main>

    </div>
        </>
    )


}