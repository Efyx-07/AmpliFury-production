const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const catalogue = require('./catalogue.json');

app.get('/api/catalogue', (req, res) => {
    res.json(catalogue);
});

const port = 3000;

app.listen(port, () => {
    console.log('serveur backend en cours d\'execution');
});