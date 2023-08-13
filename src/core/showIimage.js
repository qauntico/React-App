import React from "react";

export default function ShowImage({item,url}){
    return  <>
                <img src={`https://backend-c1rf.onrender.com/api/${url}/photo/${item._id}`} className="card-img-top product-card-image" alt={item.name}/>
            </>
}