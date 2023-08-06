import React, {useContext, useState} from "react";
import ShowImage from "./showIimage";
import { Link,useNavigate } from "react-router-dom";
import { addItem, updateItem,removeItem } from "./cartHelpers";
import CartContex from "../Contex/Cart-Contex";
import moment from "moment";

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

    //trim the event description into 20 words 
    function trimParagraphToTenWords(description) {
        // Split the paragraph into an array of words
        const wordsArray = description.split(' ');
      
        // Take the first 10 words and join them back into a new paragraph
        const trimmedParagraph = wordsArray.slice(0, 10).join(' ');
      
        return trimmedParagraph;
      }
      
    
    return <>
        {shouldRedirect(redirect)}
        <div className="pb-3">
            <div className="card" style={{width: "18rem"}}>
                <Link to={`/event/${product._id}`} className="grow-on-hover">
                    <ShowImage item={product} url='product' /> 
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <h6 className="card-title cart-price">CFA {product.price}</h6>
                    <p className="card-text">{trimParagraphToTenWords(product.description)}.....</p>
                    <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        <Link to={`/event/${product._id}`}>
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                        </Link>
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addToCart}>Get Ticket</button>
                        </div>
                        <small className="text-body-secondary">{moment(product.createdAt).fromNow()}</small>
                    </div>
                </div>
            </div>
        </div>
    </>
}