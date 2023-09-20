const express = require('express'); // appelle l'instance express
const cors = require('cors'); // importe cors
const catalogueRouter = require('./routes/catalogue'); // importe la route catalogue
const usersRouter = require('./routes/users'); // importe la route users
const authRouter = require('./routes/auth'); // importe la route auth


const app = express(); // demarre le serveur express
const PORT = process.env.PORT || 3000; // definit le port

app.use(cors()); // utilise cors en tant que middleware, permet au server Express d'accepter des requetes de n'importe quelle origine

app.use('/catalogue', catalogueRouter); // utilise la route catalogue
app.use('/users', usersRouter); // utilise la route users
app.use('/auth', authRouter); // utilise la route auth

// execute le serveur backend sur le port déterminé
app.listen(PORT, () => {
    console.log(`Serveur backend en cours d'execution sur le port ${PORT}`);
});