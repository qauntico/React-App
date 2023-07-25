import { useEffect, useState } from 'react';
import './AdminDashBoardDesign.css';
import moment from 'moment';

export default function AdminOrderDesign({orders}){
    const [product ,setProduct] = useState({
        dateCreated: '',
    })
    const {dateCreated} = product
    const statusColor = ['status', orders.status == 'Processing' ? 'process' :
                             orders.status == 'Delivered' ? 'completed' : 
                             orders.status == 'Shipped' ? 'pending' :
                             orders.status == 'Cancelled' ? 'danger' :
                             orders.status == 'update Status' ? 'danger' :
                             orders.status == 'Not processed' ? 'danger': undefined];

    //convert the date created into a readable format
    function DateCreated(orders){
        const date = moment(orders.createdAt).fromNow();
        setProduct({...product, dateCreated: date})
    }

    useEffect(() => {
        DateCreated(orders)
    },[orders])
    return (
        <tr>
            <td>
                <p>{orders._id}</p>
            </td>
            <td>{dateCreated}</td>
            <td><span className={statusColor.join(' ')}>{orders.status}</span></td>
        </tr>
    )
}