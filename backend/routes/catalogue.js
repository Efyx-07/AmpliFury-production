const express = require('express');
const router = express.Router();
const { productsCatalogueConnection } = require('../db'); // importe la connexion à la base de données

// emet une requête à une table de la BDD pour le catalogue complet
router.get("/", (req, res) => {
    // requête SQL pour obtenir toutes les catégories
    const categoriesQuery = 'SELECT * FROM categories';
    
    // requête SQL pour obtenir tous les produits
    const productsQuery = 'SELECT * FROM products';

    // exécute la requête pour les catégories
    productsCatalogueConnection.query(categoriesQuery, (err, categoriesResults) => {
        if (err) {
            console.error('Erreur lors de la récupération des catégories : ', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des catégories' });
            return;
        }

        // exécute la requête pour les produits
        productsCatalogueConnection .query(productsQuery, (err, productsResults) => {
            if (err) {
                console.error('Erreur lors de la récupération des produits : ', err);
                res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
                return;
            }

            // formate les résultats en un objet JSON contenant les catégories et les produits
            const categories = categoriesResults;
            const products = productsResults;
            const formattedData = formatData(categories, products);
            // renvoie les résultats au format JSON en réponse
            res.json({ categories: formattedData });
        });
    });
});

// fonction de formatage pour transformer les données brutes en un objet JSON de catalogue
function formatData(categories, products) {
    const formattedCategories = categories.map(category => ({
        name: category.name,
        categoryImage: {
            source: category.categoryImageSource,
            alt: category.categoryImageAlt
        },
        products: [] // initialise la liste des produits
    }));

    // associe les produits aux bonnes catégories en utilisant map
    formattedCategories.forEach(category => {
        category.products = products.filter(product => product.type === category.name); // détermine l'appartenance du produit en comparant le nom de la catégorie et celui du type de produit
    });

    return formattedCategories;
}

module.exports = router;