const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");
let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const categorias = [
  "teclado",
  "mouse",
  "silla",
  "headset",
  "alfombrilla",
  "accesorio",
];

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
  products: (req, res) => {
    res.render("products/allProducts", {
      products,
      toThousand,
      user: req.loggedUser 
    });
  },

  product: (req, res) => {
    const id = req.params.id;
    let product = products.find((product) => product.id === id);
    res.render("./products/detail", { product, products,
      user: req.loggedUser  });
  },

  cart: (req, res) => {
    res.render("./products/cart", { user: req.loggedUser });
  },

  create: (req, res) => {
    res.render("./products/create", { categorias,
      user: req.loggedUser  });
  },

  newProduct: (req, res) => {
    let { productName, productDescription, price, category, popular } =
      req.body;
    let product = {
      id: products.length + 1,
      titulo: productName,
      descripcion: productDescription,
      precio: price,
      categoria: category,
      recomendado: popular === "on",
    };
    products.push(product);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
    res.redirect(`/products/detail/${product.id}`);
  },

  edit: (req, res) => {
    const id = req.params.id;
    let product = products.find((product) => product.id === id);
    res.render("./products/edit", { product, categorias,
      user: req.loggedUser  });
  },

  update: (req, res) => {
    const id = req.params.id;
    const { productName, price, category, productDescription, popular } = req.body;
    let index = products.findIndex((product) => product.id == id);
    products[index].titulo = productName;
    products[index].precio = price;
    products[index].categoria = category;
    products[index].descripcion = productDescription;
    products[index].recomendado = popular === "on";
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
    res.redirect(`/products/edit/${id}`);
  },
  delete: (req, res) => {
    const id = req.params.id;
    let index = products.findIndex((product) => product.id == id);
    products.splice(index, 1);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
    res.redirect("/products");
  },
};

module.exports = productsController;
