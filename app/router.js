const { Router } = require("express");
const mainController = require("./controllers/homeController.js");

const router = new Router();

router.get("/", mainController.renderHomePage); /**Home page**/
router.get("/weapons", mainController.renderWeaponsPage); /**Weapons List**/
router.get("/tools", mainController.renderToolsPage); /**Tools List**/
router.get("/consumables", mainController.renderConsumablesPage); /**Consumables List**/

module.exports = router;
