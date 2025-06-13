import React, {useEffect} from 'react'
import './Mainpage.css'
import Navbars from '../Navbar/Navbars';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '../../UI/Card/Card'
import CategoryCard from '../../UI/CategoryCard/CategoryCard'
import Carousel from '../../UI/Carousel/Carousel'
import Swipper from '../../UI/Swipper/Swipper'
import ImageSection from '../../UI/Imagee/images'
import Footer from '../../UI/Footer/Footer'

import cardimage from '../../images/img-4.jpg'
import cardimage2 from '../../images/img-7.jpg'
import cardimage3 from '../../images/img-11.jpg'
import webimage from '../../images/Web.png'
import sectionimage from '../../images/Section.jpg'
import ProductSwiper from '../../UI/Best Product Swiper/ProductSwiper'

import { Link } from 'react-router-dom';

export default function MainPage() {

    const navigate = useNavigate();

    useEffect(() => {

        const refreshToken = async () => {
            try {
                const currentToken = localStorage.getItem('authToken');
                if (!currentToken) {
                    console.log("No token found in localStorage");
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('username');
                    localStorage.removeItem('role'); 
                    navigate("/")
                    return;
                }

                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/refreshToken`, {
                    headers: {
                        'Authorization': `Bearer ${currentToken}`
                    }
                });

                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token);
                }

                else {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('username');
                    localStorage.removeItem('role'); 
                    navigate("/")
                }
            }

            catch (err) {
                console.error('Error refreshing token:', err.response?.data || err.message);

                if (err.response?.status === 401) {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('username');
                    localStorage.removeItem('role'); 
                    navigate("/")
                }
            }
        };

        refreshToken();

    }, [navigate]);


    return (
        <>

            <Navbars />

            <div>
                <Carousel />
            </div>

            <div className="container my-5">
                <div className='row'>
                    <div className='col-4'>
                        <Card image={cardimage} title="Spring Collection" button_title="Shop Now" linkPath="/Outfit/Spring" />
                    </div>
                    <div className='col-4'>
                        <Card image={cardimage2} title="Winter Collection" button_title="Shop Now" linkPath="/Outfit/Winter" />
                    </div>
                    <div className='col-4'>
                        <Card image={cardimage3} title="Summer Collection" button_title="Shop Now" linkPath="/Outfit/Summer" />
                    </div>
                </div>
            </div>
            <div>
                <Swipper title="Recent Products" />
            </div>


            <div className='my-5'>
                <div className='my-5  text-center'>
                    <h2 className='text-dark'>ADEW Category</h2>
                    <p>Our campaigns, latest trends and new collections</p>
                </div>

                <div className='container g-2 px-0'>
                    <div className="row mx-2">
                        <div className='col-2 px-0'>
                            <Link to="/Collection/Men" className='text-decoration-none'>
                                <CategoryCard title="Mens" image={webimage} />
                            </Link>
                        </div>

                        <div className='col-2 px-0'>
                            <Link to="/Collection/Women" className='text-decoration-none'>
                                <CategoryCard title="Women's" image={webimage} />
                            </Link>
                        </div>

                        <div className='col-2 px-0'>
                            <Link to="/Collection/T-Shirts" className='text-decoration-none'>
                                <CategoryCard title="T-Shirts" image={webimage} />
                            </Link>
                        </div>

                        <div className='col-2 px-0'>
                            <Link to="/Collection/Pants" className='text-decoration-none'>
                                <CategoryCard title="Pants" image={webimage} />
                            </Link>
                        </div>

                        <div className='col-2 px-0'>
                            <Link to="/Collection/Tops" className='text-decoration-none'>
                                <CategoryCard title="Tops" image={webimage} />
                            </Link>
                        </div>

                        <div className='col-2 px-0'>
                            <Link to="/Collection/Jackets" className='text-decoration-none'>
                                <CategoryCard title="Jackets" image={webimage} />
                            </Link>
                        </div>

                    </div>
                </div>
            </div >

            <div className='container-fluid my-5 position-relative'>
                <div className='row'>
                    <div className='col-12 px-0 position-relative'>
                        <img src={sectionimage} alt="error" className='image-section w-100' />
                        <div className='text-on-image2'>
                            <p className='trending-text'>Trending</p>
                            <h2>New Fashion</h2>
                            <p className='paragraph text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores nisi distinctio magni, iure deserunt doloribus optio</p>
                            <Link to="/Outfit/ShopNow">
                                <button type="button" className="button mt-3">Shop Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <ProductSwiper title="Best Products" />
            </div>

            <div className='my-5'>
                <ImageSection />
            </div>

            <div>
                <Footer />
            </div>

        </>
    )
}
