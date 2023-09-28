const express = require('express');
const router = express.Router();
const { usersConnection } = require('../db'); // importe la connexion à la base de données
const bcrypt = require('bcrypt'); // importe bcrypt
const jwt = require('jsonwebtoken'); // importe jwt
const util = require('util'); // importe util

// clé secrète pour signer et valider les JWT
const secretKey = 'amplifury_secret_key'; // clé secrète
const expiresIn = '1h'; // durée de validité du token

// middleware, verifie authentification
function verifyAuth(req, res, next) {
    const token = req.header('Authorization'); // récupère le token depuis l'en-tête Authorization

    if (!token) {
        return res.status(401).json({ error: 'Authentification requise' });
    };

    try {
        const decoded = jwt.verify(token, secretKey); // vérifie le token et la clé secrète
        req.user = decoded.userId; // ajoute l'ID utilisateur à l'objet req
        next(); // passe à la prochaine étape de la requète
    } catch (error) {
        return res.status(401).json({ error: 'Token invalide' });
    };
};

// connexion utilisateur
router.post('/login', async (req, res) => {

    // récupère les données du formulaire de connexion depuis req.body
    const { email, password } = req.body;

    try {
        // effectue une requête dans la base de données 'users' pour vérifier l'email
        const selectQuery = 'SELECT * FROM users WHERE email = ?';
        const query = util.promisify(usersConnection.query).bind(usersConnection); // convertit la fonction query de mysql2 en promise
        const rows = await query(selectQuery, [email]);

        // si aucun utilisateur n'est trouvé avec l'email, envoie une erreur d'authentification
        if (rows.length === 0) {
            res.status(401).json({ error: 'Identifiant invalide' });
            return;
        }

        // compare le password haché avec celui renseigné
        const hashedPassword = rows[0].password_hash;
        const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

        // si aucune correspondance entre les passwords, envoie une erreur d'authentification
        if (!isPasswordMatch) {
            res.status(401).json({ error: 'Identifiant invalide' });
            return;
        }

        // génère un token JWT et le renvoie à l'utilisateur
        const token = generateJwtToken(rows[0].id);
        res.status(200).json({ 
            success: true, 
            message: 'Connexion réussie', 
            token: token,
            user: {
                id: rows[0].id,
                firstName: rows[0].first_name,
                lastName: rows[0].last_name,
                address: rows[0].address,
                postalCode: rows[0].postal_code,
                city: rows[0].city,
                country: rows[0].country,
                email: rows[0].email,
            }
         });
    } catch (err) {
        console.error('Erreur lors de la connexion :', err);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
});

// fonction pour générer un token JWT
function generateJwtToken(userId) {
    // génère le token avec l'id de l'utilisateur et la clé secrète
    const token = jwt.sign({ userId }, secretKey, { expiresIn });
    return token;
}

module.exports = router;
module.exports.verifyAuth = verifyAuth;