import { Router } from "express";
import ProductManager from "../controllers/productManager.js"

const viewsRouter = Router(); // creo la ruta
const productManager = new ProductManager("./products.json"); // <-- Instancio la clase con el path.

viewsRouter.get('/', async (req, res)=>{
    const allProducts = await productManager.getProducts();
    res.render('home', {title: "Motores de plantillas y Socket.io", products:allProducts})
});

// también le envío los productos pero esta trabajará cono websockets. 
viewsRouter.get('/realtimeproducts', async (req, res)=>{
    const allProducts = await productManager.getProducts();

res.render('realtimeproducts', {title: "Motores de plantillas y Socket.io", products:allProducts})
});



export {viewsRouter};