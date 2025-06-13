import React from 'react'
import './Carousel.css'
import img1 from '../../images/slide-1.jpg'
import img2 from '../../images/slide-2.jpg'
import img3 from '../../images/slide-3.jpg'
import { Link } from 'react-router-dom'

export default function Carousel() {
    return (
        <>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className='row'>
                            <div className='text-on-pic'>
                                <p className='logo-text'>----Stylish Shoes</p>
                                <div className='heading-text'>
                                    <h2 className='heading-tag'>Great</h2>
                                    <h2 className='heading-tag'>LookBook</h2>
                                    <h2 className='heading-tag'>2021</h2>
                                    <Link to="/Outfit/ShopNow" >
                                        <button type="button" className="button mt-3">Shop Now</button>
                                    </Link>
                                </div>
                            </div>
                            <img src={img1} className="d-block w-100" alt="Error" />
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className='row'>
                            <div className='text-on-pic'>
                                <p className='logo-text'>----Stylish Shoes</p>
                                <div className='heading-text'>
                                    <h2 className='heading-tag'>Stylish</h2>
                                    <h2 className='heading-tag'>Coat</h2>
                                    <Link to="/Outfit/ShopNow">
                                        <button type="button" className="button mt-3">Shop Now</button>
                                    </Link>
                                </div>
                            </div>
                            <img src={img2} className="d-block w-100" alt="Error" />
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className='row'>
                            <div className='text-on-pic'>
                                <p className='logo-text'>----Stylish Shoes</p>
                                <div className='heading-text'>
                                    <h2 className='heading-tag'>Trendy</h2>
                                    <h2 className='heading-tag'>Collection</h2>
                                    <Link to="/Outfit/ShopNow" >
                                        <button type="button" className="button mt-3">Shop Now</button>
                                    </Link>
                                </div>
                            </div>
                            <img src={img3} className="d-block w-100" alt="Error" />
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </>
    )
}
