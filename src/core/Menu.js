import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate} from "react-router-dom";
import classes from './menu.module.css'
import { signout} from "../auth/auth";
import { isAuthenticated } from "../auth/auth";


export default function Menu() {
    const navigate = useNavigate();
    const isAuth = isAuthenticated();
    const {user: {role}} = JSON.parse(isAuth)
    function logout(){
        signout( () => {
            navigate('/signin')
        })
    }
    return  <Navbar collapseOnSelect expand="lg" className={`${"bg-body-tertiary"} ${classes.container} `} fixed="top">
            <Container>
                <Navbar.Brand href="/" className={classes.logo}>Quantum | Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav className={classes.heading}>
                        {role === 1 ? 
                            <NavLink to='/admin/dashboard' className={({isActive}) => isActive ? classes.active: undefined} end>dashboard</NavLink> :
                            <NavLink to='/user/dashboard' className={({isActive}) => isActive ? classes.active: undefined} end>dashboard</NavLink>
                        }
                        <NavLink to='/shop' className={({isActive}) => isActive ? classes.active: undefined} end>Shop</NavLink>
                        <NavLink to='/signin' className={({isActive}) => isActive ? classes.active : undefined}>SignIN</NavLink>
                        <NavLink to='/signup' className={({isActive}) => isActive ? classes.active : undefined}>SignUp</NavLink>
                        {isAuth && 
                            <span onClick={logout} >Signout</span>
                        }  
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
}