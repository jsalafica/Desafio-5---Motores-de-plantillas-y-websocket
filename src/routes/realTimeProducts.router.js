import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const router = Router();
const productManager = new ProductManager("products.json");

router.route("/").get(async (req, res) => {
  try {
    let products = await productManager.getProducts();

    res.render("realtimeproducts", { products });
  } catch (err) {
    console.log(err);
  }
});

export default router;
