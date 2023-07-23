import utils from "./utils.js";

export class RealTimeManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }
  static correlativoId = 0;

  async addProduct(product) {
    if (
      product.title == undefined ||
      product.description == undefined ||
      product.price == undefined ||
      product.code == undefined ||
      product.stock == undefined ||
      // status == undefined ||
      product.category == undefined
    ) {
      throw new Error("Todos los campos son obligatorios");
    }
    try {
      let data = await utils.readFile(this.path);
      this.products = data?.length > 0 ? data : [];

      let codeExists = this.products.some((dato) => dato.code == product.code);

      if (codeExists) {
        throw new Error("El codigo ya existe por favor verifique");
      } else {
        if (this.products.length) {
          RealTimeManager.correlativoId =
            this.products[this.products.length - 1].id + 1;
        } else {
          RealTimeManager.correlativoId = 1;
        }
        const newProduct = {
          id: RealTimeManager.correlativoId,
          title: product.title,
          description: product.description,
          price: product.price,
          code: product.code,
          stock: product.stock,
          status: true,
          category: product.category,
          thumbnails: !product.thumbnails ? "" : product.thumbnails,
        };
        this.products.push(newProduct);
        await utils.writeFile(this.path, this.products);
        return newProduct;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductById(pid) {
    try {
      // console.log(pid);
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
}

export default {
  RealTimeManager,
};
