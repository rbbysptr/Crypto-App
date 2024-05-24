const express = require("express");
const UserController = require("../controllers/User");

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/google-login", UserController.GoogleLogin);
router.get("/github-login", UserController.githubLogin);

module.exports = router;
