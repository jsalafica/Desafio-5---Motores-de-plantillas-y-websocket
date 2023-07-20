import utils from "./utils.js";

export class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
    this.products = [];
  }
  static correlativoId = 0;

  async addCart() {
    try {
      let data = await utils.readFile(this.path);
      this.carts = data?.length > 0 ? data : [];
      if (this.carts.length === 0) {
        CartManager.correlativoId = 1;
      } else {
        CartManager.correlativoId = this.carts[this.carts.length - 1].id + 1;
      }
      const newCart = {
        id: CartManager.correlativoId,
        products: this.products,
      };
      this.carts.push(newCart);
      await utils.writeFile(this.path, this.carts);
      return { message: "Carrito creado exitosamente" };
    } catch (err) {
      console.log(err);
    }
  }

  async getProductsByCart(cid) {
    try {
      let data = await utils.readFile(this.path);
      let product = data.find((dato) => dato.id === cid);
      if (product !== undefined) {
        if (product.products.length > 0) {
          return { message: "success", productos: product.products };
        } else {
          return { message: `Carrito ${cid} sin productos` };
        }
      } else {
        return { message: `Carrito ${cid} inexistente` };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cid, pid, quantity) {
    let newProduct = [];
    if (cid == undefined || pid == undefined) {
      throw new Error("Todos los campos son obligatorios");
    }
    if (quantity === undefined) {
      quantity = 1;
    }
    try {
      let data = await utils.readFile(this.path);
      this.carts = data?.length > 0 ? data : [];
      const idCart = this.carts.findIndex((cart) => cart.id === cid);

      if (idCart === -1) {
        return { message: `Carrito ${cid} inexistente` };
      }

      const idProduct = this.carts[idCart].products.findIndex(
        (product) => product.product === pid
      );
      let message;
      if (idProduct !== -1) {
        let newQuantity =
          quantity + this.carts[idCart].products[idProduct].quantity;
        let data = { product: pid, quantity: newQuantity };
        this.carts[idCart].products[idProduct] = {
          ...this.carts[idCart].products[idProduct],
          ...data,
        };
        message = {
          message: `Producto ${pid} actualizado correctamente`,
          quantity: newQuantity,
        };
      } else {
        newProduct = {
          product: pid,
          quantity: quantity,
        };
        this.carts[idCart].products.push(newProduct);
        message = {
          message: `Producto agregado correctamente`,
          producto: newProduct,
        };
      }
      await utils.writeFile(this.path, this.carts);
      return message;
    } catch (error) {
      console.log(error);
    }
  }
}

export default { CartManager };
