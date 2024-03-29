import express, { json, urlencoded } from "express";
import { engine } from "express-handlebars";
import router from "./routes/router.js";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import { RealTimeManager } from "./RealTimeManager.js";

const app = express();
const PORT = 8080;
const realTimeManager = new RealTimeManager("products.json");

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
const io = new Server(httpServer);

app.use(json());
app.use(urlencoded({ extended: true }));

app.engine("handlebars", engine());

app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.use("/", router);

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");

  socket.on("agregarProducto", (newProduct) => {
    console.log("Nuevo producto recibido backend:", newProduct);
    realTimeManager.addProduct(newProduct);
    // io.emit("nuevoProductoAgregado", newProduct);
  });

  socket.on("eliminarProducto", (productId) => {
    const id = Number(productId);
    // console.log(id);
    realTimeManager.deleteProductById(id);
  });
});
