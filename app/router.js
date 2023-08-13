const { Router } = require("express");
const mainController = require("./controllers/mainController");

const router = new Router();

router.get("/", mainController.renderHomePage); // "/" : **Home page**


module.exports = router;
