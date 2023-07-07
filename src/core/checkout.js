import React from "react";
import { isAuthenticated } from "../auth/auth";
import { Link } from "react-router-dom";


export default function CheckOut({product}){
    const isAuth = isAuthenticated();
    function getTotal(){
        return product.reduce((currentValue, nextValue) => {
            
            return currentValue + nextValue.count * nextValue.price
        },0)
    }
    return <div>
        <h3>Total: ${getTotal()}</h3>
        {isAuth ?
         <button>Checkout</button>:
         <Link to='/signin'>
                <button>Signin to checkout</button>
            </Link>}
    </div>
}