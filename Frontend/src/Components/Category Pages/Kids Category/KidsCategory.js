import React from 'react'
import Navbars from '../../Navbar/Navbars'
import Footer from '../../../UI/Footer/Footer.js'
import KidsData from '../../../UI/Card Data Fetch/KidsData.js'

export default function KidsCategory() {
    return (
        <>

            <Navbars />

            <div className="container-fluid background-color" style={{backgroundColor: "#F1F6FA"}}>
                <div className="row">
                    <div className="col">
                        <KidsData />
                    </div>
                </div>
            </div>

            <Footer />

        </>
    )
}
