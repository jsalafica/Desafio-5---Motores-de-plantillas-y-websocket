const socket = io();

socket.emit("connection", "nuevo cliente conectado");

const productForm = document.getElementById("productForm");

const submitHandler = (e) => {
  e.preventDefault();
  const productTitle = document.getElementById("productTitle").value;
  const productDescription =
    document.getElementById("productDescription").value;
  const productPrice = document.getElementById("productPrice").valueAsNumber;
  const productThumbnail = document.getElementById("productThumbnail").value;
  const productCode = document.getElementById("productCode").value;
  const productStock = document.getElementById("productStock").valueAsNumber;
  const productCategory = document.getElementById("productCategory").value;

  const productInfo = {
    title: productTitle,
    description: productDescription,
    price: productPrice,
    thumbnails: productThumbnail,
    code: productCode,
    stock: productStock,
    category: productCategory,
  };
  socket.emit("agregarProducto", productInfo);
  productForm.reset();
  window.location.reload();
};

productForm.addEventListener("submit", submitHandler);

// socket.on("nuevoProductoAgregado", (newProduct) => {
//   const productList = document.getElementById("productList");

//   const div = document.createElement("li");
//   div.innerHTML = `

//       <h3>Titulo: ${newProduct.title}</h3>
//       <p>Descripción: ${newProduct.description}</p>
//       <p>Código: ${newProduct.code}</p>
//       <p>Precio: ${newProduct.price}</p>
//       <img src=${newProduct.thumbnails}</img>
//       <br>
//       <button class="eliminarBtn" data-product-id="{{this.id}}">Eliminar</button>

//     `;

//   productList.appendChild(div);
// });

const btnDelete = document.querySelectorAll(".eliminarBtn");

btnDelete.forEach((boton) => {
  boton.addEventListener("click", function () {
    const productId = boton.getAttribute("data-product-id");
    socket.emit("eliminarProducto", productId);
    window.location.reload();
  });
});
