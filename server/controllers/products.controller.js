const Product = require("../models/product");
const _ = require("lodash");
const mongoose = require("mongoose");
const Brand = require("../models/brand");
const productsController = {
  getAll: async (req, res) => {
    const products = await Product.find();
    // console.log(products[1]);
    return res.status(200).send(products);
  },
  getByBrand: async (req, res) => {
    const brandIdString = req.body.brandId;
    try {
      const brandId = mongoose.Types.ObjectId(brandIdString);
      Product.find({ brand: brandId })
        .populate("brand")
        // .lean()
        .exec((err, products) => {
          if (err) {
            console.log(err);
            return res.status(400).send({ msg: "No Products Found" });
          } else {
            if (!products)
              return res.status(400).send({ msg: "No Products Found" });
            // const jsonProducts = JSON.stringify(products);
            // console.log(jsonProducts);
            res.status(200).send(products);
          }
        });
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  },
  getById: async (req, res) => {
    try {
      const idString = req.body.productId;
      const id = mongoose.Types.ObjectId(idString);
      Product.find({ _id: id })
        .populate("brand")
        .exec((err, product) => {
          if (err) {
            console.log(err);
            return res.status(400).send({ msg: "Product Not Found" });
          } else {
            if (!product) return res.status(400).send({ msg: "Product Not Found" });
            res.status(200).send(product);
          }
        });
    } catch (error) {
      return res.status(500).send({ msg: error.message });
    }
  },
  addProduct: async (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const ref = req.body.ref;
    const size = req.body.size;
    const imageFiles = req.files;
    const images = imageFiles.map((file) => {
      return file.path;
    });
    const description = req.body.description;
    const quantity = req.body.quantity;
    const category = req.body.category;
    const materials = req.body.materials;
    const colors = req.body.colors;
    const brand = req.body.brand;
    if (
      !name ||
      !price ||
      !ref ||
      !size ||
      !images ||
      !description ||
      !quantity ||
      !category ||
      !materials ||
      !colors ||
      !brand
    )
      return res.status(400).json({ msg: "Please fill in all fields." });
    const product = await Product.findOne({ ref });
    if (product)
      return res.status(400).json({ msg: "Product already exists." });
    try {
      const newProduct = new Product({
        name: name,
        price: price,
        ref: ref,
        size: size,
        images: images,
        description: description,
        quantity: quantity,
        category: category,
        materials: materials,
        colors: colors,
        brand: brand,
      });
      await newProduct.save();
      return res.status(201).json({
        msg: "Product Added Successfully.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    const id = req.body.id;
    Product.findOne({ _id: id }, function (err, product) {
      // Handle errors
      if (err) {
        // console.error(err);
        console.log("Error in Product.find : ");
        console.log(err);
        return res.status(500).send(err.message);
      }

      // Handle product not found
      if (!product) {
        return res.status(404).send("Product not found");
      }
      updatedAttributes = _.omit(req.body, "id");
      // Update the object based on the attributes in the request body
      // for (let attr in updatedAttributes) {
      //   product[attr] = updatedAttributes[attr];
      // }
      if (req.files) {
        const imageFiles = req.files;
        const images = imageFiles.map((file) => {
          return file.path;
        });
        product.images = images;
      }
      for (let attr in updatedAttributes) {
        const value = updatedAttributes[attr];

        // Use array index notation to update array elements
        if (attr.includes(".")) {
          const [arrAttr, index] = attr.split(".");
          product[arrAttr].splice(index, 1, value);
        } else {
          product[attr] = value;
        }
      }

      // Save the updated object in the database
      product.save(function (err, updatedProduct) {
        // Handle errors
        if (err) {
          // console.error(err);
          console.log("Error in product.save : ");
          console.log(err);
          return res.status(500).send(err.message);
        }

        // Send the updated object in the response
        // console.log(updatedProduct);
        res.status(201).send({ msg: "Product Updated Successfully" });
      });
    });
  },
};
module.exports = productsController;
