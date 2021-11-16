const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const categorias = ['teclado', 'mouse', 'silla', 'headset', 'alfombrilla', 'accesorio'];

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
    res.render("./products/create", {categorias});
  },

  newProduct: (req, res) => {
    let { productName, productDescription, price, category, popular } = req.body;
    let product = {
      id: products.length + 1,
      titulo: productName,
      descripcion: productDescription,
      precio: price,
      categoria: category,
      recomendado: popular==="on"
    };
    products.push(product);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
    res.redirect(`/products/detail/${product.id}`);
  },

  edit: (req, res) => {
    const id = req.params.id;
    let product = products.find((product) => product.id === id);
    res.render("./products/edit", { product, categorias });
  },

  update: (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    const { productName, price, category, productDescription } = req.body;
    let index = products.findIndex( product => product.id == id);
    products[index].titulo = productName;
    products[index].precio = price;
    products[index].categoria = category;
    products[index].descripcion = productDescription;
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
    res.redirect(`/products/edit/${id}`);
  },
  delete: (req, res) => {
    const id = req.params.id;
    let index = products.findIndex( product => product.id == id);
    products.splice(index, 1);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
    res.redirect('/products');
  },
};

module.exports = productsController;





