import React, {useState, useEffect} from "react";
import { useLoaderData } from "react-router-dom";

export default function CheckBox({handlefilters}){
    const [checked, setChecked] = useState([]);
    const data = useLoaderData();
   
    
    function handleChange(id) {
        //this is checking if that category is already in that array
        const currentCategoryId = checked.indexOf(id);
        const checkState = [...checked];
        if(!checkState.includes(id)){
            checkState.push(id)
        }else{
            checkState.splice(currentCategoryId, 1)
        }
        setChecked(checkState)
        handlefilters(checkState)
        //console.log(checked)
    }  
    return data.map((category,index) => (
        <li  key={index}>
            {/* we are putting the handle change into an arrow function so that it doesn't invoke the state immediately when the component is rendered */}
            <input type="checkbox" onChange={() => handleChange(category._id) } 
             checked={checked.includes(category._id)} />
            <label > {category.name}</label>
        </li>
    ))
}