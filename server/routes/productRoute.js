import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, productList ,productById, changeStock} from '../controllers/productController.js';

const productRouter = express.Router();


productRouter.post('/add', upload.array([images]),authSeller,addProduct)
productRouter.get('/list', productList)
productRouter.get('/id', productById)
productRouter.get('/stock', authSeller, changeStock)

export default productRouter;