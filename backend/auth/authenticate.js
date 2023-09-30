const jwt = require('jsonwebtoken'); // importe jwt

// clé secrète pour signer et valider les JWT + durée de validité du token
const secretKey = 'amplifury_secret_key'; 
const expiresIn = '1h'; 

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

// fonction pour générer un token JWT avec l'id de l'utilisateur et la clé secrète
function generateJwtToken(userId) {
    const token = jwt.sign({ userId }, secretKey, { expiresIn });
    return token;
}

module.exports.generateJwtToken = generateJwtToken;
module.exports.verifyAuth = verifyAuth;