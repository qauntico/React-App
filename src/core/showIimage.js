import React from "react";

export default function ShowImage({item,url}){
    return  <>
                <img src={`http://localhost:8080/api/${url}/photo/${item._id}`} className="card-img-top product-card-image" alt={item.name}/>
            </>
}