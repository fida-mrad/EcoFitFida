const Product = require("../models/product");
const _ = require("lodash");
const mongoose = require("mongoose");
const Brand = require("../models/brand");
const twilio = require("twilio");
const accountSid = "ACfe57609f0902b9d2a40c61057289e577";
const authToken = "14e20c42d08ab06982974241b483054a";
const client = new twilio(accountSid, authToken);
function sendSMS(name, shortDescription, price) {
  client.messages
    .create({
      body: `Ecofit  new product has been added in our platform  name : ${name}\nDescription: ${shortDescription}\n . The original price was ${price} $`,
      from: "+16205291737",
      to: "+21625603156",
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.error(error));
}
const productsController = {
  getAll: async (req, res) => {
    // const products = await Product.find();
    const products = await Product.find().populate({
      path: "reviews",
      populate: {
        path: "client",
        model: "client",
        select: 'firstname lastname username email _id'
      },
    });
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
            if (!product)
              return res.status(400).send({ msg: "Product Not Found" });
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
    const imageFiles = req.files;
    const images = imageFiles.map((file) => {
      return file.path;
    });
    const shortDescription = req.body.shortDescription;
    const fullDescription = req.body.fullDescription;
    const category = req.body.category;
    const materials = req.body.materials;
    const brand = req.body.brand;
    const variation = req.body.variations;
    if (
      !name ||
      !price ||
      !images ||
      !shortDescription ||
      !fullDescription ||
      !variation ||
      !category ||
      !materials ||
      !brand
    )
      return res.status(400).json({ msg: "Please fill in all fields." });
    // const product = await Product.findOne({ ref });
    const product = await Product.findOne({ name });
    if (product)
      return res.status(400).json({ msg: "Product already exists." });
    try {
      const newProduct = new Product({
        name: name,
        price: price,
        image: images,
        shortDescription: shortDescription,
        fullDescription: fullDescription,
        category: category,
        materials: materials,
        brand: brand,
        variation: variation,
      });
      console.log(newProduct);
      await newProduct.save();
      sendSMS(name, shortDescription, fullDescription, price);
      return res.status(201).send({
        msg: "Product Added Successfully.",
      });
    } catch (err) {
      return res.status(500).send({ msg: err.message });
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
  addReview: async (req, res) => {
    try {
      const id = req.body.id;
      if (!req.body.rating || !req.body.comment)
        return res.status(400).send({ msg: "Please Fill in All Fields" });
      const review = {
        client: id,
        rating: req.body.rating,
        comment: req.body.comment,
      };
      const productId = req.body.productId;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(400).send({ msg: "Product Not Found" });
      }
      // Check if client has already reviewed the product
      const existingReview = product.reviews.find((r) => r.client == id);
      if (existingReview) {
        // Update existing review
        existingReview.rating = review.rating;
        existingReview.comment = review.comment;
      } else {
        // Add new review to reviews array
        product.reviews.push(review);
      }
      await product.save();
      return res.status(201).send({ msg: "Review Sent" });
    } catch (error) {
      console.log(error.message);
      return res.send({ msg: error.message });
    }
  },
};
module.exports = productsController;
