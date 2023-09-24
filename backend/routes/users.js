const express = require('express');
const router = express.Router();
const { usersConnection } = require('../db'); // importe la connexion à la base de données
const bcrypt = require('bcrypt'); // importe bcrypt 

// inscription utilisateur 
router.post('/register', async(req, res) => {

    // récupère les données du formulaire d'inscription depuis req.body
    const { firstName, lastName, email, password} = req.body; 

    try {

        // utilise bcrypt pour hacher le password
        const hashedPassword = await hashPassword(password); 

        // insert les données dans la base de données 'users' avec le password haché
        const insertQuery = 'INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)';
        const values = [firstName, lastName, email, hashedPassword]; 

        usersConnection.query(insertQuery, values, (err, results) => {
            if (err) {
                console.error('Erreur lors de l\inscription: ', err);
                res.status(500).json({ error: 'Erreur lors de l\inscription' });
                return;
            }

            // utilisateur inscrit avec succés
            res.status(201).json({ message: 'Inscription reussie'});
        });

    } catch (err) {
        console.error('Erreur lors de l\inscription: ', err);
        res.status(500).json({ error: 'Erreur lors de l\inscription' });
    };
});

// fonction asynchrone, permet de hacher le password avec bcrypt
async function hashPassword(password) {

    try {

        // genere le sel
        const salt = await bcrypt.genSalt(10); 

        // hachage du password avec le sel
        const hash = await bcrypt.hash(password, salt);
        return hash;

    } catch (err) {
        throw err;
    };
};

// emet une requête à une table de la BDD pour récupérer la liste des utilisateurs et leurs données
router.get("/", (req, res) => {
    // requête SQL pour obtenir tous les utilisateurs
    const usersQuery = 'SELECT * FROM users';

    // exécute la requête pour les utilisateurs
    usersConnection.query(usersQuery, (err, usersResults) => {
        if (err) {
            console.error('Erreur lors de la récupération des users : ', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des users' });
            return;
        }

        // formate les résultats en un objet JSON contenant les utilisateurs et leurs données
        const users = usersResults;
        res.json({ users });
    });
});

module.exports = router;