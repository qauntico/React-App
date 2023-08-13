import React, {useState, useEffect} from "react";
import Cart from "./card";
import CheckBox from "./checkbox";
import { useRouteLoaderData } from "react-router-dom";
import { price } from "./fixedPrices";
import RadioBox from "./radiobox";
import { getFilteredProducts } from "./apiCore";
import CardIcon from '../components/image/background2.jpg';
import './shop.css'
import { Container,Offcanvas,Button} from "react-bootstrap";

export default function Shop(){
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const shopData = useRouteLoaderData('token');
    //console.log(shopData)
    const [myFilters, setMyFilters] = useState({
        filters: {category: [], price: []}
    });
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [data, setData] = useState([]);
    const [size, setSize] = useState(0);

    //this loadFilterProducts is what makes the request to the api
    const  loadFilterProducts = (newFilters) => {
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
        setData(shopData.data);
        setSize(shopData.size);
    },[shopData]);
    //this take care of all the filters to be sent to the backend
    function handlefilters(filters, sort){
        const newFilters = {...myFilters};//creates a new  object an pass in the default object
        myFilters.filters[sort] = filters;//sets the sort which can either be product or category to their various arrays i.e updates their state
        if(sort == 'price'){
            let priceValue = handlePrice(filters);
            myFilters.filters[sort] = priceValue;
        }
        
        setMyFilters(newFilters)
        loadFilterProducts(myFilters.filters)
    };
    //this method gets the actual price ranges from the price object base on the _id received
    function handlePrice(value){
        const data = price;
        for(let i = 0; i < data.length; i++){
            if(data[i]._id == value){
                return data[i].array
            }
        }
        return null
    };

    //method to load more
    function loadMore(){
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
    };

    //button to load more products
   function  loadMoreButton(){
        return (
            size > 0 && size >= limit && 
            (
                <Button variant="secondary" onClick={loadMore}>load more</Button>
            )
        )
    };

    return (
        <>
            <Container  className='shop-main-background' fluid>
                {show && (
                    <>
                       <Offcanvas show={show} onHide={handleClose} responsive="lg">
                            <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Event Filters</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                            <div className="mb-0">
                                <div className="col-lg-3   col-xl-2 pt-3">
                                        <div  style={{top: "2rem"}}>
                                            <div className="p-4 mb-3 bg-body-tertiary rounded">
                                            <h4 className="fs">Category</h4>
                                            <div className="mb-0">
                                                <div className="category-sidebar">
                                                    <CheckBox handlefilters={filters => handlefilters(filters,'category')}/>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div  style={{top: "2rem"}}>
                                            <div className="p-4 mb-3 bg-body-tertiary rounded">
                                            <h4 className="fs">Price</h4>
                                            <div className="mb-0">
                                                <div className="category-sidebar">
                                                    <RadioBox handlefilters={filters => handlefilters(filters,'price')} prices={price}/>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas> 
                    </>
                )}
                
                <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-3 shadow-lg mb-4 main-event-detail-image shop-main-image" >
                    <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                        <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Event Tickets Emporium</h3>
                        <ul className="d-flex list-unstyled mt-auto">
                        <li className="me-auto">
                            <img src={CardIcon} alt="icon" width="32" height="32" className="rounded-circle border border-white"/>
                        </li>
                        
                        </ul>
                    </div>
                    </div>
                    <div className="filter-body">
                        <div>
                            <Button  variant="outline-secondary" className="d-lg-none" onClick={handleShow}>
                                <i className='bx bx-filter' ></i>
                            </Button>
                        </div>
                    </div>
                    <div className="row g-1">
                        <div className="col-lg-3 col-xl-2 pt-3 event-filters">
                            <div  style={{top: "2rem"}}>
                                <div className="p-4 mb-3 bg-body-tertiary rounded">
                                <h4 className="fs">Category</h4>
                                <div className="mb-0">
                                    <div className="category-sidebar">
                                        <CheckBox handlefilters={filters => handlefilters(filters,'category')}/>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div  style={{top: "2rem"}}>
                                <div className="p-4 mb-3 bg-body-tertiary rounded">
                                <h4 className="fs">Price</h4>
                                <div className="mb-0">
                                    <div className="category-sidebar">
                                        <RadioBox handlefilters={filters => handlefilters(filters,'price')} prices={price}/>
                                    </div>
                                </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-lg-8 col-xl-10 g-4">
                            <div className="shop-items">
                                    {data.map((product,index) => (
                                        <Cart key={index} product={product}/>
                                    ))}
                            </div>
                        </div>
                        {loadMoreButton()} 
                    </div>
                    
        `   </Container>
        </>
    )
    
}

export async function loader(){
    const data = {
        limit: 6,
        skip: 0,
        filters: {category: [], price: []}
    };
    const response = await fetch(`https://backend-c1rf.onrender.com/api/products/by/Search`, {
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