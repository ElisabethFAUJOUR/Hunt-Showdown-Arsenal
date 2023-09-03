const render404Page = (req, res) => {
    res.status(404).render("error", { pageTitle: "Error 404"});
  };

module.exports = render404Page;

