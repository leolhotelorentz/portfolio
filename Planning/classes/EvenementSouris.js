class EventMouseManager extends EventDisplayManager {
  constructor(root = document) {
    super(root);
    
    this.selectionEnCours = false;
    this.selectionDebut = null;
    this.selectionFin = null;
    this.overlaySelection = null;
    
    this.redimensionnementEnCours = false;
    this.eventEnRedimensionnement = null;
    this.eventBlockEnRedimensionnement = null;
    this.hauteurInitiale = 0;
    this.mouseYInitial = 0;
    this.overlayRedimensionnement = null;
    this.vientDeRedimensionner = false;
  }

  obtenirElementSousCurseur(e) {
    const eventsOverlay = this.root.getElementById("eventsOverlay");
    if (eventsOverlay) {
      eventsOverlay.style.pointerEvents = "none";
    }
    const rootNode = this.root.getRootNode();
    const element = rootNode.elementFromPoint ? rootNode.elementFromPoint(e.clientX, e.clientY) : document.elementFromPoint(e.clientX, e.clientY);
    if (eventsOverlay) {
      eventsOverlay.style.pointerEvents = "auto";
    }
    return element;
  }

  obtenirCelluleEtInfos(e) {
    const elementSousCurseur = this.obtenirElementSousCurseur(e);
    const cellule = elementSousCurseur?.closest("td");
    
    if (!cellule || cellule.cellIndex === 0) return null;
    
    const ligne = cellule.parentElement;
    const lignes = Array.from(this.corpsPlanning.querySelectorAll("tr"));
    const indexLigne = lignes.indexOf(ligne);
    
    if (indexLigne === -1) return null;
    
    const quartHeure = this.calculerQuartHeure(cellule, e.clientY);
    
    return {
      cellule,
      colonne: cellule.cellIndex,
      ligne: indexLigne,
      quartHeure,
      element: elementSousCurseur
    };
  }

  calculerQuartHeure(cellule, clientY) {
    const celluleRect = cellule.getBoundingClientRect();
    const positionRelative = clientY - celluleRect.top;
    const hauteurCellule = celluleRect.height;
    const fraction = positionRelative / hauteurCellule;
    return Math.floor(fraction * 4); 
  }


  calculerDebutFin() {
    const debutEstAvant = this.selectionDebut.colonne < this.selectionFin.colonne ||
                          (this.selectionDebut.colonne === this.selectionFin.colonne && this.selectionDebut.ligne < this.selectionFin.ligne) ||
                          (this.selectionDebut.colonne === this.selectionFin.colonne && this.selectionDebut.ligne === this.selectionFin.ligne && this.selectionDebut.quartHeure <= this.selectionFin.quartHeure);
    
    if (debutEstAvant) {
      return { vraiDebut: this.selectionDebut, vraiFin: this.selectionFin };
    } else {
      return { vraiDebut: this.selectionFin, vraiFin: this.selectionDebut };
    }
  }

  debuterSelection(e) {
    const infos = this.obtenirCelluleEtInfos(e);
    if (!infos) return;
    if (infos.element?.closest(".event-block")) return;
    
    this.selectionEnCours = true;
    this.selectionDebut = infos;
    this.selectionFin = this.selectionDebut;
    this.afficherZoneSelection();
    
    e.preventDefault();
  }

  continuerSelection(e) {
    if (!this.selectionEnCours) return;
    
    const infos = this.obtenirCelluleEtInfos(e);
    if (!infos) return;
    
    this.selectionFin = infos;
    this.afficherZoneSelection();
  }

  supprimerOverlays(overlays) {
    if (!overlays) return;
    if (Array.isArray(overlays)) {
      overlays.forEach(overlay => overlay.remove());
    } else {
      overlays.remove();
    }
  }

  afficherZoneSelection() {
    this.supprimerOverlays(this.overlaySelection);
    
    const lignes = Array.from(this.corpsPlanning.querySelectorAll("tr"));
    

    const { vraiDebut, vraiFin } = this.calculerDebutFin();
    const colonneDebut = vraiDebut.colonne;
    const colonneFin = vraiFin.colonne;
    const ligneDebut = vraiDebut.ligne;
    const ligneFin = vraiFin.ligne;
    const quartHeureDebut = vraiDebut.quartHeure;
    const quartHeureFin = vraiFin.quartHeure;
    
    const container = this.root.querySelector(".table-container");
    if (!container) {
      return;
    }
    
    const containerRect = container.getBoundingClientRect();
    const overlays = [];
    for (let colonne = colonneDebut; colonne <= colonneFin; colonne++) {
      let ligneDepartColonne = ligneDebut;
      let ligneFinColonne = ligneFin;
      let quartDepartColonne = quartHeureDebut;
      let quartFinColonne = quartHeureFin;
      if (colonne === colonneDebut && colonneFin > colonneDebut) {
        ligneFinColonne = lignes.length - 1; 
        quartFinColonne = 3; 
      }
      else if (colonne > colonneDebut && colonne < colonneFin) {
        ligneDepartColonne = 0;
        ligneFinColonne = lignes.length - 1;
        quartDepartColonne = 0;
        quartFinColonne = 3;
      }
      else if (colonne === colonneFin && colonneFin > colonneDebut) {
        ligneDepartColonne = 0;
        quartDepartColonne = 0;
      }
      
      const ligneHaut = lignes[ligneDepartColonne];
      const ligneBas = lignes[ligneFinColonne];
      
      if (!ligneHaut || !ligneBas) continue;
      
      const celluleHaut = ligneHaut.cells[colonne];
      const celluleBas = ligneBas.cells[colonne];
      
      if (!celluleHaut || !celluleBas) continue;
      
      const celluleHautRect = celluleHaut.getBoundingClientRect();
      const celluleBasRect = celluleBas.getBoundingClientRect();
      const hauteurCellule = celluleHautRect.height;
      const offsetTop = (quartDepartColonne / 4) * hauteurCellule;
      const offsetBottom = ((quartFinColonne + 1) / 4) * hauteurCellule;
      
      const top = celluleHautRect.top - containerRect.top + container.scrollTop + offsetTop;
      const left = celluleHautRect.left - containerRect.left + container.scrollLeft;
      const width = celluleHautRect.width;
      const baseHeight = celluleBasRect.bottom - celluleHautRect.top;
      const height = baseHeight - offsetTop + (offsetBottom - hauteurCellule);
      const overlay = document.createElement("div");
      overlay.className = "selection-overlay";
      overlay.style.position = "absolute";
      overlay.style.top = top + "px";
      overlay.style.left = left + "px";
      overlay.style.width = width + "px";
      overlay.style.height = height + "px";
      overlay.style.backgroundColor = "rgba(193, 173, 136, 0.3)";
      overlay.style.border = "2px dashed #c1ad88";
      overlay.style.pointerEvents = "none";
      overlay.style.zIndex = "10";
      overlay.style.borderRadius = "4px";
      overlay.style.boxSizing = "border-box";
      
      container.appendChild(overlay);
      overlays.push(overlay);
    }
    
    this.overlaySelection = overlays;
  }

  obtenirDateLundiCourante() {
    if (window.dateActuelle) {
      return DateUtils.obtenirLundi(new Date(window.dateActuelle));
    } else if (this.cleSemaineCourante) {
      const parts = this.cleSemaineCourante.replace('evenements_', '').split('-');
      return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    } else {
      return DateUtils.obtenirLundi(new Date());
    }
  }

  formaterHeureMinute(heure, minute) {
    const h = minute >= 60 ? heure + 1 : heure;
    const m = minute % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  terminerSelection(e) {
    if (!this.selectionEnCours) return;
    
    this.selectionEnCours = false;
    this.supprimerOverlays(this.overlaySelection);
    this.overlaySelection = null;
    if (!this.selectionDebut || !this.selectionFin) return;
    
    const { vraiDebut, vraiFin } = this.calculerDebutFin();
    
    const colonneDebut = vraiDebut.colonne;
    const colonneFin = vraiFin.colonne;
    const heureDebut = vraiDebut.ligne;
    const minuteDebut = vraiDebut.quartHeure * 15;
    const heureFin = vraiFin.ligne;
    const minuteFin = (vraiFin.quartHeure + 1) * 15;
    
    const mondayDate = this.obtenirDateLundiCourante();
    
    const dateDebut = new Date(mondayDate);
    dateDebut.setDate(mondayDate.getDate() + (colonneDebut - 1));
    
    const dateFin = new Date(mondayDate);
    dateFin.setDate(mondayDate.getDate() + (colonneFin - 1));
    
    const dateDebutStr = DateUtils.dateToKey(dateDebut);
    const dateFinStr = DateUtils.dateToKey(dateFin);
    const heureDebutStr = this.formaterHeureMinute(heureDebut, minuteDebut);
    const heureFinStr = this.formaterHeureMinute(heureFin, minuteFin);
    this.modeEdition = false;
    this.eventEnEdition = null;
    
    const modal = this.root.getElementById("modalEvenement");
    const formulaire = this.root.getElementById("formEvenement");
    const titreModal = modal.querySelector("h2");
    const btnSubmit = formulaire.querySelector(".btn-ajouter");
    titreModal.textContent = "Ajouter un évènement";
    btnSubmit.textContent = "Ajouter";
    this.inputTitre.value = "";
    this.inputDateDebut.value = dateDebutStr;
    this.inputHeureDebut.value = heureDebutStr;
    this.inputDateFin.value = dateFinStr;
    this.inputHeureFin.value = heureFinStr;
    if (this.inputDateDebut._flatpickr) {
      this.inputDateDebut._flatpickr.setDate(dateDebut, true);
    }
    if (this.inputDateFin._flatpickr) {
      this.inputDateFin._flatpickr.setDate(dateFin, true);
    }
    
    modal.style.display = "flex";
    setTimeout(() => this.inputTitre.focus(), 100);
    this.selectionDebut = null;
    this.selectionFin = null;
  }

  annulerSelection(e) {
    if (!this.selectionEnCours) return;
    
    this.selectionEnCours = false;
    this.selectionDebut = null;
    this.selectionFin = null;
    this.supprimerOverlays(this.overlaySelection);
    this.overlaySelection = null;
  }
  
  desactiverPointerEvents() {
    const eventsOverlay = this.root.getElementById("eventsOverlay");
    const blocsEvenements = eventsOverlay ? eventsOverlay.querySelectorAll(".event-block") : [];
    
    if (eventsOverlay) eventsOverlay.style.pointerEvents = "none";
    blocsEvenements.forEach(bloc => bloc.style.pointerEvents = "none");
    
    return { eventsOverlay, blocsEvenements };
  }

  reactiverPointerEvents(elements) {
    if (elements.eventsOverlay) elements.eventsOverlay.style.pointerEvents = "auto";
    elements.blocsEvenements.forEach(bloc => bloc.style.pointerEvents = "auto");
  }

  continuerRedimensionnement(e) {
    if (!this.redimensionnementEnCours || !this.eventBlockEnRedimensionnement) return;
    
    const elements = this.desactiverPointerEvents();
    const infos = this.obtenirCelluleEtInfos(e);
    this.reactiverPointerEvents(elements);
    
    if (!infos) return;
    
    this.celluleCibleRedimensionnement = {
      ligne: infos.ligne,
      colonne: infos.colonne,
      quartHeure: infos.quartHeure
    };
    this.afficherApercuRedimensionnement();
  }
  
  async afficherApercuRedimensionnement() {
    if (!this.celluleCibleRedimensionnement || !this.eventEnRedimensionnement) return;
    
    const { originalJour, heure, jourSegment } = this.eventEnRedimensionnement;
    const { ligne: ligneFinale, colonne: colonneFinale, quartHeure: quartHeureFinale } = this.celluleCibleRedimensionnement;
    const typeRedimensionnement = this.redimensionnementEnCours;
    
    const container = this.root.querySelector(".table-container");
    const tbody = this.corpsPlanning;
    const lignes = Array.from(tbody.querySelectorAll("tr"));
    const overlaysRedim = container.querySelectorAll(".overlay-redimensionnement-segment");
    overlaysRedim.forEach(overlay => overlay.remove());
    
    const [heureDebut, minuteDebut] = heure.split(':').map(x => parseInt(x, 10));
    let colonneDebut, ligneDebut, colonneFin, ligneFin, quartDebut, quartFin;
    
    if (typeRedimensionnement === "bottom") {
      colonneDebut = originalJour + 1; 
      ligneDebut = heureDebut;
      quartDebut = Math.floor(minuteDebut / 15);
      colonneFin = colonneFinale;
      ligneFin = ligneFinale;
      quartFin = quartHeureFinale;
    } else if (typeRedimensionnement === "top") {
      const sourceWeekKey = this.eventEnRedimensionnement.sourceWeekKey;
      const events = await window.dataManager.getEvenements(sourceWeekKey);
      const event = events.find(e => 
        e.jour === originalJour && 
        e.titre === this.eventEnRedimensionnement.titre && 
        e.heure === heure
      );
      
      if (!event) return;
      
      const minutesDebut = heureDebut * 60 + minuteDebut;
      const minutesFinTotales = minutesDebut + (event.duree * 60);
      const jourFin = originalJour + Math.floor(minutesFinTotales / (24 * 60));
      const minuteFinDansJour = minutesFinTotales % (24 * 60);
      const heureFin = Math.floor(minuteFinDansJour / 60);
      const minuteFin = minuteFinDansJour % 60;
      
      colonneDebut = colonneFinale;
      ligneDebut = ligneFinale;
      quartDebut = quartHeureFinale;
      colonneFin = jourFin + 1;
      ligneFin = heureFin;
      quartFin = Math.floor(minuteFin / 15);
    }
    
    const containerRect = container.getBoundingClientRect();
    const joursMin = Math.min(colonneDebut - 1, colonneFin - 1);
    const joursMax = Math.max(colonneDebut - 1, colonneFin - 1);
    
    for (let j = joursMin; j <= joursMax; j++) {
      const colIndex = j + 1; 
      let ligneDebutJour, ligneFinJour, quartDebutJour, quartFinJour;
      
      if (j === joursMin && j === joursMax) {
        ligneDebutJour = Math.min(ligneDebut, ligneFin);
        ligneFinJour = Math.max(ligneDebut, ligneFin);
        quartDebutJour = (ligneDebut < ligneFin || (ligneDebut === ligneFin && quartDebut <= quartFin)) ? quartDebut : quartFin;
        quartFinJour = (ligneDebut < ligneFin || (ligneDebut === ligneFin && quartDebut <= quartFin)) ? quartFin : quartDebut;
      } else if (j === joursMin) {
        ligneDebutJour = (colonneDebut - 1 === j) ? ligneDebut : 0;
        quartDebutJour = (colonneDebut - 1 === j) ? quartDebut : 0;
        ligneFinJour = lignes.length - 1;
        quartFinJour = 3;
      } else if (j === joursMax) {
        ligneDebutJour = 0;
        quartDebutJour = 0;
        ligneFinJour = (colonneFin - 1 === j) ? ligneFin : lignes.length - 1;
        quartFinJour = (colonneFin - 1 === j) ? quartFin : 3;
      } else {
        ligneDebutJour = 0;
        quartDebutJour = 0;
        ligneFinJour = lignes.length - 1;
        quartFinJour = 3;
      }
      
      const ligneHaut = lignes[ligneDebutJour];
      const ligneBas = lignes[ligneFinJour];
      
      if (!ligneHaut || !ligneBas) continue;
      
      const celluleHaut = ligneHaut.cells[colIndex];
      const celluleBas = ligneBas.cells[colIndex];
      
      if (!celluleHaut || !celluleBas) continue;
      
      const celluleHautRect = celluleHaut.getBoundingClientRect();
      const celluleBasRect = celluleBas.getBoundingClientRect();
      const hauteurCellule = celluleHautRect.height;
      const offsetTop = (quartDebutJour / 4) * hauteurCellule;
      const offsetBottom = ((quartFinJour + 1) / 4) * hauteurCellule;
      
      const top = celluleHautRect.top - containerRect.top + container.scrollTop + offsetTop;
      const left = celluleHautRect.left - containerRect.left;
      const width = celluleHautRect.width;
      const baseHeight = celluleBasRect.bottom - celluleHautRect.top;
      const height = baseHeight - offsetTop + (offsetBottom - hauteurCellule);
      
      const overlay = document.createElement("div");
      overlay.style.position = "absolute";
      overlay.style.left = left + "px";
      overlay.style.top = top + "px";
      overlay.style.width = width + "px";
      overlay.style.height = height + "px";
      overlay.style.backgroundColor = "rgba(193, 173, 136, 0.3)";
      overlay.style.border = "2px dashed #c1ad88";
      overlay.style.pointerEvents = "none";
      overlay.style.zIndex = "5";
      overlay.classList.add("overlay-redimensionnement-segment");
      
      container.appendChild(overlay);
      if (!this.overlayRedimensionnement) {
        this.overlayRedimensionnement = overlay;
      }
    }
  }
  
  async terminerRedimensionnement(e) {
    if (!this.redimensionnementEnCours) return;
    this.vientDeRedimensionner = true;
    setTimeout(() => {
      this.vientDeRedimensionner = false;
    }, 100);
    
    const typeRedimensionnement = this.redimensionnementEnCours;
    this.redimensionnementEnCours = false;
    const container = this.root.querySelector(".table-container");
    const overlaysRedim = container.querySelectorAll(".overlay-redimensionnement-segment");
    overlaysRedim.forEach(overlay => overlay.remove());
    this.overlayRedimensionnement = null;
    
    if (!this.eventEnRedimensionnement || !this.eventBlockEnRedimensionnement) return;
    if (!this.celluleCibleRedimensionnement) {
      this.eventEnRedimensionnement = null;
      this.eventBlockEnRedimensionnement = null;
      return;
    }
    
    const { sourceWeekKey, originalJour, titre, heure, jourSegment } = this.eventEnRedimensionnement;
    const { ligne: ligneFinale, colonne: colonneFinale, quartHeure: quartHeureFinale } = this.celluleCibleRedimensionnement;
    
    let events = await window.dataManager.getEvenements(sourceWeekKey);
    const eventIndex = events.findIndex(e => 
      e.jour === originalJour && 
      e.titre === titre && 
      e.heure === heure
    );
    
    if (eventIndex === -1) {
      this.eventEnRedimensionnement = null;
      this.eventBlockEnRedimensionnement = null;
      this.celluleCibleRedimensionnement = null;
      return;
    }
    
    const [heureDebut, minuteDebut] = heure.split(':').map(x => parseInt(x, 10));
    
    if (typeRedimensionnement === "bottom") {
      const jourFinal = colonneFinale - 1; 
      const heureFinal = ligneFinale;
      const minuteFinal = (quartHeureFinale + 1) * 15; 
      const joursEcoules = jourFinal - originalJour;
      let nouvelleDuree;
      
      if (joursEcoules === 0) {
        const minutesDebut = heureDebut * 60 + minuteDebut;
        const minutesFin = heureFinal * 60 + minuteFinal;
        nouvelleDuree = (minutesFin - minutesDebut) / 60;
      } else if (joursEcoules > 0) {
        const minutesDebut = heureDebut * 60 + minuteDebut;
        const minutesFin = heureFinal * 60 + minuteFinal;
        const minutesPremierJour = (24 * 60) - minutesDebut;
        const minutesJoursIntermediaires = (joursEcoules - 1) * 24 * 60;
        const minutesDernierJour = minutesFin;
        nouvelleDuree = (minutesPremierJour + minutesJoursIntermediaires + minutesDernierJour) / 60;
      } else {
        nouvelleDuree = 0.25; 
      }
      
      events[eventIndex].duree = Math.max(0.25, nouvelleDuree);
      
    } else if (typeRedimensionnement === "top") {
      if (jourSegment === originalJour) {
        const jourNouveauDebut = colonneFinale - 1;
        const heureNouveauDebut = ligneFinale;
        const minuteNouveauDebut = quartHeureFinale * 15;
        const dureeActuelle = events[eventIndex].duree;
        const minutesDebut = heureDebut * 60 + minuteDebut;
        const minutesFinTotales = minutesDebut + (dureeActuelle * 60);
        
        const jourFinActuel = originalJour + Math.floor(minutesFinTotales / (24 * 60));
        const minuteFinDansJour = minutesFinTotales % (24 * 60);
        
        let nouvelleDuree;
        const minutesNouveauDebut = jourNouveauDebut * 24 * 60 + heureNouveauDebut * 60 + minuteNouveauDebut;
        const minutesFin = jourFinActuel * 24 * 60 + minuteFinDansJour;
        nouvelleDuree = (minutesFin - minutesNouveauDebut) / 60;
        
        if (nouvelleDuree >= 0.25) {
          events[eventIndex].jour = jourNouveauDebut;
          events[eventIndex].heure = String(heureNouveauDebut).padStart(2, '0') + ':' + String(minuteNouveauDebut).padStart(2, '0');
          events[eventIndex].duree = nouvelleDuree;
        }
      }
    }
    
    await window.dataManager.setEvenements(sourceWeekKey, events);
    
    if (sourceWeekKey === this.cleSemaineCourante) {
      this.evenements = events;
    }
    
    await this.afficherEvenements();
    
    this.eventEnRedimensionnement = null;
    this.eventBlockEnRedimensionnement = null;
    this.celluleCibleRedimensionnement = null;
  }
}
