import express from 'express';
import FetchCategories from '../Controller/FetchCategoriesController.js';

const router = express.Router();

router.get("/", FetchCategories.AllCategoryFetchController)
router.get("/kid", FetchCategories.kidsFetchController)
router.get("/men", FetchCategories.MensFetchController)
router.get("/women", FetchCategories.WomenFetchController)

export default router;