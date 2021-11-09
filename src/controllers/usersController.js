const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
  login: (req, res) => {
    res.render("./users/login");
  },
  register: (req, res) => {
    res.render("./users/register");
  },

  newUser: (req, res) => {
    const newUser = {
      id: users.length + 1,
      name: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
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
    let index = users.indexOf(user => user.id == updateId);
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
