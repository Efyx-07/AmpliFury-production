const express = require('express');
const router = express.Router();
const db = require('../db.js'); // importe la connexion à la base de données depuis db.js

// route pour récupérer les produits
router.get('/products', (req, res) => {
    // execute une requete SQL pour récuperer les produits depuis la base de données
    db.query('SELECT * FROM products',  (err, results) => {
        if(err) {
            console.error('Erreur lors de la recupération des datas produits: ', err)
            res.status(500).json({ error: 'Erreur lors de la recupération des datas produits'});
            return; 
        }

        // renvoie les resultats au format JSON en réponse
        res.json(results);
    });
});

module.exports = router;