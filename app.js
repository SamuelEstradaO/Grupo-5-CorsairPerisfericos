const express = require('express');
const path = require('path');

const app = express();

const PUERTO = 3030;

const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');});

app.get('/signUp', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login')});

app.get('/productDetail', (req, res) => {
    res.render('productDetail')
});

app.get('/productCart', (req, res) => {
    res.render('productCart')
});

app.listen(PUERTO, () => {
    console.log(`Servidor de Corsair corriendo en ${PUERTO}`);
});