
// const fs = require('fs');
// const path = require('path');
const db = require('../database/models');

// const usersFilePath = path.join(__dirname, '../data/users.json');
// let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function checkLoginMid(req, res, next) {
    if (req.session.user) {
        db.Usuario
        .findOne({
            where: {
                email: req.session.user
            }
        })
        .then(user => {
            if (user != undefined) {
                next();
            } else {
                res.redirect('/users/login');
            }
        })
        .catch(error => {
            res.send(error);
        }); 
    } else {
        res.redirect('/users/login');
    }
    
    // const user = users.find(user => user.email === req.session.user);
    // if (user != undefined) {
    //     next();
    // } else {
    //     res.redirect('/users/login');
    // }
}

module.exports = checkLoginMid;

