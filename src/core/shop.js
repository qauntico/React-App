import React, {useState, useEffect} from "react";
import Cart from "./cart";
import { useLoaderData } from "react-router-dom";


export default function Shop(){
    const categories = useLoaderData();
    const [category, setCategory] = useState([]);
    useEffect(() => {
        setCategory(categories)
    },[])
    return <>
        <div className="row" style={{marginTop: '200px'}}>
            <div className="col-4">
                {JSON.stringify(categories)}
            </div>
            <div className="col-8">
                right
            </div>
        </div>
    </>
}