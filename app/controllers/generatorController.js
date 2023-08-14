const weapons = require("../../data/weapons.json");
const tools = require("../../data/tools.json");
const consummables = require("../../data/consummables.json");

const generatorController = {
    renderGeneratorPage(req, res) {
      res.render("generator", { pageTitle: "Hunt Loadout - Random Laodout Generator", weapons, tools, consummables });
    }
};

module.exports = generatorController;