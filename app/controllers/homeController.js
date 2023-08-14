const weapons = require("../../data/weapons.json");
const tools = require("../../data/tools.json");
const consummables = require("../../data/consummables.json");

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
    
    renderConsummablesPage(req, res) {
      res.render("consummables-list", { pageTitle: "Hunt Loadout - Consummables", consummables });
    },

};

module.exports = mainController;