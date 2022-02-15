const db = require("../database/models");
const { Op } = require("sequelize");
const path = require("path");

const apiUsersController = {
    index: (req, res) => {
        let data = {};
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
                res.json(data);
            })
            .catch(err => {
                res.json({ err });
            })
    },

    user: (req, res) => {
        let data = {};
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
                res.json(data);
            })
            .catch(err => {
                res.json({ err });
            })
    },
    avatar: (req, res) => {
        let id = req.params.id;
        db.Usuario
            .findByPk(id)
            .then(({ userImage }) => {
                res.sendFile(path.join(__dirname, `../../public/images/users/${userImage}`));
            })
            .catch(err => {
                res.json({ err });
            })
    }
};

module.exports = apiUsersController;