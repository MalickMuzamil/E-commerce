import React from 'react'
import './CategoryCard.css'

export default function CategoryCard({title, image}) {
    return (
        <>  
                    <div className="card-1">
                        <div className="card-img"><img src={image} className="img" alt='error'></img></div>
                        <div className="card-title-1 mb-0 mt-2">{title}</div>
                    </div>
        </>
    )
}
