const { Router } = require("express");
const mainController = require("./controllers/homeController.js");
const generatorController = require("./controllers/generatorController.js");

const router = new Router();

router.get("/", mainController.renderHomePage); /**Home page**/
router.get("/weapons", mainController.renderWeaponsPage); /**Weapons List**/
router.get("/tools", mainController.renderToolsPage); /**Tools List**/
router.get("/consumables", mainController.renderConsumablesPage); /**Consummables List**/
router.get("/generator", generatorController.renderGeneratorPage); /**Generator Random Laodout**/

module.exports = router;
