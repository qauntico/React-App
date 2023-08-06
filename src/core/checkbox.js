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
        <div className="category" key={index} >
            <input 
                type="checkbox" 
                checked={checked.includes(category._id)}  
                name= {category.name}
                onChange={() => handleChange(category._id) }/>
            <label htmlFor={category.name}>{category.name}</label>
        </div>  
    ))
}