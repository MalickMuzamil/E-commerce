import express from 'express'
import AddCategories from '../Controller/AddCategoriesController.js';

const router = express.Router();

router.post("/", AddCategories.CategoryAddFunction);
router.post("/men", AddCategories.MensCategoryAddFunction);
router.post("/women", AddCategories.WomensCategoryAddFunction);
router.post("/kid", AddCategories.kidsCategoryAddFunction);

export default router;