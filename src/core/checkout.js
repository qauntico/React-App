import React,{useEffect, useState} from "react";
import { isAuthenticated } from "../auth/auth";
import { Link } from "react-router-dom";
import { createOrder, getBrainTreeToken, processPayment } from "./apiCore";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "./cartHelpers";

export default function CheckOut({product}){
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address : ''
    })
    const isAuth = JSON.parse(isAuthenticated());
    const userId = isAuth && isAuth.user._id;
    const token = isAuth && isAuth.token;

    function getToken(userId, token){
        getBrainTreeToken(userId, token).then(data => {
            if(data.error){
                setData({...data, error: data.error})
            }else{
                setData({ clientToken: data.clientToken})
            }
        })
    }
    //get braintree token immedaitely the component mounts
    useEffect(() => {
        getToken(userId, token);
    },[getBrainTreeToken])

    function getTotal(product){
        return product.reduce((currentValue, nextValue) => {
            
            return currentValue + nextValue.count * nextValue.price
        },0)
    }

    function handleAddress(event){
        console.log(event.target.value)
        setData({...data,address:event.target.value})
    }
    function buy(){
        //we have to send nonce to server
        //none = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce =  data.instance.requestPaymentMethod()
        .then(data => {
            nonce = data.nonce;//once you have nonce which is the card type and card number) send nonce as paymentMethodNonce to  backend with the amount to be charged
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(product)
            };
            processPayment(userId, token, paymentData)
                    .then(response => {
                        console.log(data.address)
                        const createOrderData = {
                            products: product,
                            transaction_id: response.transaction_id,
                            amount: response.transaction.amount,
                            address: data.address
                        }
                        createOrder(userId,token,createOrderData);
                        setData({...data, success: response.success});
                        emptyCart(() => {
                            console.log("this was a success")
                        })
                    })
                        // empty cart
                        // create order

                        
        }).catch(err => {
            console.log('error',err);
            setData({...data,error: err.message});
        })
    };

    function showDropIn(){
        //onBlur is use so that when you click on any where on the page the error goes because when the error is displayed even when typing it dosen't go
        return <div onBlur={() => setData({...data,error: ''})}>
            {data.clientToken != null && product.length > 0 ? (
                <div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address: </label>
                        <textarea 
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."/>
                    </div>
                    <DropIn options={{
                        authorization: data.clientToken 
                    }} onInstance={instance => (data.instance = instance)} />
                    <button onClick={buy}>checkOut</button>
                </div>
            ) : null}
        </div>
    }

    function showError(error){
        return <div style={{display: error ? '' : 'none' }}>
            {error}
        </div>
    }

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Thanks! Your payment was successful!
        </div>
    );


    return <div>
        <h3>Total: ${getTotal(product)}</h3>
        {showSuccess(data.success)}
        {showError(data.error)}
        {isAuth ?
         <div>{showDropIn()}</div>:
         <Link to='/signin'>
                <button>Signin to checkout</button>
            </Link>}
    </div>
}