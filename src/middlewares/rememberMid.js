// const path = require('path');
// const fs = require('fs');
const db = require('../database/models');


function rememberMid(req, res, next) {
    //     // const usersFilePath = path.join(__dirname, '../data/users.json');
    //     // let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    if (req.cookies.user !== undefined && req.session.user == undefined) {
        db.Usuario
            .findOne({
                where: {
                    email: req.cookies.user
                }
            })
            .then(user => {
                if (user != undefined) {
                    req.session.user = user.email;
                    req.loggedUser = user;
                }
                next();
            })
            .catch(error => {
                res.send(error);
            });
        // let user = users.find(user => user.email == req.cookies.user);
        // if (user !== undefined) {
        //     req.session.user = user.email;
        // }
    } else if (req.session.user != undefined) {
        db.Usuario
            .findOne({
                where: {
                    email: req.session.user
                }
            })
            .then(user => {
                if (user != undefined) {
                    req.loggedUser = user;
                }
                next();
            })
            .catch(error => {
                res.send(error);
            });
        // let user = users.find(user => user.email == req.session.user);
        // if (user !== undefined) {
        //     req.loggedUser = user;
        // }

    } else {
        next();
    }
}
module.exports = rememberMid;