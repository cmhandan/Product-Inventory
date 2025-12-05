const {applyFiltering, applyPagination, applySorting} = require('../utils/ProductUtils')
const {readFile} = require('../utils/filesUtils')
const fs = require('fs');
const getProduct = (req, res) => {
  const { page, limit } = req.query;
  const { sort } = req.query;
  const { brand, inStock } = req.query;
  if (page != null && limit != null) {
    const data = applyPagination(page, limit);
    res.status(200).json({
      status: "Success",
      data,
      message: "Applied pagination",
    });
  } else if (sort != null) {
    const data = applySorting(sort);
    res.status(200).json({
      status: "Success",
      data,
      message: "Applied Sorting",
    });
  } else if (brand != null && inStock != null) {
    const data = applyFiltering(brand, inStock);
    res.status(200).json({
      status: "Success",
      data,
      message: "Applied Filteration",
    });
  } else {
    const data = readFile();
    res.status(201).json({
      status: "Success",
      data,
      message: "All products in the inventory",
    });
  }
}

const getParticularProduct = (req,res) => {
    const {productId} = req.params;
    console.log("Product", productId);
    const products = readFile();
    let product = products.find(prod => prod.id == productId);
    if (product) {
        res.status(201).json({
            status:"Success",
            product,
            message:`Product with ${productId} fetched Successfully`
        })
    } else {
        res.status(404).json({
            status:"Failed",
            data: null,
            message:"Product not found with given id"
        })
    }
}

const deleteParticularProduct = (req,res) => {
    const {id} = req.params;
    const products = readFile();
    const productInd = products.findIndex(prd => prd.id == id);
    if (productInd == -1) {
        res.status(404).json({
        status:"Failed",
        data:null,
        message:"Product with given id not found"
        })
    } else {
        products.splice(productInd,1);
        fs.writeFileSync('./data/Products.json', JSON.stringify(products));
        res.status(200).json({
            status:"Success",
            productId: id,
            message:"Product deleted successfully"
        })
    }
}

const createProduct = (req, res) => {
    const {name, brand, price, inStock} = req.body;
    const id = Math.floor(Math.random()*100);
    if (name == null || name.length == 0 || price < 0 || typeof(inStock) != 'boolean') {
        res.status(400).send("Invalid input");
    }
    const data = readFile();
    let isProductThere = data.find((prd) => prd.id == id);
    if (isProductThere) {
        res.status(400).json({
        status: "Failed",
        data: null,
        message: "Product already existed with given id",
        });
    } else {
        const product = {id, name, brand, price, inStock, createdAt:new Date()};
        data.push(product);
        fs.writeFileSync('./data/Products.json', JSON.stringify(data));
        res.status(201).json({
            status: "Success",
            data: product,
            message: "Product Created in the inventory",
        });
    }
}
const updateParticularProduct = (req, res) => {
    const {productId} = req.params;
    const {name, brand, price, inStock} = req.body;
    console.log(name, brand, price, inStock);
    if (name == undefined || brand == undefined || price == undefined || typeof inStock !== 'boolean' || price < 0) {
      return res.status(401).json({
            status: "Failed",
            data: null,
            message:"All fields are required and must be valid"
        })
    }
    const products = readFile();
    const productInd = products.findIndex(prd => prd.id == productId);
    const product = {
        id:productId,
        name,
        brand,
        price,
        inStock,
        createdAt:new Date()
    }
    if (productInd == -1) {
        res.status(404).json({
            status:"Failed",
            data:null,
            message:"Product with given id not found"
        })
    } else {
        products[productInd] = product;
        fs.writeFileSync('./data/Products.json', JSON.stringify(products));
        res.status(200).json({
            status:"Success",
            data: product,
            message:"Product updated successfully"
        })
    }
}
const partialUpdateProduct = (req, res) => {
    const {id} = req.params;
    const partData = req.body;
    const products = readFile();
    // validation on product data to update

    const productInd = products.findIndex(prd => prd.id == id);
    if (productInd == -1) {
        return res.status(404).json({
            status: "Failed",
            data: null,
            message:"Product not found in Inventory"
        })
    } else {
        let target = products[productInd];
        Object.assign(target, partData);
        products[productInd] = target;
        fs.writeFileSync('./data/Products.json', JSON.stringify(products));
        res.status(200).json({
            status:"Success",
            data: target,
            message:"Product Patched successfully"
        })
    }
}
module.exports = {
    getProduct,
    getParticularProduct,
    deleteParticularProduct,
    createProduct,
    updateParticularProduct,
    partialUpdateProduct
}