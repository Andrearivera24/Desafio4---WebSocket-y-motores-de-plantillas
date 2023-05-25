import ProductManager from "../controllers/productManager.js";
import { Router } from "express";

//------------------------------------------------------------------------------- Product Router--------------------------------------------------------------------------------------------------------------------

const productRouter = Router(); // <-- Creo el router
const productManager = new ProductManager("./products.json"); // <-- Instancio la clase con el path.

//--> La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior
productRouter.get("/", async (req, res) => {
  try {
    const limite = req.query.limite; // <-- /products ? limite = x
    const allProducts = await productManager.getProducts();
    if (!limite) {
      res.send(allProducts);
    } else {
      res.send(allProducts.slice(0, limite));
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//La ruta GET /:pid deberá traer sólo el producto con el id proporcionado
productRouter.get("/:pid", async (req, res) => {
  try {
    let pId = parseInt(req.params.pid);
    const productFound = await productManager.getProductById(pId);
    res.send(productFound);
  } catch (err) {
    res.status(404).send(err); //internal server error
  }
});

// --> La ruta raíz POST / deberá agregar un nuevo producto
productRouter.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      status,
    } = req.body;

    res.send(
      productManager.addProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status
      )
    ); // todo ha salido correcto.
  } catch (err) {
    res.status(400).send(err);
  }
});

//La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
productRouter.put("/:pid", async (req, res) => {
  try {
    const { title } = req.body;
    let pId = parseInt(req.params.pid); // convierto a número el pid.
    console.log(pId, title);
    res
      .status(201)
      .send(await productManager.updateProduct(pId, { title: title })); // llamo a la función upDate y le paso los argumentos como respuesta.
  } catch (err) {
    res.status(400).send(err);
  }
});

//La ruta DELETE /:pid deberá eliminar el producto con el pid indicado.

productRouter.delete("/:pid", async (req, res) => {
  try {
    //pid = el id de la posición indicada ej: si indicó 1, el id es 0
    const pId = parseInt(req.params.pid);
    res.send(await productManager.deleteProduct(pId));
  } catch (err) {
    res.status(400).send(err);
  }
});

export { productRouter }; // --> Exporto el router.
