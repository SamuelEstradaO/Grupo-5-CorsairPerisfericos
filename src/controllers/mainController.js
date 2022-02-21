// const fs = require("fs");
// const path = require("path");
const db = require("../database/models");
const { Op } = require("sequelize");
// const productsFilePath = path.join(__dirname, "../data/products.json");
// let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {
  index: (req, res) => {
    // res.render("index", { products, user: req.loggedUser });
    db.Producto
      .findAll({
        include: ['categoria'],
        where: {
          isRecommended: 1,
        },
        limit: 9,
        order: [["updated_at", "DESC"]],
      })
      .then((products) => {
        res.render("index", {
          products,
          toThousand,
          user: req.loggedUser,
        });
      })
      .catch((error) => {
        console.log(error);
        res.render("notFound", { error: "No se pudieron cargar los productos" });
      }
      );
  },
  about: (req, res) => {
    res.render("about", { user: req.loggedUser });
  },
}


module.exports = mainController;
