import React, {useState} from "react";
import ShowImage from "./showIimage";
import { Link } from "react-router-dom";

export default function Cart(props){
    const item = props;
    return <>
        <div style={{marginTop: '50px', marginBottom: '10px', border: '1px solid black'}}>
            <ShowImage item={item} url='product' /> 
            <h3>{props.name}</h3>
            <h3>{props.description}</h3>
            <h3>{props.price}</h3>
            <Link to={`/product/${props.id}`}>
                <button >view product</button>
            </Link>
            <Link to={``}>
                    <button >Add to cart sir</button>
                </Link>
        </div>
    </>
}