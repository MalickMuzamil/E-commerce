import React from 'react';
import CategoryPage from '../../Admin Panel/Components/pages/Category/Category'
import DashBoardRecord from '../../Admin Panel/Components/pages/Record/DashBoardRecord';
import MensPage from '../../Admin Panel/Components/pages/MenPage/MenPage.js'
import WomenPage from '../../Admin Panel/Components/pages/WomenPage/WomenPage.js'
import KidsPage from '../../Admin Panel/Components/pages/KidsPage/KidsPage.js'
import Test from '../../Admin Panel/test.js';



const adminRoutes = [
    { index: true, element: <DashBoardRecord /> },
    { 
        path: "category", 
        element: <Test />,
        children: [
            { path: "", element: <CategoryPage /> },
            { path: "mens", element: <MensPage /> },
            { path: "women", element: <WomenPage /> },
            { path: "kid", element: <KidsPage /> },
        ]
    }
];



export default adminRoutes;
