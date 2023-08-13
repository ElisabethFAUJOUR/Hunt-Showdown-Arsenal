const weaponController = {
    renderWeaponsPage(req, res) {
      res.render("weapons-list", { pageTitle: "Hunt Loadout - Arsenal Weapons" });
    }
};

module.exports = weaponController;