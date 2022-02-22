const db = require("../database/models");
const { Op } = require("sequelize");
const path = require("path");

const apiUsersController = {
    index: (req, res) => {
        let data = {};
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        // res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        db.Usuario
            .findAll()
            .then(users => {
                data.count = users.length;
                usuarios = [];
                users.map(({ id, name, email }) => {
                    usuarios.push({
                        id,
                        name,
                        email,
                        detail: `/api/users/${id}`
                    });
                })
                data.users = usuarios;
                res.status(200).json(data);
            })
            .catch(err => {
                res.json({ err });
            })
    },

    user: (req, res) => {
        let data = {};
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        // res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        let id = req.params.id;
        db.Usuario
            .findByPk(id)
            .then(({ id, name, lastName, email }) => {
                let user = {
                    id,
                    name,
                    lastName,
                    email,
                    userImage: `/api/users/${id}/image`,
                }
                data.user = user;
                res.status(200).json(data);
            })
            .catch(err => {
                res.json({ err });
            })
    },
    avatar: (req, res) => {
        let id = req.params.id;
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        // res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        db.Usuario
            .findByPk(id)
            .then(({ userImage }) => {
                res.status(200).sendFile(path.join(__dirname, `../../public/images/users/${userImage}`));
            })
            .catch(err => {
                res.json({ err });
            })
    }
};

module.exports = apiUsersController;