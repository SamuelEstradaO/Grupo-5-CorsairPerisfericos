const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const db = require("../database/models");
const { Op } = require("sequelize");

const { validationResult } = require("express-validator");

// const usersFilePath = path.join(__dirname, "../data/users.json");
// let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const usersController = {
  login: (req, res) => {
    res.render("./users/login");
  },
  register: (req, res) => {
    res.render("./users/register");
  },
  newLogin: (req, res) => {
    let validations = validationResult(req);
    if (validations.isEmpty()) {
      const { email, password } = req.body;

      db.Usuario
        .findOne({
          where: {
            email: email,
          },
        })
        .then((user) => {
          if (!user) {
            validations.errors.push({ msg: "El usuario no existe" });
            return res.render("./users/login", {
              errors: validations.errors,
              user: req.loggedUser,
            });
          } else {
            if (!bcrypt.compareSync(password, user.password)) {
              validations.errors.push({ msg: "La contraseña es incorrecta" });
              return res.render("./users/login", {
                errors: validations.errors,
                user: req.loggedUser,
              });
            } else {
              req.session.user = user.email;
              console.log(req.session.user);
              if (req.body.rememberMe !== undefined) {
                res.cookie("user", user.email, {
                  maxAge: 1000 * 60 * 60 * 24 * 7,
                });
              }
              res.redirect("/");
            }
          }
        })
        .catch((error) => {
          res.render("notFound", { error: "Ocurrio un error al iniciar sesión, intente de nuevo más tarde" });
        });

      // const user = users.find(user => user.email === email);
      // if (!user) {
      //   validations.errors.push({ msg: 'El usuario no existe' });
      //   return res.render("./users/login", {
      //     errors: validations.errors, user: req.loggedUser
      //   });
      // } else {
      //   if (!bcrypt.compareSync(password, user.password)) {
      //     validations.errors.push({ msg: 'La contraseña es incorrecta' });
      //     return res.render("./users/login", {
      //       errors: validations.errors, user: req.loggedUser
      //     });
      //   } else {
      //     req.session.user = user.email;
      //     if (req.body.rememberMe !== undefined) {
      //       res.cookie('user', user.email, { maxAge: 1000 * 60 * 60 * 24 * 7 });
      //     }
      //     res.redirect("/");
      //   }
      // }
    } else {
      res.render("./users/login", {
        errors: validations.errors,
        user: req.loggedUser,
      });
    }
  },

  /* Volver a ver los .catch */
  newUser: (req, res) => {
    let validations = validationResult(req);
    if (validations.isEmpty()) {
      if (req.file != undefined) {
        userImage = req.file.filename;
      } else {
        userImage = "default.svg";
      }
      let passEncriptada = bcrypt.hashSync(req.body.password, 10);
      db.Usuario
        .findOne({
          where: { email: req.body.email },
        })
        .then((user) => {
          if (user) {
            validations.errors.push({ msg: "El usuario ya existe." });
            res.render("./users/register", {
              errors: validations.errors,
              user: req.loggedUser,
            });
          } else {
            return db.Usuario.create({
              name: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: passEncriptada,
              userImage: userImage,
            })

          }
        })
        .then(() => {
          res.redirect("/users/login");
        })
        .catch((error) => {
          res.render("notFound", { error: "Ocurrio un error al registrar el usuario, intente de nuevo más tarde" });
        });

      // const newUser = {
      //   id: users.length + 1,
      //   name: req.body.firstName,
      //   lastName: req.body.lastName,
      //   email: req.body.email,
      //   password: passEncriptada,
      //   userImage: userImage,
      // };
      // users.push(newUser);
      // fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
      // res.redirect('/users/login');
    } else {
      if(req.file){
        fs.unlink(path.join(__dirname, "../../public/images/users/", req.file.filename),
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
        })
      }
      res.render("./users/register", {
        errors: validations.errors,
        user: req.loggedUser,
      });
    }
  },
  delete: (req, res) => {
    let deleteId = req.params.id;
    // users = users.filter(user => user.id != deleteId);
    // fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
    // res.redirect('/');
    db.Usuario
      .findByPk(deleteId)
      .then((user) => {
        if (user) {
          if (user.userImage != "default.svg") {
            fs.unlink(
              path.join(__dirname, `../../public/images/users/${user.userImage}`),
              (err) => {
                if (err) {
                  console.log(err);
                  return;
                }
              }
            );
          }
          return db.Usuario.destroy({
            where: {
              id: deleteId,
            },
          })

        }
      })
      .then(() => {
        res.redirect("/");
      })
      .catch((error) => {
        res.render("notFound", { error: "Ocurrio un error al eliminar el usuario, intente de nuevo más tarde" });
      });
  },
  edit: (req, res) => {
    let editId = req.params.id;
    if(req.loggedUser.id != editId){
      res.redirect(`/users/edit/${req.loggedUser.id}`);
    }
    // let user = users.find(user => user.id == editId);
    // res.render("./users/user", { user });
    db.Usuario.findByPk(editId)
      .then((user) => {
        res.render("./users/user", { user: user });
      })
      .catch((error) => {
        res.render("notFound", { error: "Ocurrio un error al acceder a la información, intente de nuevo más tarde" });
      });
  },
  update: (req, res) => {
    let updateId = req.params.id;
    // let index = users.findIndex(user => user.id === parseInt(updateId));
    // users[index].name = req.body.firstName;
    // users[index].lastName = req.body.lastName;
    // if (req.body.password != '') {
    //   users[index].password = req.body.password;
    // }
    // fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
    // res.redirect('/users/edit/' + updateId);
    let validations = validationResult(req);
    if (validations.isEmpty()) {
      db.Usuario
        .findByPk(updateId)
        .then((user) => {
          let password;
          if (req.body.password != "") {
            password = bcrypt.hashSync(req.body.password, 10);
          } else {
            password = user.password;
          }
          if (req.file != undefined) {
            if (user.userImage != "default.svg") {
              fs.unlink(
                path.join(
                  __dirname,
                  `../../public/images/users/${user.userImage}`
                ),
                (err) => {
                  if (err) {
                    console.log(err);
                    return;
                  }
                }
              );
            }
            userImage = req.file.filename;
          } else {
            userImage = user.userImage;
          }
          user
            .update({
              name: req.body.firstName,
              lastName: req.body.lastName,
              password: password,
              userImage: userImage,
            })
            .then(() => {
              res.redirect("/users/edit/" + updateId);
            })
            .catch((error) => {
              res.render("notFound", { error: "Ocurrio un error al actualizar el usuario, intente de nuevo más tarde" });
            });
        });
    } else {
      if(req.file){
        fs.unlink(path.join(__dirname, "../../public/images/users/", req.file.filename),
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
        })
      }
      res.render("./users/user", {
        errors: validations.errors,
        user: req.loggedUser,
      });
    }
  },
  logged: (req, res) => {
    if (req.session.user) {
      res.send(req.session.user);
    } else {
      res.send("No estas logeado");
    }
  },

  logout: (req, res) => {
    //delete cookie and session
    res.clearCookie("user");
    req.session.destroy();

    return res.redirect("/");
  },
};

module.exports = usersController;
