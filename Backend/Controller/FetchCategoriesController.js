import AddCategory from '../Models/AddCategoryModel.js';
import MensNewCategory from '../Models/MensCategoryModel.js';
import WomensNewCategory from '../Models/WomenCategoryModel.js';
import kidsNewCategory from '../Models/KidsCategoryModel.js';


class FetchCategories {
    static kidsFetchController = async (req, res) => {

        try {
            const kidsData = await kidsNewCategory.find();
            res.status(200).json(kidsData);
        }

        catch (err) {
            console.error("Error fetching kids data:", err);
            res.status(500).json({ error: "Failed to fetch kids data" });
        }
    }

    static MensFetchController = async (req, res) => {

        try {
            const MensData = await MensNewCategory.find();
            res.status(200).json(MensData);
        }

        catch (err) {
            console.error("Error fetching Mens data:", err);
            res.status(500).json({ error: "Failed to fetch Mens data" });
        }
    }

    static WomenFetchController = async (req, res) => {

        try {
            const WomenData = await WomensNewCategory.find();
            res.status(200).json(WomenData);
        }

        catch (err) {
            console.error("Error fetching Women data:", err);
            res.status(500).json({ error: "Failed to fetch Women data" });
        }
    }

    static AllCategoryFetchController = async (req, res) => {

        try {
            const AllData = await AddCategory.find();
            res.status(200).json(AllData);
        }

        catch (err) {
            console.error("Error fetching All data:", err);
            res.status(500).json({ error: "Failed to fetch All data" });
        }
    }
}


export default FetchCategories;
