const express = require("express");
const path = require("path");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const mainRouter = require("./routes/mainRouter");

const app = express();

const PUERTO = 3030;

const publicPath = path.resolve(__dirname, "../public");

app.use(express.static(publicPath));

app.use("/", mainRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.set("view engine", "ejs");
app.set("./views", path.join(__dirname, "index"));

// app.get("/", (req, res) => {
//   //   res.render("index");
// });

app.listen(PUERTO, () => {
  console.log(`Servidor de Corsair corriendo en ${PUERTO}`);
});
