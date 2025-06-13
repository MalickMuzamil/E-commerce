import React from 'react'
import './Carousel2.css'

export default function Carousel2() {
    return (
        <>

            <div id="carouselExampleIndicators" className="carousel slide carousel-width my-5 mx-5" data-bs-ride="carousel" data-bs-interval="2000">
                <div className="carousel-indicators">
                    <button type="button" className="carousal-button active" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" className="carousal-button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" className="carousal-button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="card">
                            <div className="card-body p-5">
                                <p className="card-text">Samsa was a travelling salesman and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. </p>
                                <span className='text-dark fw-bold'>___ John Smith</span>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="card">
                            <div className="card-body p-5">
                                <p className="card-text">Samsa was a travelling salesman and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. </p>
                                <span className='text-dark fw-bold'>___ John Smith</span>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="card">
                            <div className="card-body p-5">
                                <p className="card-text">Samsa was a travelling salesman and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. </p>
                                <span className='text-dark fw-bold'>___ John Smith</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
