import React from 'react'
import Navbars from '../../Navbar/Navbars'
import Footer from '../../../UI/Footer/Footer'
import WomenData from '../../../UI/Card Data Fetch/WomenData'
import './WomenCategory.css'

export default function WomenCategory() {
    return (
        <>
            <Navbars />

            <div className="container-fluid background-color">
                <div className="row">
                    <div className="col">
                        <WomenData />
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}
