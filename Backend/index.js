import express from 'express';
import bodyParser from 'body-parser';
import loginUser from './Routes/AuthLogin.js';
import AddCategory from './Routes/AdminRoutes.js';
import FetchCategory from './Routes/FetchRoutes.js'
import DeleteCategory from './Routes/DeleteRoute.js'
import UpdateCategory from './Routes/UpdateRoutes.js';
import ProductDetail from './Routes/ProductDetailRoute.js';
import { connectDB } from "./Config/DataBase.js";
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
app.use(cors())
const port = 3001;

connectDB();

app.use(bodyParser.json());
app.use(express.json());

const uploadDir = path.resolve('upload');
app.use('/upload', express.static(uploadDir));

app.use("/", loginUser);
app.use("/admin", AddCategory);
app.use("/admin/fetch", FetchCategory);
app.use("/admin/delete", DeleteCategory);
app.use("/admin/update", UpdateCategory);
app.use("/home", ProductDetail)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
