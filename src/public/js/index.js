const socket = io();

socket.emit("connection", "nuevo cliente conectado");

document.getElementById("productForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const productTitle = document.getElementById("productTitle").value;
  const productDescription =
    document.getElementById("productDescription").value;
  const productPrice = document.getElementById("productPrice").valueAsNumber;
  const productThumbnail = document.getElementById("productThumbnail").value;
  const productCode = document.getElementById("productCode").value;
  const productStock = document.getElementById("productStock").valueAsNumber;
  const productCategory = document.getElementById("productCategory").value;
  // const productStatus = document.getElementById("productStatus").value;

  console.log(
    "Nuevo producto agregado:",
    productTitle,
    productDescription,
    productPrice,
    productThumbnail
  );

  socket.emit("agregarProducto", {
    title: productTitle,
    description: productDescription,
    price: productPrice,
    thumbnails: productThumbnail,
    code: productCode,
    stock: productStock,
    // status: productStatus,
    category: productCategory,
  });
});

socket.on("nuevoProductoAgregado", (newProduct) => {
  const productList = document.getElementById("productList");
  const li = document.createElement("li");
  li.textContent = newProduct.title;
  productList.appendChild(li);
});
