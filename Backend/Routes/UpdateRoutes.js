import express from 'express'
import UpdateCategory from '../Controller/UpdateCategoriesController.js'

const router = express.Router();

router.put("/women/:id", UpdateCategory.WomenUpdateController);
router.put("/men/:id", UpdateCategory.MenUpdateController);
router.put("/kid/:id", UpdateCategory.KidUpdateController);
router.put("/category/:id", UpdateCategory.CategoryUpdateController);


export default router;