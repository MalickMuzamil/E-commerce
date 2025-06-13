import express from 'express';
import DeleteCategory from '../Controller/DeleteCategoriesController.js';


const router = express.Router();

router.delete("/women/:id", DeleteCategory.WomenDeleteController)
router.delete("/men/:id", DeleteCategory.MenDeleteController)
router.delete("/category/:id", DeleteCategory.CategoryDeleteController)
router.delete("/kid/:id", DeleteCategory.KidDeleteController)

export default router;