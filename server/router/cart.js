const express = require("express");

const CartController = require("../controllers/Cart");
const authorizationCart = require("../middleware/authorization-cart");
const authentication = require("../middleware/authentication");
const authorizationCoin = require("../middleware/authorization-coin");
const router = express.Router();

router.get("/cart", CartController.allCart);
router.get("/cart/:id", CartController.getCoinById);
router.post("/add-cart/:id", authentication, CartController.addCart);
router.put("/update-cart/:id", authentication, authorizationCart, CartController.updateCart);
router.delete("/delete-cart/:id", authentication, authorizationCart, CartController.DeleteCart);

module.exports = router;
