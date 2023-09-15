const mysql = require('mysql2');

// connexion à la base de données
const db = mysql.createConnection({
    host: '127.0.0.1', // adresse du serveur MySQL
    user: 'root', // nom utilisateur MySQL
    password: 'FXMysql', // mot de passe MySQL
    database: 'productscatalogue' // nom BDD MySQL
});

module.exports = db;