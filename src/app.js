const express = require("express");
const path = require("path");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const mainRouter = require("./routes/mainRouter");
const methodOverride = require("method-override");
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');

const logMiddleware = require('./middlewares/logMid');
const rememberMiddleware = require('./middlewares/rememberMid');

const PUERTO = 3030;

const publicPath = path.resolve(__dirname, "../public");


app.use(express.static(publicPath));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(methodOverride("_method"));
app.use(session({ secret: "Corsecreto", resave: false, saveUninitialized: false }));

app.use(rememberMiddleware);
app.use(logMiddleware);

app.use("/", mainRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));



app.listen(PUERTO, () => {
  console.log(`Servidor de Corsair corriendo en ${PUERTO}`);
});
