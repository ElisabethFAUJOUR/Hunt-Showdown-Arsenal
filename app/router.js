const { Router } = require("express");
const mainController = require("./controllers/homeController.js");
const generatorController = require("./controllers/generatorController.js");

const router = new Router();

router.get("/", mainController.renderHomePage); // "/" : **Home page**
router.get("/weapons", mainController.renderWeaponsPage);
router.get("/tools", mainController.renderToolsPage);
router.get("/consumables", mainController.renderConsumablesPage);
router.get("/generator", generatorController.renderGeneratorPage);

module.exports = router;
