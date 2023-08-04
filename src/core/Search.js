import React, {useState} from "react";
import { searchProduct } from "./apiCore";
import { useLoaderData } from "react-router-dom";
import {Button, Container } from 'react-bootstrap';
import CardSearchItem from "./CardSearchItem";

export default function Search(){
    //get's the loaded categories from the route loader data when the component is mounted
    const loadedCategories = useLoaderData()
    const [data, setData] = useState({
        category: 'All',
        search: '',
        results: [],
        searched: false
    });
    const {category, search, results, searched} = data;
    //method that makes request to the backend
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
    //on submit method
    function searchSubmit(e){
       e.preventDefault();
       searchData()
    }
    //handle change method for the form 
    function handleChange(e){
        const name = e.target.name
        setData({...data, [name]: e.target.value,searched: false})
    }

    //display of related products
    function searchedProducts(results = []){
        return  <>
                    <div className="search-result-items">
                        {results.map((product,indx) => (
                            <CardSearchItem key={indx} product={product} />
                        ))}
                    </div> 
                </>
    }
    //the search form 
    function searchForms(){
        return(
            <>
                <div>
                    <form  role="search" >
                        <span className="input-group-text search-form-span">
                            <div className="search-form-icon">
                                <i className='bx bx-category' style={{color:'#919191'}} ></i>
                            </div>
                            <div className="search-select-field">
                                <select className="btn mr-2" name="category" onChange={handleChange}>
                                    <option value='All'>Category</option>
                                    {loadedCategories.map((cat, id) => (
                                        <option key={id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <input className="form-control me-1" 
                                name="search" type="search" 
                                placeholder="Search" 
                                aria-label="Search" 
                                onChange={handleChange} />
                            <Button variant="outline-secondary" className="search-form-button" onClick={searchSubmit}>Search</Button>                        
                        </span>  
                    </form> 
                </div>
                <div className="search-result">
                    <Container>
                        {searchedProducts(results)}
                    </Container>
                </div>
            </>
        )
    }
    return  <>
                {searchForms()}
            </>
}