// const fs = require('fs');
// const path = require('path');
const db = require('../database/models');
// const usersFilePath = path.join(__dirname, '../data/users.json');
// let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function guestOnlyMid(req, res, next) {
    // const user = users.find(user => user.email === req.session.user);
    // if (user == undefined) {
    //     next();
    // } else {
    //     res.redirect('/');
    // }
    if (req.session.user != undefined) {
        db.Usuario
            .findOne({
                where: {
                    email: req.session.user
                }
            })
            .then(user => {
                if (user == undefined) {
                    next();
                } else {
                    res.redirect('/');
                }
            })

    } else {
        next();
    }
}

module.exports = guestOnlyMid;

