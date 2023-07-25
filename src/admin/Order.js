import { useState, useEffect } from 'react';
import { listOrders,getStatusValues, updateOrderStatus } from './adminApi';
import { isAuthenticated } from '../auth/auth';
import moment from 'moment';

export default function Orders(){
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);
    const {user, token} = JSON.parse(isAuthenticated());
    function loadOrders(){
        listOrders(user._id,token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                setOrders(data)
            }
        })
    }
    function loadStatusValues(){
        getStatusValues(user._id,token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                setStatusValues(data)
            }
        })
    }
    function handleStatusChange(e, orderId){
        updateOrderStatus(user._id,token,orderId,e.target.value).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                loadOrders()
            }
        })
    }
    function showStatus(o){
        return (
            <div>
                <h3>status: {o.status}</h3>
                <select onChange={(e) => (handleStatusChange(e, o._id))}>
                    <option>update Status</option>
                    {statusValues.map((status, i) => (
                      <option key={i} value={status}>{status}</option>  
                    ))}
                </select>
            </div>
        )
    }
    useEffect(() => {
        loadOrders();
        loadStatusValues();
    },[])

    function noOrders(){
        if(orders.length > 0){
            return (
                <h1>Total orders: {orders.length}</h1>
            )
        }else{
            return <h1>NO orders</h1>
        }
    }
    function showInput(key, value){
        return <div>
            <div>{key}</div>
            <input type='text' value={value} readOnly/>
        </div>
    }
    
    return <>
        <div style={{marginTop: '200px'}}>
            <h1>this are Orders</h1>
            {noOrders(orders)}
            {orders.map((order, index) => {
                return <div key={index}> 
                    <h2 className='mb-5'>
                       <span>Order: {order._id}</span> 
                       <ul>
                            <li>{showStatus(order)}</li>
                            <li>{order.user.name}</li>
                            <li>{order.amount}</li>
                            <li>Order on: {moment(order.createdAt).fromNow()}</li>
                       </ul>
                       <h3>{order.products.length}</h3>
                       <h3>{order.products.map((p,index) => (
                            <div>
                                {showInput('product name', p.name)}
                                {showInput('product price', p.price)}
                                {showInput('product total', p.count)}
                                {showInput('product Id', p._id)}
                            </div>
                       ))}</h3>
                    </h2>
                </div>

            })}
        </div>
    </>

};