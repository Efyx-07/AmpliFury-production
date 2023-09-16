const express = require('express'); // appelle l'instance express
const mysql = require('mysql2'); // appelle l'instance mysql2
const cors = require('cors'); // importe cors

const app = express(); // demarre le serveur express
const PORT = process.env.PORT || 3000; // definit le port

app.use(cors()); // utilise cors en tant que middleware, permet au server Express d'accepter des requetes de n'importe quelle origine

// connexion à la base de données
const connection = mysql.createConnection({
    host: 'localhost', // adresse du serveur MySQL
    user: 'root', // nom utilisateur MySQL
    password: 'FXMysql2023!', // mot de passe MySQL
    database: 'productscatalogue' // nom BDD MySQL
});

// vérifie que la connexion est établie, envoie une erreur si echec 
connection.connect((err) => {
    if(err) {
        console.error('Erreur lors de la recupération des datas produits: '+ err.stack)
        return;
    } console.log("connexion reussie avec la BDD")
});

// emet une requete à une table de la BDD
app.get("/categories", (req, res) => {
    executeQuery('SELECT * FROM categories', res);
});

// emet une requete à une table de la BDD
app.get("/products", (req, res) => {
    executeQuery('SELECT * FROM products', res);
});

// traite la requete et retourne les données au format json
function executeQuery(query, res) {
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données : ', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des données' });
            return;
        }
        // Renvoie les résultats au format JSON en réponse
        res.json(results);
    });
}

// execute le serveur backend sur le port déterminé
app.listen(PORT, () => {
    console.log(`Serveur backend en cours d'execution sur le port ${PORT}`);
});