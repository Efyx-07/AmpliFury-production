const express = require('express');
const router = express.Router();
const { usersConnection } = require('../db'); // importe la connexion à la base de données
const bcrypt = require('bcrypt');

// inscription utilisateur 
router.post('/register', async(req, res) => {

    const { firstName, lastName, email, password} = req.body; // récupère les données du formulaire d'inscription depuis req.body

    try {
        const hashedPassword = await hashPassword(password); // utilise bcrypt pour hacher le password

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
        const salt = await bcrypt.genSalt(10); // genere le sel
        const hash = await bcrypt.hash(password, salt); // hachage du password avec le sel
        return hash;
    } catch (err) {
        throw err;
    };
};


module.exports = router;