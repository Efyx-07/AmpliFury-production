const mysql = require('mysql2'); // appelle l'instance mysql2

const hostName = 'localhost';
const userName = 'root';
const password = 'FXMysql';

// connexion à la base de données 'productscatalogue'
const productsCatalogueConnection = mysql.createConnection({
    host: hostName, // adresse du serveur MySQL
    user: userName, // nom utilisateur MySQL
    password: password, // mot de passe MySQL
    database: 'productscatalogue' // nom BDD MySQL
});

// vérifie que la connexion est établie, envoie une erreur si echec 
productsCatalogueConnection.connect((err) => {
    if(err) {
        console.error('Erreur lors de la recupération des datas produits: '+ err.stack)
        return;
    } console.log("connexion reussie avec la BDD productscatalogue")
});

// connexion à la base de données 'users'
const usersConnection = mysql.createConnection({
    host: hostName, // adresse du serveur MySQL
    user: userName, // nom utilisateur MySQL
    password: password, // mot de passe MySQL
    database: 'users' // nom BDD MySQL
});

// vérifie que la connexion est établie, envoie une erreur si echec 
usersConnection.connect((err) => {
    if(err) {
        console.error('Erreur lors de la recupération des datas produits: '+ err.stack)
        return;
    } console.log("connexion reussie avec la BDD users")
});

module.exports = { productsCatalogueConnection, usersConnection };