import AddCategory from '../Models/AddCategoryModel.js';
import MensNewCategory from '../Models/MensCategoryModel.js';
import WomensNewCategory from '../Models/WomenCategoryModel.js';
import kidsNewCategory from '../Models/KidsCategoryModel.js'

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, '..', 'upload');

class AddCategories {
    static CategoryAddFunction = async (req, res) => {

        const { category, brand, price, stock, image, type, season } = req.body;

        console.log("Received data:", req.body);

        let imagePath = '';

        if (image) {
            const imageFileName = `${crypto.randomBytes(16).toString('hex')}.jpg`;
            const imageFilePath = path.join(uploadDir, imageFileName);

            console.log("Generated image file name:", imageFileName);
            console.log("Full image file path:", imageFilePath);

            const base64Data = image.replace(/^data:image\/jpeg;base64,/, '');

            try {
                fs.writeFileSync(imageFilePath, base64Data, 'base64');
                console.log("Image saved to:", imageFilePath);

                imagePath = imageFileName;
            } catch (err) {
                console.error("Error writing image file:", err);
                return res.status(500).json({ message: 'Failed to save image' });
            }
        }

        try {
            const newCategory = new AddCategory({
                category: category,
                brand: brand,
                price: price,
                stock: stock,
                type: type,
                image: imagePath,
                season: season
            });

            await newCategory.save();
            res.status(201).json({ message: 'Category added successfully!' });
        }

        catch (error) {
            console.error('Error adding category:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static MensCategoryAddFunction = async (req, res) => {
        const { category, brand, price, stock, image, type, season } = req.body;

        console.log("Received data:", req.body);

        let imagePath = '';

        if (image) {
            const imageFileName = `${crypto.randomBytes(16).toString('hex')}.jpg`;
            const imageFilePath = path.join(uploadDir, imageFileName);

            const base64Data = image.replace(/^data:image\/jpeg;base64,/, '');

            try {
                fs.writeFileSync(imageFilePath, base64Data, 'base64');
                imagePath = imageFileName;
            }

            catch (err) {
                console.error("Error writing image file:", err);
                return res.status(500).json({ message: 'Failed to save image' });
            }
        }


        try {
            const Mens_Category = new MensNewCategory({
                category: category,
                brand: brand,
                price: price,
                stock: stock,
                image: imagePath,
                type: type,
                season: season
            });

            await Mens_Category.save();
            res.status(201).json({ message: 'Mens Category added successfully!' });
        }

        catch (error) {
            console.error('Error adding category:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }

        console.log("Mens ka Post Run ho rha ha.")
    }

    static WomensCategoryAddFunction = async (req, res) => {
        const { category, brand, price, stock, image, type, season } = req.body;

        console.log("Received data:", req.body);

        let imagePath = '';

        if (image) {
            const imageFileName = `${crypto.randomBytes(16).toString('hex')}.jpg`;
            const imageFilePath = path.join(uploadDir, imageFileName);

            const base64Data = image.replace(/^data:image\/jpeg;base64,/, '');

            try {
                fs.writeFileSync(imageFilePath, base64Data, 'base64');
                imagePath = imageFileName;
            }

            catch (err) {
                console.error("Error writing image file:", err);
                return res.status(500).json({ message: 'Failed to save image' });
            }
        }


        try {
            const Women_Category = new WomensNewCategory({
                category: category,
                brand: brand,
                price: price,
                stock: stock,
                type: type,
                season: season,
                image: imagePath,
            });

            await Women_Category.save();
            res.status(201).json({ message: 'Womens Category added successfully!' });
        }

        catch (error) {
            console.error('Error adding category:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }

        console.log("Womens ka Post Run ho rha ha.")
    }

    static kidsCategoryAddFunction = async (req, res) => {
        const { category, brand, price, stock, image, type, season } = req.body;

        console.log("Received data:", req.body);

        let imagePath = '';

        if (image) {
            const imageFileName = `${crypto.randomBytes(16).toString('hex')}.jpg`;
            const imageFilePath = path.join(uploadDir, imageFileName);
            const base64Data = image.replace(/^data:image\/jpeg;base64,/, '');

            try {
                fs.writeFileSync(imageFilePath, base64Data, 'base64');
                imagePath = imageFileName;
            }

            catch (err) {
                console.error("Error writing image file:", err);
                return res.status(500).json({ message: 'Failed to save image' });
            }
        }

        try {
            const Kid_Category = new kidsNewCategory({
                category: category,
                brand: brand,
                price: price,
                stock: stock,
                image: imagePath,
                type: type,
                season: season,
            });

            await Kid_Category.save();
            res.status(201).json({ message: 'Kids Category added successfully!' });
        }

        catch (error) {
            console.error('Error adding category:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }

        console.log("Kids ka Post Run ho rha ha.")
    }

}

export default AddCategories