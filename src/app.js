import express from "express";
import { productRouter } from "./routes/products.router.js";
import { cartRouter } from "./routes/cart.router.js";
import { viewsRouter } from "./routes/views.router.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import ProductManager from "./controllers/productManager.js";
import status from "statuses";
const productManager = new ProductManager("./products.json");

const app = express();
const httpServer = app.listen(8080, () => {
  console.log("Listening on PORT 8080");
});

const socketServer = new Server(httpServer); // creo un nuevo servidor para trabajar con sockets, tiene el que ya creé.

app.use(express.static("public")); // Expongo como un sitio estático la carpeta public. acá vinculo la carpeta public
app.use(express.json()); // Middelare que parsea json
app.use(express.urlencoded({ extended: true })); // middleware para parsear los datos de la petición

//Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter); // ruta de plantillas

//Estructura de handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "views/"); //seteo la vista de la carpeta raíz vistas
app.set("view engine", "handlebars");

//--- WebSocket.

socketServer.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado"); //--> Mostrará el mensaje cada vez que un cliente nuevo se contecte.
  // al nuevo socket que se conecte enviale los productos actuales
  let products = await productManager.getProducts();
  socket.emit("products", products);

  //Escucho AddProduct()
  socket.on("new-product", async (product) => {
    console.log(product);
     let products = await productManager.addProduct(product);// esta función retorna todos los productos. 
     socketServer.emit("products", products); //send to all
  });
   //Escucho deleteProduct()
  socket.on("del-product", async (idProduct)=>{
    let products = await productManager.deleteProduct(idProduct);
    socketServer.emit("products", products)
  })
});
