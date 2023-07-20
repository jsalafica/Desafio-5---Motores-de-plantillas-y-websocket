import express, { json, urlencoded } from "express";
import { engine } from "express-handlebars";
import router from "./routes/router.js";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;

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
  socket.on("new-user", (data) => {
    socket.user = data.user;
    socket.id = data.id;
    io.emit("new-user-connected", {
      user: socket.user,
      id: socket.id,
    });
  });
  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messageLogs", messages);
  });
});

// app.listen(PORT, (error) => {
//   if (!error) {
//     console.log(`Server running port ${PORT}`);
//   } else {
//     console.log(error);
//   }
// });
