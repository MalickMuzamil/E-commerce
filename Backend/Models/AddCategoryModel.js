import mongoose from 'mongoose';

const AddCategories = new mongoose.Schema({
    category: { type: String, default: "" },
    brand: { type: String, default: "" },
    price: { type: String, default: "" },
    stock: { type: String, default: "" },
    type: { type: String, default: "" },
    season: { type: String, default: "" },
    image: { type: String, default: "" }
});

const AddCategory = mongoose.model("AllClothes", AddCategories);
export default AddCategory;