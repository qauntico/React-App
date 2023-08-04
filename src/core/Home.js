import React, {useState, useEffect} from "react";
import { getProduct } from "./apiCore";
import Cart from "./card";
import Search from "./Search";
import './Home.css';
import HomeImage from './HomeImages/home-screen-image.png';
import CardIcon from '../components/image/background2.jpg';

export default function Home() {
    const [productBySales, setproductBySales] = useState([]);
    const [newProdcts, setNewProducts] = useState([]);

    //getting product by sales 
    function loadProductBySales(){
        getProduct('sold').then(data => {
            if(data.error){
               console.log(data.error) 
            }else{
                setproductBySales(data)
            }
        })
    }
    //getting product by date created
    function loadNewProducts(){
        getProduct('createdAt').then(data => {
            if(data.error){
               console.log(data.error) 
            }else{
                setNewProducts(data)
            }
        })
    }
    useEffect(() => {
        loadProductBySales();
        loadNewProducts();
    }, [])


    function DefaultPrototype(){
        return (
            <>
                 <Search />
            </>
        )
    }
    return (
            <>
                <div className="home-primary-container">
                    <div className="home-page-background">
                        {/*The home page stating content*/}
                        <div className="search-bar">
                            <Search />
                        </div>
                        <div className='home-top-content'>
                            <div className="home-content">
                                <div className="home-content-data">
                                    <h1>Embrace the Moment: <span>Unite through Amazing Events!</span></h1>
                                    <p>
                                        Welcome to <span>Quantum|Evnets!</span> , where love unites in celebration! Join us in creating cherished memories and spreading happiness through exciting events. Embrace the joy of togetherness and discover your ticket to unforgettable experiences. Let's make every moment a celebration of love and happiness together!
                                    </p>
                                </div>
                            </div>
                            <div className="home-image">
                                <img src={HomeImage} alt="Home Image that conveys love" />
                            </div>
                        </div>
                        {/*icons used on the site*/}
                        <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
                            <symbol id="fast-delivery" viewBox="0 0 16 16">
                                <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362.798-.799.96-1.932.362-2.531-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532Z"/>
                                <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9.42 9.42 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a9.556 9.556 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093.067.017.12.033.16.045.184.06.279.13.351.295l.029.073a3.475 3.475 0 0 1 .157.721c.055.485.051 1.178-.159 2.065Zm-4.828 7.475.04-.04-.107 1.081a1.536 1.536 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a8.548 8.548 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006ZM5.205 5c-.625.626-.94 1.351-1.004 2.09a8.497 8.497 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107-.04.039Zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a2.835 2.835 0 0 0-.045-.283 3.078 3.078 0 0 0-.3-.041Z"/>
                                <path d="M7.009 12.139a7.632 7.632 0 0 1-1.804-1.352A7.568 7.568 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z"/>
                            </symbol>
                            <symbol id="customer" viewBox="0 0 16 16">
                                <path d="M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4Zm13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276Z"/>
                            </symbol>
                            <symbol id="key" viewBox="0 0 16 16">
                                <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
                                <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </symbol>
                            <symbol id="tickets" viewBox="0 0 16 16">
                                <path d="M4 4.85v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Z"/>
                                <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3h-13ZM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9V4.5Z"/>
                            </symbol>
                            <symbol id="geo-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/>
                            </symbol>
                        </svg>

                        {/*Event euphoria section*/}
                        <div className="container px-4 py-5" id="custom-cards">
                            <h2 className="pb-2 border-bottom home-page-title">Event Euphoria<i className='bx bxs-heart bx-tada' ></i></h2>

                            <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                            <div className="col">
                                <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg card-image-1" >
                                <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                    <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Epic Adventures: Thrills Await You!</h3>
                                    <ul className="d-flex list-unstyled mt-auto">
                                    <li className="me-auto">
                                        <img src={CardIcon} alt="icon" width="32" height="32" className="rounded-circle border border-white"/>
                                    </li>
                                    <li className="d-flex align-items-center me-3">
                                        <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#geo-fill"/></svg>
                                        <small>Earth</small>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#calendar3"/></svg>
                                        <small>Now</small>
                                    </li>
                                    </ul>
                                </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg card-image-2"  >
                                <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                    <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Dance Fever: Let Your Spirit Soar!</h3>
                                    <ul className="d-flex list-unstyled mt-auto">
                                    <li className="me-auto">
                                        <img src={CardIcon} alt="icon" width="32" height="32" className="rounded-circle border border-white"/>
                                    </li>
                                    <li className="d-flex align-items-center me-3">
                                        <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#geo-fill"/></svg>
                                        <small>Earth</small>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#calendar3"/></svg>
                                        <small>Now</small>
                                    </li>
                                    </ul>
                                </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg card-image-3" >
                                <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                                    <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Laughter Galore: Comedy at its Best!</h3>
                                    <ul className="d-flex list-unstyled mt-auto">
                                    <li className="me-auto">
                                        <img src={CardIcon} alt="icon" width="32" height="32" className="rounded-circle border border-white"/>
                                    </li>
                                    <li className="d-flex align-items-center me-3">
                                        <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#geo-fill"/></svg>
                                        <small>Earth</small>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#calendar3"/></svg>
                                        <small>Now</small>
                                    </li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        {/*Most purchase events*/}
                        <div className="container px-4 py-5" id="custom-cards">
                            <h2 className="pb-2 border-bottom home-page-title">Most Purchase Events</h2>
                            <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-3">
                                {productBySales.map(product => (
                                    <Cart key={product._id} product={product}/>
                                ))}
                            </div>
                            
                        </div>
                        {/*Recent events*/}
                        <div className="container px-4 py-5" id="custom-cards">
                            <h2 className="pb-2 border-bottom home-page-title">Recent Events</h2>
                            <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-3">
                                {newProdcts.map(product => (
                                    <Cart key={product._id} product={product} />
                                ))}
                            </div>
                            
                        </div>
                        <div className="container px-4 py-5" id="icon-grid">
                            <h2 className="pb-2 border-bottom home-page-title">Trust & Reliability</h2>

                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
                                <div className="col d-flex align-items-start">
                                    <svg className="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlinkHref="#fast-delivery"/></svg>
                                    <div>
                                    <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">Timely Delivery: </h3>
                                    <p>Tickets in Your Hands, Fast and Secure</p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <svg className="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlinkHref="#tickets"/></svg>
                                    <div>
                                    <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">100% Authentic Tickets:</h3>
                                    <p>Genuine Passes to Your Dream Events!</p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <svg className="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlinkHref="#key"/></svg>
                                    <div>
                                    <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">Secure Transactions:</h3>
                                    <p>Your Payment, Our Responsibility!</p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <svg className="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlinkHref="#customer"/></svg>
                                    <div>
                                    <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">Featured title</h3>
                                    <p>Customer Satisfaction Guaranteed: Happiness Delivered, Always!</p>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
           </>
    )
    
}
