const {applyFiltering, applyPagination, applySorting} = require('../utils/ProductUtils')
const {readFile} = require('../utils/filesUtils')
const {Product} = require('../model/Product')
const fs = require('fs');
const getProduct = async (req, res) => {
  const { page, limit } = req.query;
  let { sort } = req.query;
  const { brand, inStock } = req.query;
  if (page != null && limit != null) {
    let pageInt = parseInt(page), limitInt = parseInt(limit);
    const data = await Product.find({}).skip((pageInt - 1) * limitInt).limit(limitInt)
    res.status(200).json({
      status: "Success",
      data,
      message: "Applied pagination",
    });
  } else if (sort != null) {
    sort = sort.startsWith('-') ? -1 : 1;
    const data = await Product.find({}).sort({price: sort});
    res.status(200).json({
      status: "Success",
      data,
      message: "Applied Sorting",
    });
  } else if (brand != null && inStock != null) {
    // const data = applyFiltering(brand, inStock);
    console.log(`brand: ${brand} inStock: ${inStock}`);
    const data = await Product.findOne({brand , inStock});
    res.status(200).json({
      status: "Success",
      data,
      message: "Applied Filteration",
    });
  } else {
    const data = await Product.find({});
    res.status(200).json({
      status: "Success",
      data,
      message: "All products in the inventory",
    });
  }
}

const getParticularProduct = async (req,res) => {
   try {
    const {productId} = req.params;
    console.log("Product", productId);
    const individualProduct = await Product.findOne({_id: productId});
    res.status(200).json({
    status: "Success",
    data: individualProduct,
    message: `Product Found in Product Inventory`
    })
   } catch (error) {
    res.status(500).json({
        status:"Failed",
        error,
        message:`Internal Failure`
    })
   }
}

const deleteParticularProduct = async (req,res) => {
   try {
     const {id} = req.params;
     await Product.findByIdAndDelete({_id: id});
     res.status(200).json({
        status:"Success",
        productId: id,
        message:"Product deleted successfully"
     })
   } catch (error) {
    res.status(404).json({
        status:"Failed",
        error,
        message:"Product with given id not found"
        })
   }
}

const createProduct = async (req, res) => {
    try {
    const {name, brand, price, inStock} = req.body;
    const newProduct = new Product(req.body);
    const product = await newProduct.save();
    res.status(201).json({
        status: "Success",
        data: product,
        message: "Product Created in the inventory",
    });
    } catch (error) {
        res.status(500).json({
        status: "Failed",
        error,
        message: "Product Creation Failed",
    });
    }
   
}
// CRUD
const updateParticularProduct = async (req, res) => {
    try {
        const {productId} = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(productId, {$set: req.body}, {new: true, runValidators: true});
        res.status(200).json({
            status:"Success",
            data: updatedProduct,
            message:"Product updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            error,
            message: "Product updation or product not found"
        })
    }
}
const partialUpdateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const partData = req.body;
        // validation on product data to update
        const updatedProduct = await Product.findByIdAndUpdate(id, {$set: partData}, {new: true, runValidators: true});
        res.status(200).json({
            status:"Success",
            data: updatedProduct,
            message:"Product Patched successfully"
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            error,
            message: "Product updation or product not found"
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