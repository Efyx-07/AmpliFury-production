const { usersConnection } = require('../db'); // importe la connexion à la base de données
const bcrypt = require('bcrypt'); // importe bcrypt 
const util = require('util'); // importe util
const authenticate = require('../auth/authenticate');

// controller pour inscription utilisateur
async function registerUser(req, res) {

    // récupère les données du formulaire d'inscription depuis req.body
    const { 
        firstName, 
        lastName, 
        address, 
        postalCode, 
        city, 
        country, 
        email, 
        password 
    } = req.body; 

    // effectue les mêmes validations côté serveur que côté client
    const nameTypeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/;
    const alphanumericRegex = /^[A-Za-z0-9, \-'’]+$/;
    const numericRegex = /^[0-9]*$/;
    const emailRegex = /^[a-z0-9.-]+@[a-z0-9._-]{2,}\.[a-z]{2,8}$/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const minLength = 8;

    if (!nameTypeRegex.test(firstName) ||
        !nameTypeRegex.test(lastName) ||
        !alphanumericRegex.test(address) ||
        (!numericRegex.test(postalCode)) ||
        !nameTypeRegex.test(city) ||
        !nameTypeRegex.test(country) ||
        !emailRegex.test(email) ||
        (password.length < minLength) ||
        (!uppercaseRegex.test(password)) ||
        (!lowercaseRegex.test(password)) ||
        (!digitRegex.test(password))) {
        return res.status(400).json({ error: 'Champs invalides' });
    };

    try {

        // utilise bcrypt pour hacher le password
        const hashedPassword = await hashPassword(password); 

        // insert les données dans la base de données 'users' avec le password haché
        const insertQuery = 'INSERT INTO users (first_name, last_name, address, postal_code, city, country, email, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [
            firstName, 
            lastName, 
            address, 
            postalCode, 
            city, 
            country, 
            email, 
            hashedPassword
        ]; 

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
};

// controller pour connexion utilisateur
async function loginUser(req, res) {

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
        };

        // génère un token JWT et le renvoie à l'utilisateur
        const token = authenticate.generateJwtToken(rows[0].id);
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
    };
};

// controller pour mise à jour données utilisateur
async function updateUser(req, res) {
    // Récupère les nouvelles informations à partir de req.body
    const { 
        firstName, 
        lastName, 
        address, 
        postalCode,
        city,
        country,
        password
    } = req.body;

    try {
        // Récupère l'ID de l'utilisateur authentifié depuis req.user
        const userId = req.user;

        // compare le mot de passe actuel fourni par l'utilisateur avec celui stocké dans la base de données
        const selectQuery = 'SELECT password_hash FROM users WHERE id = ?';
        const query = util.promisify(usersConnection.query).bind(usersConnection);
        const rows = await query(selectQuery, [userId]);

        // compare le password haché avec celui renseigné
        const hashedPassword = rows[0].password_hash;
        const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

        // si aucune correspondance entre les passwords, envoie une erreur d'authentification
        if (!isPasswordMatch) {
            res.status(401).json({ error: 'Identifiant invalide' });
            return;
        };

        // Met à jour les informations profil de l'utilisateur dans la base de données
        const updateQuery = 
        "UPDATE users SET first_name=?, last_name=?, address=?, postal_code=?, city=?, country=? WHERE id=?";

        const values = [
            firstName, 
            lastName,
            address, 
            postalCode,
            city,
            country,
            userId
        ];

        // Exécute la requête de mise à jour
        usersConnection.query(updateQuery, values, (err, results) => {
            if (err) {
                console.error('Erreur lors de la mise à jour de l\'utilisateur :', err);
                res.status(500).json({ error: 'Erreur lors de la mise à jour' });
                return;
            }

            res.status(200).json({ message: 'Informations mises à jour avec succès' });
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour' });
    }
};

// controller pour supprimer compte utilisateur (à mettre en place coté frontend)
async function deleteUser(req, res) {
    const userId = req.user;

    try {
        const deleteQuery = 'DELETE FROM users WHERE id = ?';
        const values = [userId];

        usersConnection.query(deleteQuery, values, (err, results) => {
            if (err) {
                console.error('Erreur lors de la suppression du compte de l\'utilisateur :', err);
                res.status(500).json({ error: 'Erreur lors de la suppression du compte de l\'utilisateur' });
                return;
            }

            res.status(200).json({ message: 'Compte supprimé avec succès' });
        });
    } catch (err) {
        console.error('Erreur lors de la suppression du compte de l\'utilisateur :', err);
        res.status(500).json({ error: 'Erreur lors de la suppression du compte de l\'utilisateur' });
    }
};

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


module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
};