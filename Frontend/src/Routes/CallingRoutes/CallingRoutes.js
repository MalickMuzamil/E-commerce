import { createBrowserRouter } from 'react-router-dom';
import Login from '../../Components/Login/Login.js';
import Signup from '../../Components/Signup/Signup.js';
import MainPage from '../../Components/MainPage/MainPage.js';
import Contact from '../../Components/Contact/Contact.js';
import Admin from '../../Admin Panel/admin/admin.js'
import adminRoutes from '../../Routes/AdminRoutes/AdminRoutes.js';
import MensCategory from '../../Components/Category Pages/Mens Category/MensCategory.js'
import WomenCategory from '../../Components/Category Pages/Women Category/WomenCategory.js';
import KidsCategory from '../../Components/Category Pages/Kids Category/KidsCategory.js';
import Cart from '../../Components/Cart Page/Cart.js';
import Favorites from '../../Components/Favorites/Favorites.js';
import FilteredCategoryData from '../../ADEW FilteredCategory/FilteredCategoryData.js';
import SeasonOutfit from '../../Components/Season OutFit/ShopNow.js';
import ProtectedRoutes from '../../Routes/Protected Routes/ProtectedRoutes.js'
import Blog from '../../Components/Blog/Blog.js';
import About from '../../Components/About/About.js';
import OTP from '../../UI/Check OTP/Otp.js'


const routes = [
    { path: "/", element: <Login /> },
    { path: "/signup", element: <Signup /> },

    { path: "/home", element: <ProtectedRoutes element={<MainPage />} />, },
    { path: "/about", element: <About /> },
    { path: "/contact", element: <Contact /> },
    { path: "/blog", element: <Blog /> },
    { path: "/cartDetails", element: <Cart /> },
    { path: "/FavoritesDetails", element: <Favorites /> },
    { path: "/mencategory/:category", element: <MensCategory /> },
    { path: "/womencategory/:category", element: <WomenCategory /> },
    { path: "/kidscategory/:category", element: <KidsCategory /> },

    {
        path: "/admin", element: <ProtectedRoutes element={<Admin />} />,
        children: [
            ...adminRoutes.map(route => ({
                ...route,
                element: <ProtectedRoutes element={route.element} />
            }))
        ],
    },

    { path: "/Collection/:category", element: <FilteredCategoryData /> },
    { path: "/Outfit/:season", element: <SeasonOutfit /> },
    { path: "/ForgetPassword", element: <OTP /> },

];

const callingRouter = createBrowserRouter(routes);

export default callingRouter;