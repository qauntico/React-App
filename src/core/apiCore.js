import queryString from 'query-string';
import { isAuthenticated } from '../auth/auth';
export async function getProduct(sortBy){
    const response = await fetch(`http://localhost:8080/api/products/?sort=${sortBy}&amount=6`, {
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
};
//request to get filer products
export async function getFilteredProducts(skip,limit,filters = {}){
    const data = {
        limit,
        skip,
        filters
    };
    const response = await fetch(`http://localhost:8080/api/products/by/Search`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        }).catch(err => {
            console.log(err)
        });
        const result = await response.json();
        if(response.ok){
            return result
        }else{
            return result
        }
};
//request to perform product search
export async function searchProduct(params){
    //this queryString package contains a method that takes a object and converts it to a query string
    const query = queryString.stringify(params)
    const response = await fetch(`http://localhost:8080/api/products/search?${query}`, {
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
};
//request to get related products
export async function relatedProduct(productId){
    const response = await fetch(`http://localhost:8080/api/products/related/${productId}`, {
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
};

export async function getBrainTreeToken(userId, token){
    const isAuth = JSON.parse(isAuthenticated());
    if(isAuth){
        const response = await fetch(`http://localhost:8080/api/braintree/getToken/${userId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        }).catch(err => {
            console.log(err)
        });
        const result = await response.json();
        if(response.ok){
            return result
        }else{
            return result
        }
    }else{
        return {error: ""}
    } 
};

export async function processPayment(userId, token,paymentData){
    const response = await fetch(`http://localhost:8080/api/braintree/payment/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
        }).catch(err => {
            console.log(err)
        });
        const result = await response.json();
        if(response.ok){
            return result
        }else{
            return result
        }
};
//create order in the backend
export const createOrder = (userId, token, createOrderData) => {
    return fetch(`http://localhost:8080/api/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createOrderData })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



