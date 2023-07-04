import React, {useState, useEffect} from "react";

export default function RadioBox({prices, handlefilters}){
    const [value, setValue] = useState(0);
    function handleChange(e){
        handlefilters(e.target.value)
        setValue(e.target.value)
    }
    return prices.map((price,index) => (
        <div  key={index}>
            {/* we are putting the handle change into an arrow function so that it doesn't invoke the state immediately when the component is rendered */}
            <input type="radio" onChange={handleChange} 
             value={price._id} name={price}/>
            <label >{price.name}</label>
        </div>))
}