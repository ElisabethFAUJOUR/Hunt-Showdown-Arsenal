const weapons = require("../../data/weapons.json");
const tools = require("../../data/tools.json");
const consumables = require("../../data/consumables.json");

const mainController = {
      renderHomePage(req, res) {
      res.render("home", { pageTitle: "Hunt Loadout"});
    }, 

    renderWeaponsPage(req, res) {
      res.render("weapons-list", { pageTitle: "Hunt Loadout - Arsenal Weapons", weapons });
    },

    renderToolsPage(req, res) {
      res.render("tools-list", { pageTitle: "Hunt Loadout - Tools", tools });
    },
    
    renderConsumablesPage(req, res) {
      res.render("consumables-list", { pageTitle: "Hunt Loadout - Consumables", consumables });
    },

};

module.exports = mainController;