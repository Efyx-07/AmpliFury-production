// récupère en methode fetch le catalogue stocké sur le backend et géré avec le fichier backend.js

const baseURL = 'http://localhost:3000'; // entrer ici l'adresse du serveur backend

// fonction pour récupérer le catalogue via Fetch API
export const getCatalogue = async () => {
    try {
        const response = await fetch(`${baseURL}/api/catalogue`); //syntaxe permettant de récupérer l'URL du catalogue avec la bonne adresse du serveur backend ci dessus
        if(!response.ok) {
            throw new Error('Error fetching data');
        }
        const data = await response.json();
        return data;
    } catch (error){
        console.error('Erreur', error);
        throw error;
    }
};