const express = require('express');
const router = express.Router();
const routerUser = require("./user");
const routerCoin = require("./coin");
const routerCart = require("./cart");
const errorHandler = require('../middleware/errorHandler');


router.get("/", (req, res) => {
    res.send('IP Project Robby');
});//
router.use(routerCoin);
router.use(routerUser);
router.use(routerCart);
router.use(errorHandler);

module.exports = router;
