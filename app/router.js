const { Router } = require("express");
const homeController = require("./controllers/homeController.js");
const weaponController = require("./controllers/weaponController.js");

const router = new Router();

router.get("/", homeController.renderHomePage); // "/" : **Home page**
router.get("/weapons", weaponController.renderWeaponsPage);
// router.get("/tools", mainController.renderToolsPage);
// router.get("/consummables", mainController.renderConsummablesPage);
// router.get("/generator", mainController.renderConsummablesPage);

module.exports = router;
