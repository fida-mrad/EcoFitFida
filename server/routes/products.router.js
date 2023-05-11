var express = require("express");
var router = express.Router();
const controller = require("../controllers/products.controller");
const { authAdmin, authAgent, authClient } = require("../middleware/auth");
const upload = require("../middleware/imageUpload");

// router.post('/addProduct', upload.array("images",5),authAgent,controller.addProuct)
router.post("/addProduct", upload.any(), controller.addProduct);
router.get("/getall", controller.getAll);
router.post("/getByBrand", authAgent, controller.getByBrand);
// router.post('/getByBrand',controller.getByBrand)
router.put("/updateProduct", upload.any(), controller.updateProduct);
router.post("/getById", authAgent, controller.getById);
router.post("/addReview", authClient, controller.addReview);
router.put("/setOnSale", authAgent, controller.setProductOnSale);
router.delete("/deleteProduct/:id", authAgent, controller.deleteProduct);
router.delete("/deleteProductAdmin/:id", authAdmin, controller.deleteProduct);
router.delete("/deleteReview/:productId/:reviewId", authClient, controller.deleteReview);
module.exports = router;
