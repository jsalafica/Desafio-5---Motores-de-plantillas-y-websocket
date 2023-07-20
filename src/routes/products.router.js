import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const router = Router();
const productManager = new ProductManager("products.json");

router
  .route("/")
  .get(async (req, res) => {
    const { limit } = req.query;
    try {
      let response = await productManager.getProducts();
      if (limit) {
        let tempArray = response.filter((dat, index) => index < limit);
        // res.json({ data: tempArray, limit: limit, quantity: tempArray.length });
        res.render("home", { tempArray, hasAny: true, limit: true });
      } else {
        // res.json({ data: response, limit: false, quantity: response.length });
        if (response.length > 0) {
          res.render("home", { response, hasAny: true });
        } else {
          res.render("home", { hasAny: false });
        }
      }
    } catch (err) {
      console.log(err);
    }
  })
  .post(async (req, res) => {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;
    try {
      let response = await productManager.addProduct(
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        status,
        category
      );
      res.json({
        message: "producto agregado",
        data: response,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "error interno del servidor",
      });
    }
  });

router
  .route("/:pid")
  .get(async (req, res) => {
    const { pid } = req.params;
    let product = await productManager.getProductById(Number(pid));
    if (product) {
      res.json({ message: "success", data: product });
    } else {
      res.json({
        message: "error",
        data: "El producto solicitado no existe",
      });
    }
  })
  .put(async (req, res) => {
    const { pid } = req.params;
    const {
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category,
    } = req.body;
    let product = await productManager.updateProductById(
      Number(pid),
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category
    );
    if (product) {
      res.json({
        message: "Producto actualizado correctamente",
        data: product,
      });
    } else {
      res.json({
        message: "error",
        data: "El producto solicitado no existe",
      });
    }
  })
  .delete(async (req, res) => {
    const { pid } = req.params;
    let product = await productManager.deleteProductById(Number(pid));
    if (product) {
      res.json({ message: "Producto borrado exitosamente", data: product });
    } else {
      res.json({
        message: "error",
        data: "El producto solicitado no existe",
      });
    }
  });

export default router;
