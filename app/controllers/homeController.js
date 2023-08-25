const weapons = require("../../data/weapons.json");
const tools = require("../../data/tools.json");
const consumables = require("../../data/consumables.json");

const mainController = {
      renderHomePage(req, res) {
      res.render("home", { pageTitle: "Hunt Arsenal"});
    }, 

    renderWeaponsPage(req, res) {
      res.render("weapons-list", { pageTitle: "Hunt Arsenal - Weapons", weapons });
    },

    renderToolsPage(req, res) {
      res.render("tools-list", { pageTitle: "Hunt Arsenal - Tools", tools });
    },
    
    renderConsumablesPage(req, res) {
      res.render("consumables-list", { pageTitle: "Hunt Arsenal - Consumables", consumables });
    },

};

module.exports = mainController;