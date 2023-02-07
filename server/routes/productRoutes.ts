import { Request, Response } from "express";
import express from "express";
import product from "../models/product.js";
const productRoutes = express.Router();

const getProducts = async (req: Request, res: Response) => {
  const products = await product.find({});
  res.json(products);
};

productRoutes.route("/").get(getProducts);

export default productRoutes;
