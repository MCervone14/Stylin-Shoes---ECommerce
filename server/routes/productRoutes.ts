import { Request, Response } from "express";
import express from "express";
import Product from "../models/Product.js";
const productRoutes = express.Router();

const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.json(products);
};

const getProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
};

productRoutes.route("/").get(getProducts);
productRoutes.route("/:id").get(getProduct);

export default productRoutes;
