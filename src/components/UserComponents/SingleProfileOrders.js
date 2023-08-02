
export default function SingleProfileOrders({orderProducts}){
    const {name, count, price} = orderProducts;
    
    return (
        <>
            <div className="order-body-details">
                <div><span>Name: </span> {name} </div>
                <div><span>No. Tickets: </span>{count} </div>
                <div><span>Price: </span>{price} </div>
            </div> 
        </>
    )
}