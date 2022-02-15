const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const { Op } = require("sequelize");

const { validationResult } = require("express-validator");

// const productsFilePath = path.join(__dirname, "../data/products.json");
// let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

// const categorias = [
//   "teclado",
//   "mouse",
//   "silla",
//   "headset",
//   "alfombrilla",
//   "accesorio",
// ];

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
  products: (req, res) => {
    // res.render("products/allProducts", {
    //   products,
    //   toThousand,
    //   user: req.loggedUser
    // });
    db.Producto.findAll({
      include: ["categoria"],
    })
      .then((products) => {
        console.log(products);
        res.render("products/allProducts", {
          products,
          toThousand,
          // categorias,
          user: req.loggedUser,
        });
      })
      .catch((error) => {
        res.send(error);
      });
  },

  product: (req, res) => {
    const id = req.params.id;
    // let product = products.find((product) => product.id === id);
    // res.render("./products/detail", { product, products,
    //   user: req.loggedUser  });
    db.Producto.findByPk(id, {
      include: [{ association: "categoria" }],
    }).then((product) => {
      db.Producto.findAll({
        where: {
          categoria_id: product.categoria_id,
        },
        include: ["categoria"],
      })
        .then((products) => {
          res.render("products/detail", {
            product,
            products,
            user: req.loggedUser,
          });
        })
        .catch((error) => {
          res.send(error);
        });
    })
      .catch((error) => {
        res.send(error);
      });
  },

  search: (req, res) => {
    let { product } = req.query;
    db.Producto.findAll({
      where: {
        titulo: {
          [Op.like]: `%${product}%`,
        },
      },
      order: [
        ["titulo", "ASC"],
        ["precio", "ASC"],
      ],
      // limit: 9
    })
      .then((products) => {
        let result = products.length > 0 ? true : false;

        res.render("products/search", {
          products,
          toThousand,
          product,
          result,
          user: req.loggedUser,
        });
      })
      .catch((error) => {
        res.send(error);
      });
  },

  cart: (req, res) => {
    res.render("./products/cart", { user: req.loggedUser });
  },

  create: (req, res) => {
    // res.render("./products/create", { categorias,
    //   user: req.loggedUser  });
    db.Categoria.findAll()
      .then((categorias) => {
        res.render("products/create", {
          categorias,
          user: req.loggedUser,
        });
      })
      .catch((error) => {
        res.send(error);
      });
  },

  newProduct: (req, res) => {
    let { productName, productDescription, price, category, productFeatures, popular } =
      req.body;
    // let product = {
    //   id: products.length + 1,
    //   titulo: productName,
    //   descripcion: productDescription,
    //   precio: price,
    //   categoria: category,
    //   recomendado: popular === "on",
    // };
    // products.push(product);
    // fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
    // res.redirect(`/products/detail/${product.id}`);
    // get img multer

    let imgProduct;
    let validations = validationResult(req);
    if (validations.isEmpty()) {

      if (!req.file) {
        imgProduct = "dummy.png";
      } else {
        imgProduct = req.file.filename;
      }
      db.Producto.create({
        titulo: productName,
        descripcion: productDescription,
        precio: price,
        img: imgProduct,
        caracteristicas: productFeatures,
        categoria_id: category,
        isRecommended: popular === "on" ? 1 : 0,
      })
        .then((product) => {
          res.redirect(`/products/detail/${product.id}`);
        })
        .catch((error) => {
          res.send(error);
        });

    } else {

      fs.unlink(path.join(__dirname, "../../public/images/", req.file.filename),
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
        })
      db.Categoria.findAll()
        .then((categorias) => {
          res.render("products/create", {
            errors: validations.errors,
            categorias,
            user: req.loggedUser,
          });
        })
        .catch((error) => {
          res.send(error);
        });
    }
  },

  edit: (req, res) => {
    const id = req.params.id;
    // let product = products.find((product) => product.id === id);
    // res.render("./products/edit", {
    //   product, categorias,
    //   user: req.loggedUser
    // });
    db.Producto.findByPk(id)
      .then((product) => {
        db.Categoria.findAll()
          .then((categorias) => {
            res.render("products/edit", {
              product,
              categorias,
              user: req.loggedUser,
            });
          })
          .catch((error) => {
            res.send(error);
          });
      })
      .catch((error) => {
        res.send(error);
      });
  },

  update: (req, res) => {
    let validations = validationResult(req);
    const id = req.params.id;
    if (validations.isEmpty()) {
      db.Producto.findByPk(id)
        .then((product) => {
          const { productName, price, category, productDescription, productFeatures, popular } =
            req.body;
          if (req.file != undefined) {
            if (product.img != "dummy.png") {
              fs.unlink(
                path.join(
                  __dirname,
                  `../../public/images/${product.img}`
                ),
                (err) => {
                  if (err) {
                    console.log(err);
                    return;
                  }
                }
              );
            }
            productImage = req.file.filename;
          } else {
            productImage = product.img;
          }
          product.update({
            titulo: productName,
            precio: price,
            descripcion: productDescription,
            caracteristicas: productFeatures,
            categoria_id: category,
            isRecommended: popular === "on" ? 1 : 0,
            img: productImage,
          })
            .then((product) => {
              res.redirect(`/products/detail/${product.id}`);
            })
            .catch((error) => {
              res.send(error);
            });
        })
    } else {
      fs.unlink(path.join(__dirname, "../../public/images/", req.file.filename),
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
        })
      db.Producto.findByPk(id)
        .then((product) => {
          db.Categoria.findAll()
            .then((categorias) => {
              res.render("products/edit", {
                errors: validations.errors,
                product,
                categorias,
                user: req.loggedUser,
              });
            })
            .catch((error) => {
              res.send(error);
            });
        })
        .catch((error) => {
          res.send(error);
        });
    }


    // let index = products.findIndex((product) => product.id == id);
    // products[index].titulo = productName;
    // products[index].precio = price;
    // products[index].categoria = category;
    // products[index].descripcion = productDescription;
    // products[index].recomendado = popular === "on";
    // fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
    // res.redirect(`/products/edit/${id}`);

  },

  delete: (req, res) => {
    const id = req.params.id;
    // let index = products.findIndex((product) => product.id == id);
    // products.splice(index, 1);
    // fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
    // res.redirect("/products");
    db.Producto.findByPk(id)
      .then((product) => {
        if (product.img != "dummy.png") {
          fs.unlink(
            path.join(
              __dirname,
              `../../public/images/${product.img}`
            ),
            (err) => {
              if (err) {
                console.log(err);
                return;
              }
            }
          );
        }
        product.destroy()
          .then(() => {
            res.redirect("/products");
          })
          .catch((error) => {
            res.send(error);
          });
      })
  },
};

module.exports = productsController;
