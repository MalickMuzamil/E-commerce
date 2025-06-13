import mongoose from 'mongoose';

const AddCartCategories = new mongoose.Schema({
    category: { type: String, default: "" },
    brand: { type: String, default: "" },
    price: { type: String, default: "" },
    stock: { type: String, default: "" },
    image: { type: String,  default: ""},
    quantity: { type: String, default: ""},
    type: { type: String, default: ""},
    season: { type: String, default: ""},
});

const CartCategory = mongoose.model("Cart Details", AddCartCategories);
export default CartCategory;