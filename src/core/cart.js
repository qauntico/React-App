import React from "react";
import ShowImage from "./showIimage";

export default function Cart(props){
    const item = props
    return <>
        <div style={{marginTop: '50px', marginBottom: '10px', border: '1px solid black'}}>
            <ShowImage item={item} url='product' /> 
            <h3>{props.name}</h3>
            <h3>{props.description}</h3>
            <h3>{props.price}</h3>
            <button>view product</button>
        </div>
    </>
}