import { configureStore } from '@reduxjs/toolkit';
import  post_Categories_Data  from '../Reducers/CategoryReducer.js';
import Mens_Category_Reducer from '../Reducers/MensCategory.js';
import Womens_Category_Reducer from '../Reducers/WomensReducer.js'
import Kids_Category_Reducer from '../Reducers/KidsReducer.js'

import Favorite_Category_Reducer from '../Favourite/FavouriteItem.js'
import Cart_Category_Reducer from '../Cart/Cart.js'
import Search_Query_Reducer from '../SearchBar Reducer/SearchBar.js'

const store = configureStore({
    reducer: {
        mens_category : Mens_Category_Reducer,
        womens_category : Womens_Category_Reducer,
        kids_category : Kids_Category_Reducer,
        categories : post_Categories_Data,
        favorite_category : Favorite_Category_Reducer,
        Cart_category : Cart_Category_Reducer,
        search_query : Search_Query_Reducer,
    }
});

export default store;