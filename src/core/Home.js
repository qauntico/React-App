import React, {useState, useEffect} from "react";
import {  json } from "react-router-dom";
import { getProduct } from "./apiCore";
import Cart from "./card";
import Search from "./Search";

export default function Home() {
    const [productBySales, setproductBySales] = useState([]);
    const [newProdcts, setNewProducts] = useState([]);

    //getting product by sales 
    function loadProductBySales(){
        getProduct('sold').then(data => {
            if(data.error){
               console.log(data.error) 
            }else{
                setproductBySales(data)
            }
        })
    }
    //getting product by date created
    function loadNewProducts(){
        getProduct('createdAt').then(data => {
            if(data.error){
               console.log(data.error) 
            }else{
                setNewProducts(data)
            }
        })
    }
    useEffect(() => {
        loadProductBySales();
        loadNewProducts();
    }, [])
    return <div style={{marginTop: '200px'}}>
        <Search />
    <h1>Category by sales</h1>
        {productBySales.map(product => (
            <Cart key={product._id} product={product} id={product._id} name={product.name} description={product.description} price={product.price} />
        ))}
    <h1>category by date</h1>
        {newProdcts.map(product => (
            <Cart key={product._id} product={product} name={product.name} description={product.description} price={product.price} />
        ))}
    </div>
}
