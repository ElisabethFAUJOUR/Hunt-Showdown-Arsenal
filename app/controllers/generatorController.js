const weapons = require("../../data/weapons.json");
const tools = require("../../data/tools.json");
const consumables = require("../../data/consumables.json");

const generatorController = {
    renderGeneratorPage(req, res) {
      res.render("generator", { pageTitle: "Hunt Loadout - Random Laodout Generator", weapons, tools, consumables });
    }
};

module.exports = generatorController;