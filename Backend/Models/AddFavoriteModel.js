import mongoose from 'mongoose';

const FavoriteCategories = new mongoose.Schema({
    category: { type: String, default: "" },
    brand: { type: String, default: "" },
    price: { type: String, default: "" },
    price: { type: String, default: "" },
    season: { type: String, default: "" },
    type: { type: String, default: "" },
    image: { type: String,  default: ""}
});

const favoriteCategory = mongoose.model("FavoriteCategory", FavoriteCategories);
export default favoriteCategory;    