import { Router } from "express";
import { CartManager } from "../CartManager.js";

const router = Router();
const cartManager = new CartManager("carts.json");

router.route("/").post(async (req, res) => {
  try {
    let response = await cartManager.addCart();
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

router.route("/:cid").get(async (req, res) => {
  try {
    const { cid } = req.params;
    let response = await cartManager.getProductsByCart(Number(cid));
    res.json(response);
  } catch (error) {
    res.json({ message: "Error", error: error });
  }
});

router.route("/:cid/products/:pid").post(async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    let response = await cartManager.addProductToCart(
      Number(cid),
      Number(pid),
      quantity
    );
    res.json(response);
  } catch (error) {
    res.json({ message: "Error", error: err });
  }
});

export default router;
