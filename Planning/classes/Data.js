class DataManager {
  constructor() {
    this.dataFile = 'data/evenements.json';
    this.cache = null;
  }

  async charger() {
    try {
      const response = await fetch(this.dataFile);
      if (!response.ok) {
        throw new Error('Erreur de chargement du fichier JSON');
      }
      this.cache = await response.json();
      return this.cache;
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      this.cache = { evenements: {} };
      return this.cache;
    }
  }

  async sauvegarder(data) {
    try {
      const response = await fetch('data/save_data.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur HTTP:', response.status, errorText);
        throw new Error('Erreur lors de la sauvegarde');
      }
      
      const result = await response.json();
      this.cache = data;
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
      return false;
    }
  }

  async getEvenements(cleSemaine) {
    if (!this.cache) {
      await this.charger();
    }
    return this.cache.evenements[cleSemaine] || [];
  }

  async setEvenements(cleSemaine, evenements) {
    if (!this.cache) {
      await this.charger();
    }
    this.cache.evenements[cleSemaine] = evenements;
    return await this.sauvegarder(this.cache);
  }

  async supprimerTout() {
    this.cache = { evenements: {} };
    return await this.sauvegarder(this.cache);
  }

  async getToutesCles() {
    if (!this.cache) {
      await this.charger();
    }
    return Object.keys(this.cache.evenements);
  }
}

window.dataManager = new DataManager();
