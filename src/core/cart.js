import React, {useEffect, useState} from "react";
import { getCart } from "./cartHelpers";
import Cart from "./card";
import { Link } from "react-router-dom";
import CheckOut from "./checkout";

export function ShoppingCart(){
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);
    useEffect(() => {
        setItems(getCart())
    },[run])
    function showItems(items){
        return (
            <div>
                {items.map((product,i)=>(
                <Cart key={i} product={product} update={true} showRemoveItemButton={true} run={run} setRun={setRun}/>
                ))} 
            </div>  
        )
    }
    function noItemMessage() {
        return <>
            <h2>Your Cart is empty</h2><br /> <Link to='/shop'>Continue shopping</Link>
        </>
    }
    return <>
        <div style={{marginTop: '200px'}}>
            <h1>Cart page ohh</h1>
            {items.length > 0 ? showItems(items) : noItemMessage()}

        </div>
        <div>
            <h1>card summary</h1>
            <CheckOut product={items} />
        </div>
    </>
}