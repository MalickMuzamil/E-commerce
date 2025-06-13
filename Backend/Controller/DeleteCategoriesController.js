import WomensCategory from '../Models/WomenCategoryModel.js';
import MensCategory from '../Models/MensCategoryModel.js'
import Category from '../Models/AddCategoryModel.js'
import KidsCategory from '../Models/KidsCategoryModel.js'

class DeleteCategory {

    static WomenDeleteController = async (req, res) => {
        try {
            const { id } = req.params;
            const deletedCategory = await WomensCategory.findByIdAndDelete(id);
            if (!deletedCategory) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json({ message: 'Category deleted successfully', id });
        }
        catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    }

    static MenDeleteController = async (req, res) => {
        try {
            const { id } = req.params;
            const deletedCategory = await MensCategory.findByIdAndDelete(id);
            if (!deletedCategory) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json({ message: 'Category deleted successfully', id });
        }

        catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    }

    static CategoryDeleteController = async (req, res) => {
        try {
            const { id } = req.params;
            const deletedCategory = await Category.findByIdAndDelete(id);
            if (!deletedCategory) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json({ message: 'Category deleted successfully', id });
        }

        catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    }

    static KidDeleteController = async (req, res) => {
        try {
            const { id } = req.params;
            const deletedCategory = await KidsCategory.findByIdAndDelete(id);
            if (!deletedCategory) {
                res.status(404);
                throw new Error("Category not found");
                //return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json({ message: 'Category deleted successfully', id });
        }

        catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    }

}

export default DeleteCategory;