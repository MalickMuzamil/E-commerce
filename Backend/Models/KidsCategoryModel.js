import mongoose from 'mongoose';

const KidsCategories = new mongoose.Schema({
    category: { type: String, default: "" },
    brand: { type: String, default: "" },
    price: { type: String, default: "" },
    stock: { type: String, default: "" },
    type: { type: String, default: "" },
    season: { type: String, default: "" },
    image: { type: String, default: ""}
});

const kidsCategory = mongoose.model("KidsClothes", KidsCategories);
export default kidsCategory;