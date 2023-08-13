const homeController = {
    renderHomePage(req, res) {
      res.render("home", { pageTitle: "Hunt Loadout"});
    }, 

};

module.exports = homeController;