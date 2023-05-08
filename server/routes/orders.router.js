var express = require("express");
var router = express.Router();
const controller = require("../controllers/orders.controller");
const { authClient } = require("../middleware/auth");

router.post("/addOrders", authClient, controller.addOrders);
// router.post('/addOrders'controller.addOrders);
router.get("/getOrders", controller.getOrders);
router.get("/getOrderById/:id", controller.getOrderById);
router.delete("/deleteOrder/:id", authClient,controller.deleteOrder);
router.get("/getOrdersByClient", authClient,controller.getOrdersByClient);
router.get("/getOrdersByBrand/:id", controller.getOrdersByBrand);


module.exports = router;
