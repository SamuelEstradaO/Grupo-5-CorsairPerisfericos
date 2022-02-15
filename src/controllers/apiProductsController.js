const db = require("../database/models");
const { Op } = require("sequelize");
const path = require("path");

const apiProductsController = {
    index: (req, res) => {
        let data = {};
        db.Producto
            .findAll({ include: ["categoria"] })
            .then(products => {
                data.count = products.length;
                productos = [];
                products.map(({ id, titulo, precio, descripcion, categoria }) => {
                    productos.push({
                        id,
                        titulo,
                        precio,
                        descripcion,
                        categoria,
                        detail: `/api/products/${id}`,
                    })
                })
                data.products = productos;
                res.json(data);
            })
            .catch(err => {
                res.json({ err });
            })
    },
    detail: (req, res) => {
        let data = {};
        let id = req.params.id;
        db.Producto
            .findByPk(id, { include: ["categoria"] })
            .then(({ id, titulo, precio, descripcion, caracteristicas, stock, isRecommended, categoria }) => {
                let product = {
                    id,
                    titulo,
                    precio,
                    descripcion,
                    caracteristicas,
                    stock,
                    isRecommended,
                    categoria,
                    imagen: `/api/products/${id}/image`,
                }
                data.product = product;
                res.json(data);
            })
            .catch(err => {
                res.json({ err });
            })
    },
    image: (req, res) => {
        let id = req.params.id;
        db.Producto
            .findByPk(id)
            .then(({ img }) => {
                res.sendFile(path.join(__dirname, `../../public/images/${img}`));
            })
            .catch(err => {
                res.json({ err });
            })
    }
}

module.exports = apiProductsController;