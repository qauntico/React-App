import React, {useState} from "react";

export default function RadioBox({prices, handlefilters}){
    const [value, setValue] = useState(0);
    function handleChange(e){
        handlefilters(e.target.value)
        setValue(e.target.value)
    }
    return prices.map((price,index) => (
        <div className="category" key={index} >
            {/* we are putting the handle change into an arrow function so that it doesn't invoke the state immediately when the component is rendered */}
            <input 
                type="radio" 
                value={price._id}
                name={price}
                onChange={handleChange}/>
            <label htmlFor={price.name}>{price.name}</label>
        </div>     
        ))
}