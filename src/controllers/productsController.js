const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
  products: (req, res) => {
    res.render('products/allProducts', {
      products, toThousand
    });
  },
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
  newProduct: (req, res) => {

  },
  update: (req, res) => {

  },
  delete: (req, res) => {

  },
};

module.exports = productsController;





