import { useState, useEffect } from 'react';
import { listOrders,getStatusValues, updateOrderStatus } from './adminApi';
import { isAuthenticated } from '../auth/auth';
import moment from 'moment';
import './Order.css';
import { Badge,Form } from 'react-bootstrap';
import SuccessMessage from '../components/successAtlert';

export default function Orders(){
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);
    const {user, token} = JSON.parse(isAuthenticated());

    //load available orders
    function loadOrders(){
        listOrders(user._id,token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                setOrders(data)
            }
        })
    }

    //load all default order status values from the api
    function loadStatusValues(){
        getStatusValues(user._id,token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                setStatusValues(data)
            }
        })
    }

    //sends the status change to the backend
    function handleStatusChange(e, orderId){
        updateOrderStatus(user._id,token,orderId,e.target.value).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                loadOrders()
            }
        })
    }

    //show the update status select form
    function showStatus(o){
        return (
            <Form.Select aria-label="Default select example" onChange={(e) => (handleStatusChange(e, o._id))}>
                <option>update Status</option>
                {statusValues.map((status, i) => (
                    <option key={i} value={status}>{status}</option>  
                ))}
            </Form.Select>
        )
    }
    useEffect(() => {
        loadOrders();
        loadStatusValues();
    },[])

    //this a message if there are no Orders to update
    function NoOrders(){
        if(orders.length > 0){
            return 
        }else{
            return <SuccessMessage message='Admin You Currently Have No Orders To Update Status' />
        }
    }

 
    return <>
        <div className='container-lg order-main-body'>
            <h1>Update User Orders</h1>
            {NoOrders()}
            {orders.map((order, index) => {
                return  <div key={index}>
                            <div className='primary-order-container mb-4'>
                                <div className='bg-light order-title'>
                                    <p><span>OrderID:</span> {order._id}</p>
                                    <p><span>TransactionID:</span> {order.transaction_id}</p>
                                    {order.status == 'Processing' ? <Badge bg="primary" className="user-status">Processing</Badge> :
                                    order.status == 'Delivered' ? <Badge bg="success" className="user-status">Delivered</Badge> : 
                                    order.status == 'Shipped' ? <Badge bg="warning" text="dark" className="user-status">Pending</Badge> :
                                    order.status == 'Cancelled' ? <Badge bg="danger" className="user-status">Cancelled</Badge> :
                                    order.status == 'update Status' ? <Badge bg="danger" className="user-status">Not Processed</Badge> :
                                    order.status == 'Not processed' ? <Badge bg="danger" className="user-status">Not Processed</Badge>: undefined}
                                </div>
                                <div className='order-user-info'>
                                    <p><span>Name: </span>{order.user.name}</p>
                                    <p><span>Amount: </span>{order.amount}</p>
                                    <p><span>Date Opened: </span>{moment(order.createdAt).fromNow()}</p>
                                    <p><span>Address: </span>{order.address}</p>
                        
                                    <div className='order-status-update'>
                                    {showStatus(order)}
                                    </div>
                                </div>
                                <div className='order-products'>
                                    {order.products.map((product,index) => (
                                         <div className='order-individual-products' key={index}>
                                            <p><span>ProductID: </span>{product._id}</p>
                                            <p><span>Event Name: </span>{product.name}</p>
                                            <p><span>Price: </span>{product.price}</p>
                                            <p><span>No. Tickets: </span>{product.count}</p>
                                        </div>
                                    ))}
                                   
                                </div>
                            </div>
                        </div>
            })}
           
        </div>
    </>

};