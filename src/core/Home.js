import React, {useState, useEffect} from "react";
import { useLoaderData, json } from "react-router-dom";
import { getProduct } from "./apiCore";
import Cart from "./cart";

export default function Home() {
    const [productBySales, setproductBySales] = useState([]);
    const [newProdcts, setNewProducts] = useState([]);
    console.log(productBySales)
    //const data = useLoaderData();
    //console.log(data)
    function loadProductBySales(){
        getProduct('sold').then(data => {
            if(data.error){
               console.log(data.error) 
            }else{
                setproductBySales(data)
            }
        })
    }
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
    <h1>Category by sales</h1>
    {productBySales.map(product => (
        <Cart key={product._id} id={product._id} name={product.name} description={product.description} price={product.price} />
    ))}
    <h1>category by date</h1>
    {newProdcts.map(product => (
        <Cart key={product._id} name={product.name} description={product.description} price={product.price} />
    ))}
    </div>
}
export async function loader(){
    const response = await fetch(`http://localhost:8080/api/products`, {
        method: 'GET',
        }).catch(err => {
            throw json(
                { message: err },
                {
                  status: 500,
                })
        });
        if(response.ok){
            return response
        }else{
            return response
        }
};