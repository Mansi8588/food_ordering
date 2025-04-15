import express from "express";
import{isSellerAuth,  sellerLogin,sellerLogout} from './controllers/sellerController.js'
import { sellerlogout } from "../controllers/sellerController";

import authSeller from "../middlewares/authSeller.js";

const sellerRouter= express.Router();

sellerRouter.post('/login',sellerLogin);
sellerRouter.get('/is-auth',authSeller,isSellerAuth);
sellerRouter.get('/is-logout',sellerLogout);

export default sellerRouter;