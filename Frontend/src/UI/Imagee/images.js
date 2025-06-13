import React from 'react'
import './images.css'

import img1 from '../../images/1.jpg'
import img2 from '../../images/2.jpg'
import img3 from '../../images/3.jpg'
import img4 from '../../images/4.jpg'
import img5 from '../../images/5.jpg'
import img6 from '../../images/6.jpg'



export default function images() {
    return (
        <>
            <div className='container text-center'>
                <img src={img1} alt="Error" className='imagesclass'/>
                <img src={img2} alt="Error" className='imagesclass'/>
                <img src={img3} alt="Error" className='imagesclass'/>
                <img src={img4} alt="Error" className='imagesclass'/>
                <img src={img5} alt="Error" className='imagesclass'/>
                <img src={img6} alt="Error" className='imagesclass'/>    
            </div>

            <div className='box-div'> 
                <p className='box-para fs-5'>Follow Instagram <p className='fs-6'>@AZEWD-Cloths.com</p></p>
            </div>
        </>
    )
}
