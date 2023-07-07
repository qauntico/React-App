import React, {useState, useEffect} from "react";
import { searchProduct } from "./apiCore";
import { useLoaderData } from "react-router-dom";
import Cart from "./card";

export default function Search(){
    const loadedCategories = useLoaderData()
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });
    const {categories, category, search, results, searched} = data;

    function searchData(){
        if(search){
            searchProduct({search: search, category: category})
                .then(response => {
                    if(response.data){
                        console.log(response.error)
                    }else{
                        setData({...data, results: response, searched: true})
                    }
                })
        }
    }
    function searchSubmit(e){
       e.preventDefault();
       searchData()
    }
    function handleChange(e){
        const name = e.target.name
        setData({...data, [name]: e.target.value,searched: false})
    }
    function searchedProducts(results = []){
        return <div>
            {results.map((product,indx) => (
                <Cart key={indx} product={product} />
            ))}
        </div>
    }
    function searchForm(){
        return <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group-prepend">
                    <select className="btn mr-2" name="category" onChange={handleChange}>
                        <option value='All'>Pick Category</option>
                        {loadedCategories.map((cat, id) => (
                            <option key={id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <input 
                    type='search' 
                    name="search"
                    onChange={handleChange}
                    placeholder="search by name" />
                </div>
                <button className="input-group-prepend">Search</button>
            </span>  
        </form>
    }
    return <>
        <div style={{marginTop: '200px'}}>
            <div>

                {searchForm()}
                {searchedProducts(results)}
            </div>
        </div>
    </>
}