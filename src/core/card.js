import React, {useContext, useState} from "react";
import ShowImage from "./showIimage";
import { Link,useNavigate } from "react-router-dom";
import { addItem, updateItem,removeItem } from "./cartHelpers";
import CartContex from "../Contex/Cart-Contex";

export default function Cart({product, update = false, showRemoveItemButton = false,setRun = f => f,run = undefined}){
    const data = useContext(CartContex);
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);
    const navigate = useNavigate();
    function addToCart(){
        addItem(product, ()=> {
            setRedirect(true)
        })
    }
    function shouldRedirect(redirect){
        if(redirect){
            navigate('/cart')
        }
    }
    const handleChange = productId => event => {
        setRun(!run)
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if(event.target.value >= 1){
           updateItem(productId, event.target.value) 
        }
    }
    function updateOption(update){
        return update && <div>
            <input type='number' value={count} onChange={handleChange(product._id)} />
        </div>
    }

    function handleRemoveProduct(){
        setRun(!run) 
        removeItem(product._id)
        data.toggle()
    }

    function removeItemButton(showButton){
        return (
            showButton && (
                <button 
                onClick={() => handleRemoveProduct()}
                >remove Product</button>
            )
        )
    }
    
    return <>
        {shouldRedirect(redirect)}
        <div style={{marginTop: '50px', marginBottom: '10px', border: '1px solid black'}}>

            <ShowImage item={product} url='product' /> 
            <h3>{product.name}</h3>
            <h3>{product.description}</h3>
            <h3>{product.price}</h3>
            {updateOption(update)}
            {removeItemButton(showRemoveItemButton)}
            <Link to={`/product/${product._id}`}>
                <button >view product</button>
            </Link>
            <Link to={``}>
                <button onClick={addToCart}>Add to cart sir</button>
            </Link>
        </div>
    </>
}