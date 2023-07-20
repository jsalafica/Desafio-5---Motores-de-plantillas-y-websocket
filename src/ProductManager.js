import utils from "./utils.js";

export class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }
  static correlativoId = 0;

  async addProduct(
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    status,
    category
  ) {
    if (
      title == undefined ||
      description == undefined ||
      price == undefined ||
      code == undefined ||
      stock == undefined ||
      status == undefined ||
      category == undefined
    ) {
      throw new Error("Todos los campos son obligatorios");
    }
    try {
      let data = await utils.readFile(this.path);
      this.products = data?.length > 0 ? data : [];

      let codeExists = this.products.some((dato) => dato.code == code);

      if (codeExists) {
        throw new Error("El codigo ya existe por favor verifique");
      } else {
        ProductManager.correlativoId =
          this.products[this.products.length - 1].id + 1;
        const newProduct = {
          id: ProductManager.correlativoId,
          title,
          description,
          price,
          code,
          stock,
          status,
          category,
          thumbnails: !thumbnails ? "" : thumbnails,
        };
        this.products.push(newProduct);
        await utils.writeFile(this.path, this.products);
        return newProduct;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductById(
    pid,
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    status,
    category
  ) {
    if (
      pid == null ||
      title == undefined ||
      description == undefined ||
      price == undefined ||
      code == undefined ||
      stock == undefined ||
      status == undefined ||
      category == undefined
    ) {
      throw new Error("Todos los campos son obligatorios");
    }
    const productTemp = {};
    productTemp.title = title;
    productTemp.description = description;
    productTemp.code = code;
    productTemp.price = price;
    productTemp.status = status;
    productTemp.stock = stock;
    productTemp.category = category;
    productTemp.thumbnails = thumbnails;
    try {
      let products = await this.getProducts();
      this.products = products?.length > 0 ? products : [];
      let productIndex = products.findIndex((dato) => dato.id === pid);
      if (productIndex !== -1) {
        this.products[productIndex] = {
          ...this.products[productIndex],
          ...productTemp,
        };
        await utils.writeFile(this.path, products);
        return this.products[productIndex];
      } else {
        return { mensaje: "no existe el producto solicitado" };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductById(pid) {
    try {
      let products = await this.getProducts();
      this.products = products?.length > 0 ? products : [];
      let productIndex = products.findIndex((dato) => dato.id === pid);
      if (productIndex !== -1) {
        let product = this.products[productIndex];
        this.products.splice(productIndex, 1);
        await utils.writeFile(this.path, products);
        return product;
      } else {
        return { mensaje: "no existe el producto solicitado" };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      let data = await utils.readFile(this.path);
      return data?.length > 0 ? data : [];
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      let data = await this.getProducts();
      let product = data.find((dato) => dato.id === id);
      if (product !== undefined) {
        return product;
      } else {
        return "Producto inexistente.";
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default {
  ProductManager,
};
