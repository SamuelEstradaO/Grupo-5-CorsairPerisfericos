const fs = require('fs');

function logMid(req, res, next) {
    fs.appendFileSync('log.txt', 'Se ingreso a la pagina ' + req.url + '\n');
    next();
}


module.exports = logMid;

