const mysql = require('mysql2'); // appelle l'instance mysql2

// connexion à la base de données
const productsCatalogueConnection = mysql.createConnection({
    host: 'localhost', // adresse du serveur MySQL
    user: 'root', // nom utilisateur MySQL
    password: 'FXMysql', // mot de passe MySQL
    database: 'productscatalogue' // nom BDD MySQL
});

// vérifie que la connexion est établie, envoie une erreur si echec 
productsCatalogueConnection.connect((err) => {
    if(err) {
        console.error('Erreur lors de la recupération des datas produits: '+ err.stack)
        return;
    } console.log("connexion reussie avec la BDD")
});

module.exports = productsCatalogueConnection;