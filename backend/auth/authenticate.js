const jwt = require('jsonwebtoken'); // importe jwt
require('dotenv').config(); // charge les variables d'environnement à partir du fichier .env

// clé secrète pour signer et valider les JWT + durée de validité du token
const secretKey = process.env.AUTH_SECRETKEY;
const expiresIn = '1h';


// middleware, verifie authentification
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token manquant ou invalide.' });
    };
  
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Token invalide.' });
      }
      req.user = decoded.userId;
      next();
    });
  };

// fonction pour générer un token JWT avec l'id de l'utilisateur et la clé secrète
function generateJwtToken(userId) {
    const token = jwt.sign({ userId }, secretKey, { expiresIn });
    return token;
};

module.exports.generateJwtToken = generateJwtToken;
module.exports.authenticateToken = authenticateToken;