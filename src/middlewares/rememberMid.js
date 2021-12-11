const path = require('path');
const fs = require('fs');


function rememberMid(req, res, next) {
    const usersFilePath = path.join(__dirname, '../data/users.json');
    let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    if (req.cookies.user !== undefined && req.session.user == undefined) {
        if (req.cookies.user !== undefined && req.session.user == undefined) {
            let user = users.find(user => user.email == req.cookies.user);
            if (user !== undefined) {
                req.session.user = user.email;
            }
        }
    }
    if (req.session.user != undefined) {
        req.loggedUser = users.find(user => user.email === req.session.user);
    }
    next();
}
module.exports = rememberMid;