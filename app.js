const express = require('express');
const path = require('path');

const app = express();

const PUERTO = 3030;

const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});

app.get('/signUp', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});

app.get('/productDetail', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productDetail.html'))
});

app.get('/productCart', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productCart.html'))
});

app.listen(PUERTO, () => {
    console.log(`Servidor de Corsair corriendo en ${PUERTO}`);
});