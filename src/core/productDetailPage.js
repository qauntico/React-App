import React, {useState} from "react";
import ShowImage from "./showIimage";
import { Link } from "react-router-dom";
import moment from "moment/moment";

export default function SingleProduct(props){
    const item = props;
    function showStock(quantity){
        return quantity > 0 ? <span>In Stock</span>: <span>Out of Stock</span>
    }
    return <>
        <div style={{marginTop: '50px', marginBottom: '10px', border: '1px solid black'}}>
            <ShowImage item={item} url='product' /> 
            <h3>Product: {props.name}</h3>
            <h3>category: {props.category}</h3>
            <h3>description: {props.description}</h3>
            <h3>Price: {props.price}</h3>
            {showStock(props.quantity)}
            <h3>created on: {moment(props.date).fromNow()}</h3>
            <Link to={``}>
                    <button >Add to cart sir</button>
            </Link>
        </div>
    </>
}
