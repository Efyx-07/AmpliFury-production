const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;

// connexion à la base de données
const connection = mysql.createConnection({
    host: 'localhost', // adresse du serveur MySQL
    user: 'root', // nom utilisateur MySQL
    password: 'FXMysql2023!', // mot de passe MySQL
    database: 'productscatalogue' // nom BDD MySQL
});

connection.connect((err) => {
    if(err) {
        console.error('Erreur lors de la recupération des datas produits: '+ err.stack)
        return;
    } console.log("connexion reussie avec la BDD")
});

app.get("/categories", (req, res) => {
    connection.query('SELECT * FROM categories',  (err, results) => {
        if(err) {
            console.error('Erreur lors de la recupération des datas produits: ', err)
            res.status(500).json({ error: 'Erreur lors de la recupération des datas produits'});
            return; 
        }
        // renvoie les resultats au format JSON en réponse
        res.json(results);
    });
});

app.get("/products", (req, res) => {
    connection.query('SELECT * FROM products',  (err, results) => {
        if(err) {
            console.error('Erreur lors de la recupération des datas produits: ', err)
            res.status(500).json({ error: 'Erreur lors de la recupération des datas produits'});
            return; 
        }
        // renvoie les resultats au format JSON en réponse
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Serveur backend en cours d'execution sur le port ${PORT}`);
});