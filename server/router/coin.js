const express = require("express");
const CoinController = require("../controllers/Coin");
const authentication = require("../middleware/authentication");
const authorizationCoin = require("../middleware/authorization-coin");
const authCoinOwner = require("../middleware/authCoinOwner");

const router = express.Router();
router.get("/coin",authentication, CoinController.AllCoin);
router.post("/add-coin/:id",authentication, CoinController.addCoin);
router.delete("/delete-coin/:id",authentication,authorizationCoin, CoinController.DeleteCoin);

module.exports = router;