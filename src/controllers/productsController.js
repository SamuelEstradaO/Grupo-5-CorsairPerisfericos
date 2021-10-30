const productsController = {
  product: (req, res) => {
    res.render("./products/productDetail");
  },
  cart: (req, res) => {
    res.render("./products/productCart");
  },
  admin: (req, res) => {
    res.render("./products/productAdmin");
  },
};

module.exports = productsController;
