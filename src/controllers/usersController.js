const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');



const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
  login: (req, res) => {
    res.render("./users/login");
  },
  register: (req, res) => {
    res.render("./users/register");
  },
  newLogin: (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.render("./users/login", {
        error: "Usuario no encontrado"
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.render("./users/login", {
        error: "Contraseña incorrecta"
      });
    }
    req.session.user = user;
    res.redirect("/");
  },
  newUser: (req, res) => {
    if (req.file != undefined) {
      userImage = req.file.filename;
    } else {
      userImage = "default.svg";
    }
    let passEncriptada = bcrypt.hashSync(req.body.password, 10);
    const newUser = {
      id: users.length + 1,
      name: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: passEncriptada,
      userImage: userImage,
    };
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
    res.redirect('/users/login');
  },
  delete: (req, res) => {
    let deleteId = req.params.id;
    users = users.filter(user => user.id != deleteId);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
    res.redirect('/');
  },
  edit: (req, res) => {
    let editId = req.params.id;
    let user = users.find(user => user.id == editId);
    res.render("./users/user", { user });
  },
  update: (req, res) => {
    let updateId = req.params.id;
    let index = users.findIndex(user => user.id === parseInt(updateId));
    users[index].name = req.body.firstName;
    users[index].lastName = req.body.lastName;
    if (req.body.password != '') {
      users[index].password = req.body.password;
    }
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
    res.redirect('/users/edit/' + updateId);
  },

};



module.exports = usersController;
