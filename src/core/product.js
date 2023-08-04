import React, {useState, useEffect} from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import SingleProduct from "./productDetailPage";
import { relatedProduct } from "./apiCore";
import Cart from "./card";

export default function ProductDetails(){
    const data = useRouteLoaderData('singleEvent');
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getRelatedProducts()
    },[data]);
    function getRelatedProducts(){
        relatedProduct(data._id).then(result => {
            setProducts(result)
        }).catch(err => {
            console.log(err)
        })
    }
    return <>
        <div style={{marginTop: '200px'}}>
            <h1>product detail page</h1>
            <SingleProduct product={data}/>
            <Link to='edit/event'>Edit Event</Link>
            {products.map((product, index) => (
                <Cart key={index} product={product} name={product.name} id={product._id} description={product.description} />
            ))}
        </div>
    </>
}
//load the products immedaitely when the page loads
export async function loader({params}){
    const id = params.productId;
    const response = await fetch(`http://localhost:8080/api/product/one/${id}`, {
        method: 'GET',
        }).catch(err => {
            console.log(err)
        });
        const result = await response.json();
        if(response.ok){
            return result
        }else{
            return result
        }
}