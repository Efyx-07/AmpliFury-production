const hostName = 'http://localhost:3000'; // adresse du serveur backend

// récupère du backend API des datas du catalogue
export async function fetchCatalogueData() {
    try {
      const response = await fetch(`${hostName}/catalogue`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données catalogue');
      }
      const catalogueData = await response.json();
      return catalogueData;
    } catch (error) {
      console.error('Erreur lors de la récupération des données catalogue: ', error);
      throw error;
    }
  };
