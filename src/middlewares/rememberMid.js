const path = require('path');
const fs = require('fs');

function rememberMid(req, res, next) {
    if (req.cookies.user !== undefined && req.session.user == undefined) {
        const usersFilePath = path.join(__dirname, '../data/users.json');
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        let user = users.find(user => user.email == req.cookies.user);
        if (user !== undefined) {
            req.session.user = user.email;
        }
    }
    next();
}
module.exports = rememberMid;