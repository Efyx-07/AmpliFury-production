const express = require('express');
const router = express.Router();
const { usersConnection } = require('../db'); // importe la connexion à la base de données
const bcrypt = require('bcrypt'); // importe bcrypt 
const jwt = require('jsonwebtoken'); // importe jwt 

// clé secrete pour signer et valider les JWT
const secretKey = 'amplifury_secret_key'; // clé secrète
const expiresIn = '1h'; // durée de validité du token


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


// connexion utilisateur
router.post('/login', async (req, res) => {

    // récupère les données du formulaire de connexion avec req.body
    const { email, password } = req.body;

    try {

        // effectue une requete dans la base de données 'users' pour vérifier l'email
        const selectQuery = 'SELECT * FROM users WHERE email = ?';
        const emailCheck = await queryDatabase(selectQuery, [email]);

        // si aucun utilisateur n'est trouvé avec l'email, envoie une erreur d'authentification
        if (emailCheck.length === 0) {
            res.status(401).json({ error: 'Identifiant invalide'});
            return;
        };

        // compare le password haché avec celui renseigné
        const hashedPassword = emailCheck[0].password_hash;
        const isPasswordMatch = await bcrypt.compare(password, hashedPassword); 

        // si aucune correspondance entre les passwords, envoie une erreur d'authentification
        if (!isPasswordMatch) {
            res.status(401).json({ error: 'Identifiant invalide'});
            return;
        };

        // génère un token JWT et le renvoie à l'utilisateur
        const token = generateJwtToken(emailCheck[0].id); 
        res.json({ token });

    } catch (err) {
        console.error('Erreur lors de la connexion: ', err);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
    
});

// fonction pour générer un token JWT
function generateJwtToken(userId) {
    // génère le token avec l'id de l'utilisateur et la secret key
    const token = jwt.sign({ userId}, secretKey, { expiresIn }); 
    return token;
}; 

// fonction asynchrone effectue des requêtes à la base de données et gère les erreurs
async function queryDatabase(query, values) {
    try {
        return usersConnection.query(query, values); 
    } catch (err) {
        throw err;
    };
};


module.exports = router;