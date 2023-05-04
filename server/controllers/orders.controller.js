const Order = require("../models/order");
const _ = require("lodash");
const mongoose = require("mongoose");
const Brand = require("../models/brand");
const client = require("../models/client");
const Product = require("../models/product");
const ordersController = {
  addOrders: async (req, res, next) => {
    // try {
    // console.log(req.body);
    const newOrder = new Order({
      _id: new mongoose.Types.ObjectId(),
      orderItems: req.body.orderItems.map((item) => ({
        _id: item._id,
        name: item.name,
        // quantity: item.quantity,
        image: item.image,
        // price: item.price,
        variation: item.variation,
        // variation: {
        //   color: item.selectedProductColor,
        //   size: item.selectedProductSize,
        //   quantity: item.quantity,
        // },
      })),
      shippingAddress: {
        fullName: req.body.shippingAddress.fullName,
        address: req.body.shippingAddress.address,
        city: req.body.shippingAddress.city,
        postalCode: req.body.shippingAddress.postalCode,
        country: req.body.shippingAddress.country,
      },
      // paymentMethod: req.body.paymentMethod,
      // itemsPrice: req.body.itemsPrice,
      // shippingPrice: req.body.shippingPrice,
      // taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      client: req.body.id,
    });
    // console.log(newOrder);

    const result = await newOrder.save();

    if (!result) {
      return res.status(400).send({ msg: "Order Not Saved" });
      // const error = new Error('Failed to add the order');
      // error.statusCode = 500;
      // throw error;
    } else {
      let orderItems = req.body.orderItems;
      orderItems.forEach((item) => {
        console.log(item);
        Product.findById(item._id, (err, product) => {
          const variation = product.variation.find(
            (v) => v.color == item.variation.color
            // &&
            // v.size.some(
            //   (s) => s.name == item.variation.size
            // )
          );

          if (variation) {
            variation.size.forEach((s) => {
              if (s.name === item.variation.size) {
                s.stock -= item.variation.quantity;
              }
            });

            product.save((err) => {
              if (err) {
                return res.status(400).send({ msg: err.message });
              }
            });
          }
        });
      });

      // const addedOrder = await Order.findById(result._id);
      const products = await Product.find();

      //   if (!addedOrder) {
      //     const error = new Error('Failed to retrieve the added order');
      //     error.statusCode = 500;
      //     throw error;
      //   }

      // return res.status(201).send({
      //   message: "Created an order using POST request",
      //   createdItem: addedOrder,
      // });
      return res.status(201).send({products});
    }
    // } catch (err) {
    //   console.log(err.message);
    //   return res.status(500).send({ msg: err.message });
    // }
  },

  getOrders: async (req, res, next) => {
    try {
      const orders = await Order.aggregate([
        {
          $group: {
            _id: null,
            numOrders: { $sum: 1 },
            totalSales: { $sum: "$totalPrice" },
          },
        },
      ]);
      const users = await client.aggregate([
        {
          $group: {
            _id: null,
            numUsers: { $sum: 1 },
          },
        },
      ]);
      const dailyOrders = await Order.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            orders: { $sum: 1 },
            sales: { $sum: "$totalPrice" },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      const productCategories = await Product.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
      ]);
      res.send({ users, orders, dailyOrders, productCategories });
    } catch (err) {
      next(err);
    }
  },
  getOrderById: async (req, res) => {
    //isAuth,

    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  },
  getOrdersByClient: async (req, res) => {
    try {
      const clientId = mongoose.Types.ObjectId(req.body.id);
      Order.find({ client: clientId });
      const orders = await Order.find({ client: clientId });
      if (orders) {
        res.status(200).send(orders);
      } else {
        res.status(404).send({ message: "No Orders Found" });
      }
    } catch (err) {
      console.log(err);
      res.send({ msg: err.message });
    }
  },

  deleteOrder: async (req, res, next) => {
    try {
      //isAuth,
      //isAdmin,
      const order = await Order.findById(req.params.id);
      if (order) {
        await order.remove();
        res.send({ message: "Order Deleted" });
      } else {
        res.status(404).send({ message: "Order Not Found" });
      }
    } catch (err) {
      console.log(err.message);
      return res.send({ msg: err.message });
    }
  },

  /*
      
      orderRouter.get(
        '/mine',
        isAuth,
        expressAsyncHandler(async (req, res) => {
          const orders = await Order.find({ user: req.user._id });
          res.send(orders);
        })
      );
      
    
      
      orderRouter.put(
        '/:id/deliver',
        isAuth,
        expressAsyncHandler(async (req, res) => {
          const order = await Order.findById(req.params.id);
          if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            await order.save();
            res.send({ message: 'Order Delivered' });
          } else {
            res.status(404).send({ message: 'Order Not Found' });
          }
        })
      );
      
      orderRouter.put(
        '/:id/pay',
        isAuth,
        expressAsyncHandler(async (req, res) => {
          const order = await Order.findById(req.params.id).populate(
            'user',
            'email name'
          );
          if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
              id: req.body.id,
              status: req.body.status,
              update_time: req.body.update_time,
              email_address: req.body.email_address,
            };
      
            const updatedOrder = await order.save();
            mailgun()
              .messages()
              .send(
                {
                  from: 'Amazona <amazona@mg.yourdomain.com>',
                  to: `${order.user.name} <${order.user.email}>`,
                  subject: `New order ${order._id}`,
                  html: payOrderEmailTemplate(order),
                },
                (error, body) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(body);
                  }
                }
              );
      
            res.send({ message: 'Order Paid', order: updatedOrder });
          } else {
            res.status(404).send({ message: 'Order Not Found' });
          }
        })
      );
      
      
      */
};

module.exports = ordersController;
