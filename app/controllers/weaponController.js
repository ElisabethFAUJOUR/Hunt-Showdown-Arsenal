const weapons = require("../../data/weapons.json");

const weaponController = {
    renderWeaponsPage(req, res) {
      res.render("weapons-list", { pageTitle: "Hunt Loadout - Arsenal Weapons", weapons });
    },
    
};

module.exports = weaponController;