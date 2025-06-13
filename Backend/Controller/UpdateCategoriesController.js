import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto'; // Ensure you have imported crypto

import WomenCategory from '../Models/WomenCategoryModel.js';
import MenCategory from '../Models/MensCategoryModel.js';
import KidCategory from '../Models/KidsCategoryModel.js';
import AllCategory from '../Models/AddCategoryModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, '..', 'upload');

class UpdateCategory {

    static deleteImageFile = (imageName) => {
        if (imageName) {
            const imageFilePath = path.join(uploadDir, imageName);
            if (fs.existsSync(imageFilePath)) {
                fs.unlinkSync(imageFilePath);
                console.log(`Deleted old image: ${imageFilePath}`);
            }
        }
    }

    static saveNewImage = (base64Data) => {
        const imageFileName = `${crypto.randomBytes(16).toString('hex')}.jpg`;
        const imageFilePath = path.join(uploadDir, imageFileName);

        fs.writeFileSync(imageFilePath, base64Data, 'base64');
        console.log(`New image saved to: ${imageFilePath}`);

        return imageFileName;
    }

    static WomenUpdateController = async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;

        try {
            const existingCategory = await WomenCategory.findById(id);

            if (!existingCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            if (updatedData.image) {
                const base64Data = updatedData.image.replace(/^data:image\/jpeg;base64,/, '');

                // Unlink the old image
                if (existingCategory.image) {
                    UpdateCategory.deleteImageFile(existingCategory.image);
                }

                // Save the new image
                const newImageFileName = UpdateCategory.saveNewImage(base64Data);
                updatedData.image = newImageFileName; // Update the image path in the updated data
            }

            const updatedCategory = await WomenCategory.findByIdAndUpdate(id, updatedData, { new: true });

            if (!updatedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.status(200).json(updatedCategory);
        } catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    }

    static MenUpdateController = async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;

        try {
            const existingCategory = await MenCategory.findById(id);

            if (!existingCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            if (updatedData.image) {
                const base64Data = updatedData.image.replace(/^data:image\/jpeg;base64,/, '');

                // Unlink the old image
                if (existingCategory.image) {
                    UpdateCategory.deleteImageFile(existingCategory.image);
                }

                // Save the new image
                const newImageFileName = UpdateCategory.saveNewImage(base64Data);
                updatedData.image = newImageFileName; // Update the image path in the updated data
            }

            const updatedCategory = await MenCategory.findByIdAndUpdate(id, updatedData, { new: true });

            if (!updatedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.status(200).json(updatedCategory);
        } catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    }

    static CategoryUpdateController = async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;

        try {
            const existingCategory = await AllCategory.findById(id);

            if (!existingCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            if (updatedData.image) {
                const base64Data = updatedData.image.replace(/^data:image\/jpeg;base64,/, '');

                // Unlink the old image
                if (existingCategory.image) {
                    UpdateCategory.deleteImageFile(existingCategory.image);
                }

                // Save the new image
                const newImageFileName = UpdateCategory.saveNewImage(base64Data);
                updatedData.image = newImageFileName; // Update the image path in the updated data
            }

            const updatedCategory = await AllCategory.findByIdAndUpdate(id, updatedData, { new: true });

            if (!updatedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.status(200).json(updatedCategory);
        } catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    }

    static KidUpdateController = async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;

        try {
            const existingCategory = await KidCategory.findById(id);

            if (!existingCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            if (updatedData.image) {
                const base64Data = updatedData.image.replace(/^data:image\/jpeg;base64,/, '');

                // Unlink the old image
                if (existingCategory.image) {
                    UpdateCategory.deleteImageFile(existingCategory.image);
                }

                // Save the new image
                const newImageFileName = UpdateCategory.saveNewImage(base64Data);
                updatedData.image = newImageFileName; // Update the image path in the updated data
            }

            const updatedCategory = await KidCategory.findByIdAndUpdate(id, updatedData, { new: true });

            if (!updatedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.status(200).json(updatedCategory);
        } catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    }
}

export default UpdateCategory;
