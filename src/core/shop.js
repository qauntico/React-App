import React, {useState, useEffect} from "react";
import Cart from "./cart";
import CheckBox from "./checkbox";
import { useRouteLoaderData } from "react-router-dom";
import { price } from "./fixedPrices";
import RadioBox from "./radiobox";
import { getFilteredProducts } from "./apiCore";

export default function Shop(){
    const shopData = useRouteLoaderData('token');
    //console.log(shopData)
    const [myFilters, setMyFilters] = useState({
        filters: {category: [], price: []}
    });
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [data, setData] = useState([]);
    const [size, setSize] = useState(0);
    const [state, setState] = useState(false);
    //this loadFilterProducts is what makes the request to the api
    function loadFilterProducts(newFilters){
        getFilteredProducts(skip, limit, newFilters).then(result => {
            if(result.error){
                console.log(data.error)
            }else{
                setData(result.data)
                //console.log(data.size)
                setSize(data.size)
                setSkip(0)
            }
        })
    };
    useEffect(() => {
        setData(shopData.data)
        setSize(shopData.size)
    },[shopData])

    function handlefilters(filters, sort){
        const newFilters = {...myFilters};//creates a new  object an pass in the default object
        myFilters.filters[sort] = filters;//sets the sort which can either be product or category to their various arrays i.e updates their state
        if(sort == 'price'){
            let priceValue = handlePrice(filters);
            myFilters.filters[sort] = priceValue;
        }
        
        setMyFilters(newFilters)
        loadFilterProducts(myFilters.filters)
    } 
    //this method gets the actual price ranges from the price object base on the _id received
    function handlePrice(value){
        const data = price;
        for(let i = 0; i < data.length; i++){
            if(data[i]._id == value){
                return data[i].array
            }
        }
        return null
    }  

    function loadMore() {
        let toSkip = skip + limit
        getFilteredProducts(toSkip, limit, myFilters.filters).then(result => {
            if(result.error){
                console.log(data.error)
            }else{
                setData([...data, ...result.data])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

 
    function loadMoreButton(){
        return (
            size > 0 && size >= limit && 
            (
                <button onClick={loadMore}>load more</button>
            )
        )
    }


    return <>
        <div className="row" style={{marginTop: '200px'}}>
            <div className="col-4">
                <ul>
                    left
                    <CheckBox handlefilters={filters => handlefilters(filters,'category')}/>
                </ul>
                <div>
                    left
                    <RadioBox handlefilters={filters => handlefilters(filters,'price')} prices={price}/>
                </div>
            </div>
            <div className="col-8">
                {data.map((product,index) => (
                        <Cart key={index} product={product} id={product._id} name={product.name}  price={product.price} description={product.description}/>
                    ))}
                {loadMoreButton()}
            </div>
        </div>
    </>
}

export async function loader(){
    const data = {
        limit: 6,
        skip: 0,
        filters: {category: [], price: []}
    };
    const response = await fetch(`http://localhost:8080/api/products/by/Search`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        }).catch(err => {
            console.log(err)
        });
        const result = await response.json();
        if(response.ok){
            return result
        }else{
            return result
        }
};