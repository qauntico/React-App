import React, { useContext } from "react";
import CartContex from "../../Contex/Cart-Contex";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import moment from "moment";

export default function UserProfile({userProfileInfo}){
    const data = useContext(CartContex);
    function ReturnBackToDashboard(){
        data.HideUserProfile()
    }
    const {name, email ,createdAt,updatedAt } = userProfileInfo.user;

    return (
        <>
            <Container className='user-main-container'>
                <Row >
                    <Col lg={10} md={5} sm={10}></Col>
                    <Col lg={2} md={6} sm={2}>
                        <Button variant="secondary" className="return-to-dashboard" onClick={ReturnBackToDashboard}>Back</Button>
                    </Col>
                </Row>
                <Row  className="user-secondary-container">
                    <Col lg={3} sm={6} className="user-column">
                        <div>
                            <p className="profile-links">Profile Info</p>
                        </div>
                    </Col>
                    <Col lg={7} sm={6} className="user-second-column">
                        <div className="user-detail-info"> 
                            <h2>Account Information</h2>
                            <Row >
                                <Col lg={7} sm={6}>
                                    <h6 className="contact-info">Contact Information</h6>
                                    <p className="user-name">{name}</p>
                                    <p className="user-name">{email}</p>
                                </Col>
                                <Col lg={5} sm={6}>
                                    <h6 className="contact-info">Member Status</h6>
                                    <p className="user-name">Created Account: {moment(createdAt).fromNow()}</p>
                                    <p className="user-name">Updated Account: {moment(updatedAt).fromNow()}</p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}