const express = require('express');
const productRouter = new express.Router();
const { getProduct,
        getParticularProduct,
        deleteParticularProduct,
        createProduct,
        updateParticularProduct,
        partialUpdateProduct
    } = require("../controller/productController")

productRouter.get('/products', getProduct);
productRouter.get('/products/:productId', getParticularProduct);
productRouter.post('/products/', createProduct);
productRouter.delete('/products/:id', deleteParticularProduct);
productRouter.put('/products/:productId', updateParticularProduct);
productRouter.patch('/products/:id', partialUpdateProduct);


module.exports = {productRouter};