import CartManager from "../controllers/cartManager.js";
import { Router } from "express";

//----------------------------------------------------------CART ROUTER --------------------------------------------------------------------------

const cartRouter = Router(); // <-- creo el router
const cartManager = new CartManager("./carts.json"); // <-- Instancio la clase con el path.

// La ruta raíz POST / (crea un carrito con { id : id, products = []})
cartRouter.post("/", async (req, res) => {
  try {
    res.send(await cartManager.addCart(req.body)); // en el body debo poner [] porque así hice la función.
  } catch (err) {
    res.send(err);
  }
});

//"La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado.
cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    let cId = parseInt(req.params.cid);
    let pId = parseInt(req.params.pid);
    await cartManager.addProductToCart(cId, pId);
    res.send();
  } catch (err) {
    res.send(err);
  }
});

//La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
cartRouter.get("/:cid", async (req, res) => {
  try {
    let cId = parseInt(req.params.cid);
    const productList = await cartManager.getProductsByidCart(cId);
    res.send(productList);
  } catch (err) {
    res.send(err);
  }
});

export { cartRouter }; // --> Exporto la ruta
