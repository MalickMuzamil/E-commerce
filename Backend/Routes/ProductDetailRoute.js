import express from 'express';
import LoginController from '../Controller/LoginController.js';
import ProductDetailController from '../Controller/ProductDetailController.js';


const router = express.Router();

router.post("/search", LoginController.SearchQuery);

router.post("/addCart", ProductDetailController.AddCartFunction);
router.get("/fetchCart", ProductDetailController.FetchCartFunction)
router.delete("/removeCart/:id", ProductDetailController.DeleteCartFunction)

router.post("/add", ProductDetailController.AddFavorite);
router.get("/fetch", ProductDetailController.FetchFavorite);
router.delete("/remove/:id", ProductDetailController.DeleteFavorite)


export default router;