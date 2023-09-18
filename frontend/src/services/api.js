export async function fetchCatalogueData() {
    try {
      const response = await fetch('http://localhost:3000/catalogue');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données catalogue');
      }
  
      const catalogueData = await response.json();
      return catalogueData;
    } catch (error) {
      console.error('Erreur lors de la récupération des données catalogue :', error);
      throw error; // Vous pouvez choisir de gérer l'erreur ici ou de la propager à l'appelant.
    }
  }