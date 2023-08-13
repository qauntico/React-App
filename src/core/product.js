import React, {useState, useEffect} from "react";
import { useRouteLoaderData } from "react-router-dom";
import SingleProduct from "./ProductDetailPage";
import { relatedProduct } from "./apiCore";


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
        <div style={{paddingTop: '100px'}}>
            <SingleProduct product={data} relatedProducts={products}/>
        </div>
    </>
}
//load the products immedaitely when the page loads
export async function loader({params}){
    const id = params.productId;
    const response = await fetch(`https://backend-c1rf.onrender.com/api/product/one/${id}`, {
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