const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// importe les fichiers de routes et les utilise
const productRoutes = require('./routes/productRoutes.js');

// utilise les routes
app.use('/api/products', productRoutes);


app.listen(PORT, () => {
    console.log(`Serveur backend en cours d'execution sur le port ${PORT}`);
});