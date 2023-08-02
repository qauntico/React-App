import SingleProfileOrders from "./SingleProfileOrders";
import moment from "moment";
import Badge from 'react-bootstrap/Badge';
import './UserProfile.css'

export default function CompleteProfileOrders({completeOrderDetails}){
    const {_id, amount, status, createdAt, updatedAt,products}  = completeOrderDetails;
    return (
        <>
           <div className='order-details'>
                <div className="order-id-container">
                    <div className="order-id-controller bg-light">
                        <div><span>ID: </span> {_id}</div>
                        {status == 'Processing' ? <Badge bg="primary" className="user-status">Processing</Badge> :
                        status == 'Delivered' ? <Badge bg="success" className="user-status">Delivered</Badge> : 
                        status == 'Shipped' ? <Badge bg="warning" text="dark" className="user-status">Pending</Badge> :
                        status == 'Cancelled' ? <Badge bg="danger" className="user-status">Cancelled</Badge> :
                        status == 'update Status' ? <Badge bg="danger" className="user-status">Not Processed</Badge> :
                        status == 'Not processed' ? <Badge bg="danger" className="user-status">Not Processed</Badge>: undefined}
                        <div><span>Amount:</span>  {amount} </div>
                        <div><span>Created:</span>  {moment(createdAt).fromNow()} </div>
                        <div><span>Updated:</span>  {moment(updatedAt).fromNow()} </div>
                    </div>   
                </div>
                <div className="order-body">
                    {products.map((data,index) => (
                        <SingleProfileOrders key={index} orderProducts={data} />
                    ))}
                </div>
            </div> 
        </>
    )
}