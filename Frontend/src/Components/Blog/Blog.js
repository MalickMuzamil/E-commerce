import React, { useEffect } from 'react'
import axios from 'axios';
import backimage from '../../images/AboutPic.jpg'
import image2 from '../../images/About Page.jpg'
import Carousel2 from '../../UI/Carousel2/Carousel2'
import Images from '../../UI/Imagee/images'
import Footer from '../../UI/Footer/Footer';
import Navbars from '../Navbar/Navbars';
import { useNavigate } from 'react-router-dom';

export default function Blog() {

    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const currentToken = localStorage.getItem('authToken');
                if (!currentToken) {
                    console.log("No token found in localStorage");
                    navigate("/");
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('username');
                    localStorage.removeItem('role'); 
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

                else{
                    navigate("/");
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('username');
                    localStorage.removeItem('role'); 
                }
            }

            catch (err) {
                console.error('Error refreshing token:', err.response?.data || err.message);
                
                if (err.response?.status === 401) {
                    navigate('/');
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('username');
                    localStorage.removeItem('role'); 
                }
            }
        };

        refreshToken();
    }, [navigate]);


    return (
        <>

            <Navbars />

            <div className="container-fluid ">
                <div className="row align-items-center my-5">
                    <div className="col-6 px-5">
                        <h2>Our Mission</h2>
                        <p className='w-75'>Pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me gregor then turned to look out the window at the dull weather deal to the day</p>

                        <h2>Goal Of Our Business</h2>
                        <p className='w-75'>Pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me gregor then turned to look out the window at the dull weather deal to the day</p>
                    </div>

                    <div className="col-6">
                        <img src={backimage} alt="Error" className='img-fluid' />
                    </div>
                </div>


                <div className="row align-items-center my-5">
                    <div className="col-8 px-0 d-flex justify-content-center">
                        <img src={backimage} alt="Error" className='img-fluid' />
                    </div>

                    <div className="col-4">
                        <h2>Our Mission</h2>
                        <p className='w-75'>Pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me gregor then turned to look out the window at the dull weather deal to the day</p>

                        <h2>Goal Of Our Business</h2>
                        <p className='w-75'>Pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me gregor then turned to look out the window at the dull weather deal to the day</p>
                    </div>
                </div>

                <div className="row align-items-center my-5">
                    <div className="col-6 px-5">
                        <h2>Our Mission</h2>
                        <p className='w-75'>Pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me gregor then turned to look out the window at the dull weather deal to the day</p>

                        <h2>Goal Of Our Business</h2>
                        <p className='w-75'>Pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me gregor then turned to look out the window at the dull weather deal to the day</p>
                    </div>

                    <div className="col-6">
                        <img src={backimage} alt="Error" className='img-fluid' />
                    </div>
                </div>


                <div className="row my-5 row-image-carousal">
                    <img src={image2} alt="Error" className="px-0" />

                    <div className="image-on-div mt-5">
                        <h3 className='mx-5 mt-5 text-light'>Client's Quote</h3>
                        <p className='mx-5 text-light'>Best Online Store in World to purchase online cloths.</p>

                        <div className='my-5 carousel-container'>
                            <Carousel2 />
                        </div>
                    </div>
                </div>

                <div className="row my-5">
                    <div className='my-5'> <Images /> </div>
                </div>

            </div>



            <Footer />

        </>
    )
}
