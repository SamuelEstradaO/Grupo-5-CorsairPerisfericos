const db = require("../database/models");
const { Op } = require("sequelize");

const apiUsersController = {
    index: (req, res) => {
        let data = {};
        db.Usuario
            .findAll()
            .then(users=>{
                data.count = users.length;
                usuarios = [];
                users.map(({id, name, email})=>{
                    usuarios.push({id,
                        name,
                        email,
                        detail: `/api/users/${id}`
                    });
                })
                data.users = usuarios;
                res.json(data);
            })
    },

    user: (req, res) => {
        let data = {};
        let id = req.params.id;
        db.Usuario
            .findByPk(id)
            .then(({id, name, lastName, email, userImage}) => {
                let user ={
                    id,
                    name,
                    lastName,
                    email,
                    userImage
                }
                data.user = user;
                res.json(data);
            })
    }
};

module.exports = apiUsersController;