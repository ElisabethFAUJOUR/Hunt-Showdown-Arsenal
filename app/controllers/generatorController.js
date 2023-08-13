const weapons = require("../../data/weapons.json");

const generatorController = {
    renderGeneratorPage(req, res) {
      res.render("generator", { pageTitle: "Hunt Loadout - Random Laodout Generator", weapons });
    }
};

module.exports = generatorController;