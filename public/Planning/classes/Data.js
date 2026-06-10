class DataManager {
  constructor() {
    this.basePath = window.__PLANNING_BASE_PATH__ || '';
    this.dataFile = `${this.basePath}/Planning/data/evenements.json`;
    this.storageKey = 'planning-evenements-data';
    this.cache = null;
  }

  chargerDepuisStorage() {
    try {
      const storedData = localStorage.getItem(this.storageKey);
      if (!storedData) {
        return null;
      }

      return JSON.parse(storedData);
    } catch (error) {
      console.error('Erreur lors de la lecture du stockage local:', error);
      return null;
    }
  }

  enregistrerDansStorage(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement dans le stockage local:', error);
    }
  }

  async charger() {
    const storedData = this.chargerDepuisStorage();
    if (storedData) {
      this.cache = storedData;
      return this.cache;
    }

    try {
      const response = await fetch(this.dataFile);
      if (!response.ok) {
        throw new Error('Erreur de chargement du fichier JSON');
      }
      this.cache = await response.json();
      this.enregistrerDansStorage(this.cache);
      return this.cache;
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      this.cache = { evenements: {} };
      this.enregistrerDansStorage(this.cache);
      return this.cache;
    }
  }

  async sauvegarder(data) {
    this.cache = data;
    this.enregistrerDansStorage(data);
    return true;
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
