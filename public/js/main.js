const socket = io(); // creo una conexion

// onClick.addProduct()
function addProduct() {

//obtengo las constantes del formulario
const title = document.getElementById("title").value;
const description = document.getElementById("description").value;
const price = document.getElementById("price").value;
const thumbnail = document.getElementById("thumbnail").value;
const code = document.getElementById("code").value;
const stock = document.getElementById("stock").value;
const category = document.getElementById("category").value;
const status = document.getElementById("status").value;

//Creo el producto nuevo
const newProduct = {
  title: title,
  description: description,
  price: price,
  thumbnail: thumbnail,
  code: code,
  stock: stock,
  category: category,
  status: status
};

socket.emit("new-product", newProduct); //emito el nuevo producto al socket
}
// onClick.deleteProduct()
function deleteProduct() {
  const idProduct = document.getElementById("id").value;
  socket.emit("del-product", idProduct); // emito el id al socket.
}

function render(products) {
  // crea una constante html
  const html = products.map((product) => {
    return `<div>
        <h2>Titulo: ${product.title}</h2>
        <p>Descripción: ${product.description}</p>
        <p>Precio: $${product.price}</p>
        <p>Código: ${product.code}</p>
        <p>Stock: ${product.stock}</p>

        </div>`
  });
  document.getElementById("productsContainer").innerHTML = html;
}

socket.on("products", (products) => {
  // se queda escuchando mensajes y si recibo un producto, ejecuto rende con la info
  render(products); // envía el mensaje con le función de arriba
});
