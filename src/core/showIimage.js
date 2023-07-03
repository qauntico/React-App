import React from "react";

export default function ShowImage({item,url}){
    return <div>
        <img src={`http://localhost:8080/api/${url}/photo/${item.id}`} alt={item.name} />
        </div>
}