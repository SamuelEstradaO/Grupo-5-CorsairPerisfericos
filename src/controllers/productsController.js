const productsController = {
  product: (req, res) => {
    res.render("./products/detail");
  },
  cart: (req, res) => {
    res.render("./products/cart");
  },
  create: (req, res) => {
    res.render("./products/create");
  },
  edit: (req, res) => {
    const id = parseInt(req.params.id);
    let product = products.find((product) => product.id === id);
    res.render("./products/edit", { product });
  },
};

module.exports = productsController;
