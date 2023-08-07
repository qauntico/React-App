import React, {useEffect, useState} from "react";
import { getCart } from "./cartHelpers";
import Cart from "./card";
import { Link } from "react-router-dom";
import CheckOut from "./checkout";
import { Col,Row,Button } from "react-bootstrap";
import './cart.css';
import CartItems from "./CartItems";



export function ShoppingCart(){
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    //this use effect is ran to get the cart items from the local storage and set them once the component monts
    useEffect(() => {
        setItems(getCart())
    },[run])

    function showItems(items){
        return (
            <>
                {items.map((product,i)=>(
                    <CartItems key={i} product={product} update={true} run={run} setRun={setRun}/>
                ))} 
            </>  
        )
    }
    function noItemMessage() {
        return <>
            <h2>Your Cart is empty</h2><br /> <Link to='/shop'>Continue shopping</Link>
        </>
    }

  
    return (
        <>
        <div className='container-lg cart-container'>
            <h1>Tickets Cart</h1>
            <div className="cart-body">
                <Row className="justify-content-center">
                    <Col sm={12} md={8}>
                        <div>
                            <ul className="list-unstyled">
                                {items.length > 0 ? showItems(items) : noItemMessage()} 
                            </ul>
                        </div> 
                    </Col>
                    <Col sm={12} md={4} >
                        <h2 className='cart-checkout'>Check Out</h2>
                        <CheckOut product={items} />
                    </Col>
                </Row>
            </div>
        </div>
        </>
    )
    
}