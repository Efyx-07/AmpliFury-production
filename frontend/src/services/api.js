// récupère du backend API des datas du catalogue
export async function fetchCatalogueData() {
    try {
      const response = await fetch('http://localhost:3000/catalogue');
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

// récupère du backend API des datas des users
export async function fetchUsersData() {
  try {
    const response = await fetch('http://localhost:3000/users');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données utilisateurs');
    }
  
    const usersData = await response.json();
    return usersData;
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateurs: ', error);
    throw error;
  }
};