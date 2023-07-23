import { Router } from "express";
import { RealTimeManager } from "../RealTimeManager.js";

const router = Router();
const realTimeManager = new RealTimeManager("products.json");

router.route("/").get(async (req, res) => {
  try {
    let products = await realTimeManager.getProducts();
    res.render("realTimeProducts", { products });
  } catch (err) {
    console.log(err);
  }
});

export default router;
