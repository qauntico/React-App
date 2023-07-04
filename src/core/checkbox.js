import React, {useState, useEffect} from "react";
import { useLoaderData } from "react-router-dom";

export default function CheckBox({handlefilters}){
    const [checked, setChecked] = useState([]);
    const data = useLoaderData();
    useEffect(() => {
        //we are passing in the filtes through useEffect to that we wait for 
        //for the state to be rendered first if we could do it in the handlechange method by that time the state will not
        //yet be updated only after that component is re rendered that the state is re rendered
        handlefilters(checked)
      }, [checked]);
    
    function handleChange(id) {
        //this is checking if that category is already in that array
        if(!checked.includes(id)){
            setChecked(previous => 
                [...previous,id]
            )
        }else{
            setChecked(previous => 
                    previous.filter(item => item !== id)
                )
        }
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