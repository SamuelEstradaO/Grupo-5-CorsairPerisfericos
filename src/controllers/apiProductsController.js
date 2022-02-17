const db = require("../database/models");
const sequelize = require("sequelize");
const {Op} = require("sequelize")
const path = require("path");
const { group } = require("console");
const { search } = require("../routes/apiProductsRouter");

const apiProductsController = {
    index: async (req, res) => {
        let data = {};
        products = await db.Producto.findAll({
            include: ["categoria"],
            // attributes: ['categoria_id', [sequelize.fn("COUNT", "titulo"), "titulo_count"]],
            // group: 'categoria_id'
        })
        // .then(products => {
        categories = await db.Producto.findAll({
            include: ["categoria"],
            attributes: ['categoria_id', [sequelize.fn("COUNT", "titulo"), "titulo_count"]],
            group: 'categoria_id'
        });
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
        let count = 0
        categories.map( ({dataValues}) => {
            let { titulo_count } = dataValues;
            count += titulo_count
        })
        data.count = count;
        category = [];
        categories.map(({ dataValues }) => {
            let { categoria, titulo_count } = dataValues;
            category.push({
                category: categoria,
                quantity: titulo_count,
            })
        })
        data.countByCategory = category;
        data.products = productos;
        res.json(data);

        // console.log(data);

        //     productos = [];
        //     products.map(({ id, titulo, precio, descripcion, categoria }) => {
        //         productos.push({
        //             id,
        //             titulo,
        //             precio,
        //             descripcion,
        //             categoria,
        //             detail: `/api/products/${id}`,
        //         })
        //     })


        // console.log(products);
        //     data.products = productos;
        //     return products.findAll({
        //         attributes: ['categoria_id', [sequelize.fn("COUNT", "titulo"), "titulo_count"]],
        //         group: 'categoria_id'
        //     })
        // })
        // .then(categories => {
        //     let count = 0
        //     categories.map(({ dataValues }) => {
        //         count += dataValues.titulo_count
        //     })
        //     data.count = count;
        //     category = [];
        //     categories.map(({ dataValues }) => {
        //         category.push({
        //             category: dataValues.categoria,
        //             quantity: dataValues.titulo_count,
        //         })
        //     })
        //     data.countByCategory = category;
        // })
        // .catch(err => {
        //     res.json({ err });
        // })
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
    },
    search: (req, res) => {
        let key = req.query.key;
        console.log(key);
        db.Producto
            .findAll({
                include: ["categoria"],
                where: {
                    titulo: {[Op.like]: `%${key}%`}
                }
            })
            .then(products => {
                let productos = [];
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
                res.json(productos);
            })
            .catch(err => {
                res.json({ err });
            }
            )
    }
}

module.exports = apiProductsController;