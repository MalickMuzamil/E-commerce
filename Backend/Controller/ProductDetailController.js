import AddFavoriteCategory from '../Models/AddFavoriteModel.js'
import AddCartCategory from '../Models/AddCartCategoryModal.js';

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, '..', 'upload');


class ProductDetail {

    static AddFavorite = async (req, res) => {

        const favorite = req.body;
        const { category, brand, price, stock, season, type, image } = favorite;

        try {

            const Favorite_Category = new AddFavoriteCategory({
                category: category,
                brand: brand,
                price: price,
                stock: stock,
                image: image,
                season: season,
                type: type,
            });

            await Favorite_Category.save();
            res.status(201).json({ message: 'Favorite Category added successfully!' });
        }
        catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    }

    static FetchFavorite = async (req, res) => {
        try {
            const favorites = await AddFavoriteCategory.find();
            res.status(200).json(favorites);
        }
        catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    }

    static DeleteFavorite = async (req, res) => {
        try {
            const { id } = req.params;
            const deleteFavorite = await AddFavoriteCategory.findByIdAndDelete(id);

            if (!deleteFavorite) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json({ message: 'Category deleted successfully', id });
        }
        catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    }


    static AddCartFunction = async (req, res) => {

        const cart = req.body;
        const { category, brand, price, stock, quantity, type, season, image } = cart;

        try {
            const Cart_Category = new AddCartCategory({
                category: category,
                brand: brand,
                price: price,
                stock: stock,
                quantity: quantity,
                type: type,
                image: image,
                season: season,
            });

            await Cart_Category.save();
            res.status(201).json({ message: 'Category added successfully!' });
        }

        catch (error) {
            console.error('Error adding category:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static FetchCartFunction = async (req, res) => {
        try {
            const CartData = await AddCartCategory.find();
            res.status(200).json(CartData);
        }
        catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    }

    static DeleteCartFunction = async (req, res) => {
        try {
            const { id } = req.params;

            const deleteCart = await AddCartCategory.findByIdAndDelete(id);

            if (!deleteCart) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json({ message: 'Category deleted successfully', id });
        }
        catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    }


}

export default ProductDetail;