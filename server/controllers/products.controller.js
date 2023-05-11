const Product = require("../models/product");
const _ = require("lodash");
const mongoose = require("mongoose");
const Brand = require("../models/brand");
const twilio = require("twilio");
const accountSid = "ACfe57609f0902b9d2a40c61057289e577";
const authToken = "14e20c42d08ab06982974241b483054a";
const client = new twilio(accountSid, authToken);
const dotenv = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SERCRET_KEY);
function sendSMS(name, shortDescription, price, newPrice) {
  client.messages
    .create({
      body: `Ecofit : A product is now on sale in our platform name : ${name}\nDescription: ${shortDescription}\n . The original price was ${price} and now it's ${newPrice}`,
      from: "+16205291737",
      to: "+21625603156",
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.error(error));
}
const productsController = {
  getAll: async (req, res) => {
    const products = await Product.find()
      .populate({
        path: "reviews",
        populate: {
          path: "client",
          model: "client",
          select: "firstname lastname username email _id",
        },
      })
      .populate("brand");
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
    const tags = req.body.tags;
    if (
      !name ||
      !price ||
      !images ||
      !shortDescription ||
      !fullDescription ||
      !variation ||
      !category ||
      !materials ||
      !tags ||
      !brand
    )
      return res.status(400).json({ msg: "Please fill in all fields." });
    // const product = await Product.findOne({ ref });
    // const product = await Product.findOne({ name });
    // if (product)
    //   return res.status(400).json({ msg: "Product already exists." });
    try {
      const stripeProduct = await stripe.products.create({
        name,
        description: shortDescription,
      });
      console.log("Stripe Product :");
      console.log(stripeProduct);

      const priceObj = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: price * 100, // Stripe requires the price in cents
        currency: "usd",
      });
      console.log("Stripe Price :");
      console.log(priceObj);
      console.log(priceObj.unit_amount / 100);

      const newProduct = new Product({
        name: name,
        price: price,
        tag: tags,
        image: images,
        shortDescription: shortDescription,
        fullDescription: fullDescription,
        category: category,
        materials: materials,
        brand: brand,
        variation: variation,
        stripeId: stripeProduct.id,
        priceId: priceObj.id,
      });
      console.log(newProduct);
      await newProduct.save();
      // sendSMS(name, shortDescription, fullDescription, price);

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
        console.log(err);
        return res.status(400).send({ msg: err.message });
      }

      // Handle product not found
      if (!product) {
        return res.status(404).send({ msg: "Product not found" });
      }
      // updatedAttributes = _.omit(req.body, "id");
      // if (req.files) {
      //   const imageFiles = req.files;
      //   const images = imageFiles.map((file) => {
      //     return file.path;
      //   });
      //   product.images = images;
      // }
      // for (let attr in updatedAttributes) {
      //   const value = updatedAttributes[attr];

      //   // Use array index notation to update array elements
      //   if (attr.includes(".")) {
      //     const [arrAttr, index] = attr.split(".");
      //     product[arrAttr].splice(index, 1, value);
      //   } else {
      //     product[attr] = value;
      //   }
      // }

      // Save the updated object in the database

      const name = req.body.name;
      const price = req.body.price;
      // const imageFiles = req.files;
      const tags = req.body.tags;
      let combinedImagesArray = [];
      if (req.body.images && req.body.images.length > 0) {
        let images = req.body.images;
        combinedImagesArray.push(...images);
      }
      if (req.files && req.files.length > 0) {
        let newImages = req.files.map((file) => {
          return file.path;
        });
        combinedImagesArray.push(...newImages);
      }
      const shortDescription = req.body.shortDescription;
      const fullDescription = req.body.fullDescription;
      const category = req.body.category;
      const materials = req.body.materials;
      const variation = req.body.variations;
      let newPriceId = "";
      if (
        !name ||
        !price ||
        // !images ||
        !shortDescription ||
        !fullDescription ||
        !variation ||
        !category ||
        !tags ||
        !materials
      ) {
        return res.status(400).json({ msg: "Please fill in all fields." });
      }

      stripe.prices
        .create({
          product: product.stripeId,
          unit_amount: price * 100,
          currency: "usd",
        })
        .then((price) => {
          console.log("Price created:", price);
          newPriceId = price.id;
          console.log("New Price Id:", newPriceId);

          // Update the corresponding product
          return stripe.products.update(product.stripeId, {
            active: true,
            metadata: {
              priceId: price.id,
            },
          });
        })
        .then((prd) => {
          console.log("Product updated:", prd);
          product.name = name;
          product.priceId = newPriceId;
          product.price = price;
          product.shortDescription = shortDescription;
          product.fullDescription = fullDescription;
          product.variation = variation;
          product.category = category;
          // product.image = images;
          product.image = combinedImagesArray;
          product.materials = materials;
          product.tag = tags;
          product.save(function (err, updatedProduct) {
            // Handle errors
            if (err) {
              console.log(err);
              return res.status(500).send({ msg: err.message });
            }
            // Send the updated object in the response
            console.log(updatedProduct);
            res.status(201).send({ msg: "Product Updated Successfully" });
          });
        });
    });
  },
  deleteProduct: async (req, res, next) => {
    try {
      const prod = await Product.findById(req.params.id);
      if (prod) {
        await prod.remove();
        res.send({ message: "Product Deleted" });
      } else {
        res.status(404).send({ message: "Product Not Found" });
      }
    } catch (err) {
      console.log(err.message);
      return res.send({ msg: err.message });
    }
  },
  addReview: async (req, res) => {
    try {
      const id = req.body.id;
      if (!req.body.rating || !req.body.comment)
        return res.status(400).send({ msg: "Please Fill in All Fields" });
      let review = {
        client: id,
        rating: req.body.rating,
        comment: req.body.comment,
      };
      const productId = req.body.productId;
      const product = await Product.findById(productId).populate({
        path: "reviews",
        populate: {
          path: "client",
          model: "client",
          select: "firstname lastname username email _id",
        },
      });
      if (!product) {
        return res.status(400).send({ msg: "Product Not Found" });
      }
      // Check if client has already reviewed the product
      const existingReview = product.reviews.find((r) => r.client._id == id);
      if (existingReview) {
        // Update existing review
        existingReview.rating = review.rating;
        existingReview.comment = review.comment;
        // review = existingReview;
      } else {
        // Add new review to reviews array
        product.reviews.push(review);
      }
      await product.save();
      const updatedProduct = await Product.findById(productId).populate({
        path: "reviews",
        populate: {
          path: "client",
          model: "client",
          select: "firstname lastname username email _id",
        },
      });
      return res
        .status(201)
        .send({ msg: "Review Sent", reviews: updatedProduct.reviews });
    } catch (error) {
      console.log(error.message);
      return res.send({ msg: error.message });
    }
  },
  deleteReview: async (req, res) => {
    const { productId, reviewId } = req.params;

    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).send({ error: "Product not found" });
      }

      const review = product.reviews.id(reviewId);

      if (!review) {
        return res.status(404).send({ error: "Review not found" });
      }

      review.remove();
      await product.save();

      res.send({ message: "Review deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal server error" });
    }
  },
  setProductOnSale: async (req, res) => {
    try {
      if (!req.body.productId || !req.body.discount)
        return res.status(400).send({ msg: "Please Enter The Disocunt Rate" });
      const productId = req.body.productId;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(400).send({ msg: "Product Not Found" });
      }
      product.discount = req.body.discount;
      let discountedPrice =
        product.price - product.price * (req.body.discount / 100);
      discountedPrice.toFixed(2);
      stripe.prices
        .create({
          product: product.stripeId,
          unit_amount: discountedPrice * 100,
          currency: "usd",
        })
        .then((price) => {
          console.log("Price created:", price);
          newPriceId = price.id;
          console.log("New Price Id:", newPriceId);

          // Update the corresponding product
          return stripe.products.update(product.stripeId, {
            active: true,
            metadata: {
              priceId: price.id,
            },
          });
        })
        .then(async (prd) => {
          console.log(product);
          product.priceId = newPriceId;
          await product.save();
          // sendSMS(
          //   product.name,
          //   product.shortDescription,
          //   product.price,
          //   product.newPrice
          // );
          return res.status(201).send({ msg: "Product in Now On Sale" });
        });
    } catch (error) {
      console.log(error.message);
      return res.send({ msg: error.message });
    }
  },
  getEcoProducts: async (req, res) => {},
};
module.exports = productsController;
