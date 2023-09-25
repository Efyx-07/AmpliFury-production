const express = require('express');
const router = express.Router();
const { usersConnection } = require('../db'); // importe la connexion à la base de données
const jwt = require('jsonwebtoken'); // importe jwt
const util = require('util'); // Importe util

const secretKey = 'amplifury_secret_key'; // clé secrète

// verifie l'authentification
const verifyAuth = (req, res, next) => {
    // récupère le token à partir de l'en-tête Authorization
    const token = req.header('Authorization');

    if (!token) {
        // si token non trouvé, renvoie une réponse non autorisée
        return res.status(401).json({ error: 'Authentification requise' });
    };

    try {

        // vérifie et décode le token en utilisant la clé secrète
        const decoded = jwt.verify(token, secretKey);

        // ajoute les données décodées de l'utilisateur à l'objet req pour utilisation ulterieure
        req.user = decoded;

        // passe à la prochaine étape (gestion de la route) 
        next();

    } catch (err) {
        // si erreur verification token, renvoie une réponse non autorisée
        res.status(401).json({ error: 'Token invalide' });
    };
};

// route pour obtenir les données de l'utilisateur connecté
router.get('/profile', verifyAuth, async(req, res) => {
    const userId = req.user.id;

    try {
        // effectue une requete dans la BDD pour obtenir les données de l'utilisateur
        const selectQuery = 'SELECT * FROM users WHERE id = ?';
        const query = util.promisify(usersConnection.query).bind(usersConnection);
        const user = await query(selectQuery, [userId]);

        if (user.length === 0) {
            // si aucun utilisateur trouvé, renvoie réponse non trouvé
            res.status(404).json({ error: 'Utilisateur introuvable' });
            return
        };

        // renvoie les données utilisateur au format JSON
        res.json({ user: user[0]});
    } catch (err) {
        console.error('Erreur lors de la recupération des données utilisateur: ', err);
        res.status(500).json({ error: 'Erreur lors de la recupération des données utilisateur' });
    };
});

module.exports = router;