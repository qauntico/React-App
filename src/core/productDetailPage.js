import React, {useEffect, useState} from "react";
import ShowImage from "./showIimage";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import './ProductDetailPage.css'
import { Row,Col,Button} from "react-bootstrap";
import { addItem } from "./cartHelpers";
import CardIcon from '../components/image/background2.jpg';
import { isAuthenticated } from "../auth/auth";
import SuccessMessage from "../components/successAtlert";
import RelatedProduct from "./ProductDetailPageRelatedEvents";
import { DeleteEvent } from "../admin/adminApi";

export default function SingleProduct({product,relatedProducts=[]}){
    const navigate = useNavigate();
    //the redirecting state
    const [redirect, setRedirect] = useState(false);
    const isAuth =JSON.parse(isAuthenticated());
    const [loading, setLoading] = useState(false)
    const token = isAuth && isAuth.token;
    const userId = isAuth && isAuth.user._id;
    function AddToCart(){
        addItem(product, ()=> {
            setRedirect(true)
        })
    }

    function RemoveEvent(){
        setLoading(true)
        DeleteEvent(userId,token,product._id).then(result => {
            if(result.error){
                setLoading(false)
                console.log(result.error)
            }else{
                setLoading(false)
                navigate('/shop')
            }
        })
    }


    //handles navigation to the cart page
    function ShouldRedirect(redirect){
        if(redirect){
            navigate('/cart')
        }
    }
    //displays stock availability
    function showStock(quantity){
        return quantity > 0 ? <span>Tickets Avalable</span>: <span>Not Available</span>
    }

    //handle the admin navigation to the edit event page
    function NavigateToEditEventPage(){
        navigate('edit/event');
    }

    //get's the event cover image for the event detail page
    const backgroundImageUrl = `url(http://localhost:8080/api/product/photo/${product._id})`;
    return (
        <>
           {ShouldRedirect(redirect)} 
            <main className="container">
                <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
                    <symbol id="geo-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/>
                    </symbol>
                    <symbol id="calendar3" viewBox="0 0 16 16">
                        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                    </symbol>
                </svg>

                <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-3 shadow-lg mb-4 main-event-detail-image" style={{backgroundImage: backgroundImageUrl}}>
                <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                    <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{product.name}</h3>
                    <ul className="d-flex list-unstyled mt-auto">
                    <li className="me-auto">
                        <img src={CardIcon} alt="icon" width="32" height="32" className="rounded-circle border border-white"/>
                    </li>
                    <li className="d-flex align-items-center me-3">
                        <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#geo-fill"/></svg>
                        <small>{product.category.name}</small>
                    </li>
                    <li className="d-flex align-items-center">
                        <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#calendar3"/></svg>
                        <small>{moment(product.createdAt).fromNow()}</small>
                    </li>
                    </ul>
                </div>
                </div>

                <div className="row g-5">
                <div className="col-md-8">
                    <div className="event-accessibility-body">
                        <div className="event-accessibility-title-body">
                            <h2 className="event-accessibility-title">Event details</h2>
                        </div>
                        <div className="event-accessibilty-info-body">
                            <Row>
                                <Col lg={6} sm={12}>
                                    <div className="event-location-body event-location">
                                        <div>
                                            <i className='bx bx-current-location' style={{color:'#66ACD2'}} ></i>
                                        </div>
                                        <h6>Location</h6>
                                    </div>
                                    <div className="start-date" >
                                        <p>{product.location}</p>
                                    </div>
                                </Col>
                                <Col lg={6} ms={12}>
                                    <div className="event-location-body event-time">
                                        <div>
                                            <i className='bx bx-time' style={{color:'#5975b3'}}></i>
                                        </div>
                                        <h6>Time</h6>
                                    </div>
                                    <div className="start-date">
                                        <p>Start Date: {product.startDate.slice(0, 10)}</p>
                                        <p>{product.startTime} - {product.endTime}</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="event-detail-buttons">
                            <button onClick={AddToCart} className="get-tickets">Get Tickets</button>
                            {isAuth && isAuth.user.role == 1 &&  <Button variant="secondary" className='edit-event' onClick={NavigateToEditEventPage}>Edit Event</Button>}
                        </div>
                        {isAuth && isAuth.user.role == 1 &&  <Button variant="outline-danger" onClick={RemoveEvent} disabled={loading}>{!loading ? 'Delete': 'Deleting Event...'}</Button>}
                    </div>
                    <article className="pt-4">
                    <h2 className="event-detail-headings">Event Description</h2>
                    <hr/>
                    <p>{product.description}</p>

                    <h2 className="event-detail-headings pt-5">Ticket Shipping</h2>
                    <hr/>
                    <p>{product.shipping ? 'Available ': 'Not Available'}</p>
                    
                    </article>
                </div>

                <div className="col-md-4">
                    <div className="position-sticky" style={{top: "2rem"}}>
                    <div className="p-4 mb-3 bg-body-tertiary rounded">
                        <h4 className="event-detail-headings">Availability</h4>
                        <p className="mb-0">{showStock(product.quantity)}</p>
                    </div>

                    <div>
                        <h4 className="event-detail-headings">Related Events</h4>
                        <ul className="list-unstyled related-product-behavior">
                        {relatedProducts.length == 0 && <SuccessMessage message='No Event Under Category' />}
                        {relatedProducts.map((product,index) => (
                            <RelatedProduct key={index} relatedProductDetail={product} />
                        ))}
                        </ul>
                    </div>

                    <div className="p-4">
                        <h4 className="fw-bold">Archives</h4>
                        <ol className="list-unstyled mb-0">
                        {/*you can add event lister links here */}
                        <li><a href="#">March 2021</a></li>
                        <li><a href="#">February 2021</a></li>
                        </ol>
                    </div>
                    </div>
                </div>
                </div>

            </main>
        
        
        </>
    )
    
}
