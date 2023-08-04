import React, {useState} from "react";
import ShowImage from "./showIimage";
import { Link } from "react-router-dom";
import moment from "moment/moment";

export default function SingleProduct({product}){

    function showStock(quantity){
        return quantity > 0 ? <span>In Stock</span>: <span>Out of Stock</span>
    }
    return <>
        <div style={{marginTop: '50px', marginBottom: '10px', border: '1px solid black'}}>
            <ShowImage item={product} url='product' /> 
            <h3>Product: {product.name}</h3>
            <h3>category: {product.category.name}</h3>
            <h3>description: {product.description}</h3>
            <h3>Price: {product.price}</h3>
            {showStock(product.quantity)}
            <h3>created on: {moment(product.createAt).fromNow()}</h3>
            <Link to={``}>
                    <button >Add to cart sir</button>
            </Link>
        </div>
    </>
}
