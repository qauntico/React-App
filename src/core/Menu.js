import React,{useContext, useState} from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate,Link} from "react-router-dom";
import classes from './menu.module.css'
import { signout} from "../auth/auth";
import { isAuthenticated } from "../auth/auth";
import { itemTotal } from "./cartHelpers";
import Modal from "../components/Modal";
import CartContex from "../Contex/Cart-Contex";


export default function Menu() {
    const data = useContext(CartContex);//just by bringing it the gobal state manager Context provider here this component of the header will be re evaluated any time cart state in change because by default when we removed an item from the cart the header component wasn't re evaluated for it's value to change
    const [modalVisibility, setModalVisibility] = useState(false)
    const navigate = useNavigate();
    const isAuth =JSON.parse(isAuthenticated());
    function logout(){
        signout( () => {
            navigate('/signin')
        })
    }

    //check the size of the cart before navigation to the cart page
    function handleCart(){
        if(!isAuth && itemTotal() == 0){
            setModalVisibility(prev => !prev)
        }else if(isAuth){
            navigate('/cart')  
        }else{
            navigate('/cart')
        }
    }

    //handle the visibility of the cart
    function HandleVisibility(){
        setModalVisibility(prev => !prev)
    }

    return  <>
                <div>
                {modalVisibility &&  <Modal visibility={HandleVisibility} />}
                <Navbar collapseOnSelect expand="lg" className={`${"bg-body-tertiary"} ${classes.container} `} fixed="top">
                    <Container>
                        <Navbar.Brand href="/" className={classes.logo}>Quantum | Shop</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>
                            <Nav className={classes.heading}>
                                {isAuth && isAuth.user.role == 1 ?
                                    <NavLink to='/admin/dashboard' className={({isActive}) => isActive ? classes.active: undefined} end>dashboard</NavLink> :
                                    <NavLink to='/user/dashboard' className={({isActive}) => isActive ? classes.active: classes.hov} end>dashboard</NavLink>
                                }
                                <NavLink to='/shop' className={({isActive}) => isActive ? classes.active: classes.hov} end>Shop</NavLink>
                                <div className={`${classes.hov} ${classes.cart}`} onClick={handleCart}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bag-heart-fill" viewBox="0 0 16 16">
                                        <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5ZM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1Zm0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
                                    </svg>
                                    <sup><small>{itemTotal()}</small></sup>
                                </div> 
                                {!isAuth ? (
                                    <div>
                                        <Link to='/signin' >
                                            <Button variant="secondary">log In</Button>
                                        </Link>
                                        <Link to='/signup' >
                                            <button className={classes.button}>Sign Up</button>
                                        </Link>  
                                    </div>
                                ): 
                                    <span onClick={logout} className={classes.cartButton}>
                                        <Button variant="secondary">logout</Button>
                                    </span>
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar> 
                </div>
            </>
            
}