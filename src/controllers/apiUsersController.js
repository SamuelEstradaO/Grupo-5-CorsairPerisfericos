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
                    usuarios.push({id, name, email});
                })
                data.users = usuarios;
                res.json(data);
            })
    },

    user: (req, res) => {

    }
};

module.exports = apiUsersController;