class EventManager {
  constructor(root = document) {
    this.root = root;
    this.corpsPlanning = this.root.querySelector(".Planning tbody");
    this.inputTitre = this.root.getElementById("titre");
    this.inputDateDebut = this.root.getElementById("dateDebut");
    this.inputHeureDebut = this.root.getElementById("heureDebut");
    this.inputDateFin = this.root.getElementById("dateFin");
    this.inputHeureFin = this.root.getElementById("heureFin");

    this.cleSemaineCourante = null;
    this.evenements = [];
    this.modeEdition = false;
    this.eventEnEdition = null;

    this.initGlobalListeners();

    if (window.dateActuelle) {
      const lundi = DateUtils.obtenirLundi(window.dateActuelle);
      const cle = this.clePourSemaine(DateUtils.dateToKey(lundi));
      this.cleSemaineCourante = cle;
      this.chargerEvenements();
    }
  }

  initGlobalListeners() {
    document.addEventListener("semaineChange", async (e) => {
      this.cleSemaineCourante = this.clePourSemaine(e.detail);
      this.evenements = await window.dataManager.getEvenements(this.cleSemaineCourante);
      this.afficherEvenements();
    });

    document.addEventListener("vueChange", () => {
      setTimeout(() => {
        this.afficherEvenements();
      }, 100);
    });
  }

  async chargerEvenements() {
    if (!this.cleSemaineCourante) return;
    this.evenements = await window.dataManager.getEvenements(this.cleSemaineCourante);
    this.afficherEvenements();
  }

  initListeners() {
    this.attacherEvenementsBoutons();
    this.attacherEvenementsModales();
    this.attacherEvenementsPlanning();
  }

  attacherEvenementsBoutons() {
    const boutons = [
      { id: "AjoutEvenement", handler: () => this.ouvrirModal() },
      { id: "VoirEvenement", handler: () => this.voirEvenements() },
      { class: ".close", handler: () => this.fermerModal() },
      { class: ".close-liste", handler: () => this.fermerModalListeEvenements() },
      { class: ".close-menu", handler: () => this.fermerMenuAction() },
      { class: ".close-erreur", handler: () => this.fermerModalErreur() },
      { id: "btnFermerErreur", handler: () => this.fermerModalErreur() }
    ];

    boutons.forEach(({ id, class: cls, handler }) => {
      const element = id ? this.root.getElementById(id) : this.root.querySelector(cls);
      if (element) element.addEventListener("click", handler);
    });
  }

  attacherEvenementsModales() {
    const modales = [
      { id: "modalEvenement", handler: () => this.fermerModal() },
      { id: "menuAction", handler: () => this.fermerMenuAction() },
      { id: "modalConfirmation", handler: () => this.fermerConfirmation() },
      { id: "modalListeEvenements", handler: () => this.fermerModalListeEvenements() },
      { id: "modalErreur", handler: () => this.fermerModalErreur() }
    ];

    modales.forEach(({ id, handler }) => {
      const modal = this.root.getElementById(id);
      if (modal) {
        window.addEventListener("click", (e) => {
          if (e.target === modal) handler();
        });
      }
    });
  }

  attacherEvenementsPlanning() {
    
    const form = this.root.getElementById("formEvenement");
    if (form) form.addEventListener("submit", (e) => this.ajouterEvenement(e));
    if (this.corpsPlanning) this.corpsPlanning.addEventListener("click", (e) => this.supprimerEvenement(e));
    
    const tableContainer = this.root.querySelector(".table-container");
    if (tableContainer) {
      tableContainer.addEventListener("mousedown", (e) => this.debuterSelection(e));
      tableContainer.addEventListener("mousemove", (e) => {
        if (this.redimensionnementEnCours) {
          this.continuerRedimensionnement(e);
        } else {
          this.continuerSelection(e);
        }
      });
      tableContainer.addEventListener("mouseup", (e) => {
        if (this.redimensionnementEnCours) {
          this.terminerRedimensionnement(e);
        } else {
          this.terminerSelection(e);
        }
      });
      tableContainer.addEventListener("mouseleave", (e) => {
        if (this.redimensionnementEnCours) {
          this.terminerRedimensionnement(e);
        } else {
          this.annulerSelection(e);
        }
      });
    }
  }

  initFormCalendars() {
    const dateDebutElement = this.root.getElementById("dateDebut");
    const dateFinElement = this.root.getElementById("dateFin");
    const modalContent = dateDebutElement.closest('.modal-content');

    flatpickr(dateDebutElement, {
      dateFormat: "d/m/Y",
      locale: DateUtils.getFlatpickrLocale(),
      appendTo: modalContent
    });

    flatpickr(dateFinElement, {
      dateFormat: "d/m/Y",
      locale: DateUtils.getFlatpickrLocale(),
      appendTo: modalContent
    });
  }

  clePourSemaine(lundiStr) {
    return "evenements_" + lundiStr;
  }

  async sauvegarderEvenements() {
    if (!this.cleSemaineCourante) return;
    await window.dataManager.setEvenements(this.cleSemaineCourante, this.evenements);
  }

  normaliserHeure(h) {
    if (!h) return "";
    const parts = h.split(":");
    const hh = String(parseInt(parts[0], 10) || 0).padStart(2, "0");
    const mm = String(parseInt(parts[1], 10) || 0).padStart(2, "0");
    return hh + ":" + mm;
  }

  capitaliser(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  convertirDateHeureEnDate(dateStr, heureStr) {
    const [jour, mois, annee] = dateStr.split('/').map(x => parseInt(x, 10));
    const [hh, mm] = heureStr.split(':').map(x => parseInt(x, 10));
    return new Date(annee, mois - 1, jour, hh, mm, 0, 0);
  }

  creerObjetEvenement(dateDebut, titre, dureeHeures) {
    const jourSemaine = dateDebut.getDay();
    const jour = jourSemaine === 0 ? 6 : jourSemaine - 1;
    const heure = `${String(dateDebut.getHours()).padStart(2, '0')}:${String(dateDebut.getMinutes()).padStart(2, '0')}`;
    return { jour, heure, titre, duree: dureeHeures };
  }

  supprimerTousLesEvenements() {
    this.afficherConfirmation(
      "Confirmation de suppression",
      "Êtes-vous sûr de vouloir supprimer TOUS les événements de TOUTES les semaines ? Cette action est irréversible.",
      async () => {
        await window.dataManager.supprimerTout();
        this.evenements = [];
        this.afficherEvenements();
        this.afficherMessage("Tous les événements ont été supprimés.");
      }
    );
  }

  async ajouterEvenement(e) {
    e.preventDefault();
    
    const titre = this.inputTitre.value.trim();
    const dateDebutStr = this.inputDateDebut.value;
    const heureDebut = this.inputHeureDebut.value;
    const dateFinStr = this.inputDateFin.value;
    const heureFin = this.inputHeureFin.value;

    if (!titre || !dateDebutStr || !heureDebut || !dateFinStr || !heureFin) {
      this.afficherErreur("Veuillez remplir tous les champs.");
      return;
    }

    const dateDebut = this.convertirDateHeureEnDate(dateDebutStr, heureDebut);
    const dateFin = this.convertirDateHeureEnDate(dateFinStr, heureFin);

    if (dateFin <= dateDebut) {
      this.afficherErreur("La date de fin doit être après la date de début.");
      return;
    }
    const dureeHeures = (dateFin - dateDebut) / (1000 * 60 * 60);
    const lundi = DateUtils.obtenirLundi(dateDebut);
    const cleDebut = this.clePourSemaine(DateUtils.dateToKey(lundi));
    const nouvelEvenement = this.creerObjetEvenement(dateDebut, titre, dureeHeures);

    if (this.modeEdition && this.eventEnEdition) {
      const oldWeekKey = this.eventEnEdition.sourceWeekKey;
      const oldJour = this.eventEnEdition.originalJour;
      const oldTitre = this.eventEnEdition.titre;
      const oldHeure = this.eventEnEdition.heure;
      let oldWeekEvents = await window.dataManager.getEvenements(oldWeekKey);
      const oldIndex = oldWeekEvents.findIndex(e => 
        e.jour === parseInt(oldJour, 10) && 
        e.titre === oldTitre && 
        e.heure === oldHeure
      );
      
      if (oldIndex !== -1) {
        oldWeekEvents.splice(oldIndex, 1);
        await window.dataManager.setEvenements(oldWeekKey, oldWeekEvents);
      }
      let evenementsSemaine = await window.dataManager.getEvenements(cleDebut);
      evenementsSemaine.push(nouvelEvenement);
      await window.dataManager.setEvenements(cleDebut, evenementsSemaine);
      if (cleDebut === this.cleSemaineCourante) {
        this.evenements = evenementsSemaine;
      } else if (oldWeekKey === this.cleSemaineCourante) {
        this.evenements = oldWeekEvents;
      }
    } else {
      let evenementsSemaine = await window.dataManager.getEvenements(cleDebut);
      evenementsSemaine.push(nouvelEvenement);
      await window.dataManager.setEvenements(cleDebut, evenementsSemaine);
      if (cleDebut === this.cleSemaineCourante) {
        this.evenements = evenementsSemaine;
      }
    }

    await this.afficherEvenements();
    this.root.getElementById("formEvenement").reset();
    this.fermerModal();
  }

  async supprimerEvenement(e) {
    const bloc = e.target.closest(".event-block");
    if (!bloc) return;

    const cellule = bloc.parentElement;
    const ligne = cellule.parentElement;
    const colonne = cellule.cellIndex;

    const heure = ligne.firstElementChild.textContent.trim();
    const titre = bloc.dataset.titre || bloc.textContent;

    const idx = this.evenements.findIndex(ev =>
      ev.jour === colonne - 1 &&
      this.normaliserHeure(ev.heure) === heure &&
      ev.titre === titre
    );

    if (idx !== -1 && confirm(`Supprimer "${this.evenements[idx].titre}" ?`)) {
      this.evenements.splice(idx, 1);
      await this.sauvegarderEvenements();
      await this.afficherEvenements();
    }
  }

  async voirEvenements() {
    const toutesLesCles = await window.dataManager.getToutesCles();
    let tousEvenements = [];

    for (const cle of toutesLesCles) {
      const semaine = await window.dataManager.getEvenements(cle);
      const lundiStr = cle.replace("evenements_", "");
      const parts = lundiStr.split("-");
      const lundiDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));

      semaine.forEach(ev => {
        const dateDebut = new Date(lundiDate);
        dateDebut.setDate(lundiDate.getDate() + ev.jour);
        const [hh, mm] = (ev.heure || "00:00").split(":").map(x => parseInt(x, 10));
        dateDebut.setHours(hh, mm, 0, 0);
        const dateFin = new Date(dateDebut);
        const duree = Math.round((parseFloat(ev.duree || 1)) * 60); 
        dateFin.setMinutes(dateFin.getMinutes() + duree);
        const isMultiDay = dateDebut.toDateString() !== dateFin.toDateString();
        const optionsDate = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const dateDebutComplete = this.capitaliser(dateDebut.toLocaleDateString("fr-FR", optionsDate));
        const dateFinComplete = this.capitaliser(dateFin.toLocaleDateString("fr-FR", optionsDate));
        const heureDebut = `${dateDebut.getHours()}h${String(dateDebut.getMinutes()).padStart(2, '0')}`;
        const heureFin = `${dateFin.getHours()}h${String(dateFin.getMinutes()).padStart(2, '0')}`;

        tousEvenements.push({
          date: dateDebut,
          titre: ev.titre,
          isMultiDay,
          dateDebutComplete,
          dateFinComplete,
          heureDebut,
          heureFin
        });
      });
    }

    if (tousEvenements.length === 0) {
      this.afficherModalListeEvenements([]);
      return;
    }

    tousEvenements.sort((a, b) => a.date - b.date);
    this.afficherModalListeEvenements(tousEvenements);
  }

  afficherModalListeEvenements(evenements) {
    const contenu = evenements.length === 0 
      ? '<p style="text-align: center; color: #95a5a6;">Aucun événement enregistré</p>'
      : evenements.map(ev => this.genererHtmlEvenement(ev)).join('');
    
    this.root.getElementById("listeEvenementsContenu").innerHTML = contenu;
    this.root.getElementById("modalListeEvenements").style.display = "flex";
  }

  genererHtmlEvenement(ev) {
    const details = ev.isMultiDay
      ? `${ev.dateDebutComplete} à ${ev.heureDebut}<br>jusqu'à ${ev.dateFinComplete} à ${ev.heureFin}`
      : `${ev.dateDebutComplete}<br>de ${ev.heureDebut} à ${ev.heureFin}`;

    return `
      <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #c1ad88;">
        <div style="font-weight: bold; color: #2c3e50; margin-bottom: 5px;">${ev.titre}</div>
        <div style="color: #7f8c8d; font-size: 14px;">${details}</div>
      </div>
    `;
  }

  fermerModalListeEvenements() {
    this.root.getElementById("modalListeEvenements").style.display = "none";
  }

  ouvrirModal(eventData = null) {
    const modal = this.root.getElementById("modalEvenement");
    const formulaire = this.root.getElementById("formEvenement");
    const titreModal = modal.querySelector("h2");
    const btnSubmit = formulaire.querySelector(".btn-ajouter");
    
    if (eventData) {
      this.modeEdition = true;
      this.eventEnEdition = eventData;
      titreModal.textContent = "Modifier un évènement";
      btnSubmit.textContent = "Modifier";
      this.inputTitre.value = eventData.titre;
      this.inputDateDebut.value = eventData.dateDebutStr;
      this.inputHeureDebut.value = eventData.heureDebut;
      this.inputDateFin.value = eventData.dateFinStr;
      this.inputHeureFin.value = eventData.heureFin;
      if (this.inputDateDebut._flatpickr) {
        this.inputDateDebut._flatpickr.setDate(eventData.dateDebutStr, true);
      }
      if (this.inputDateFin._flatpickr) {
        this.inputDateFin._flatpickr.setDate(eventData.dateFinStr, true);
      }
    } else {
      this.modeEdition = false;
      this.eventEnEdition = null;
      titreModal.textContent = "Ajouter un évènement";
      btnSubmit.textContent = "Ajouter";
      formulaire.reset();
    }
    
    modal.style.display = "flex";
  }
  
  fermerModal() {
    this.root.getElementById("modalEvenement").style.display = "none";
    this.modeEdition = false;
    this.eventEnEdition = null;
  }

  ouvrirMenuAction(sourceWeekKey, originalJour, eventTitre, eventHeure) {
    this.root.getElementById("menuAction").style.display = "flex";
    const btnModifier = this.root.getElementById("btnModifier");
    const btnSupprimer = this.root.getElementById("btnSupprimer");
    const newBtnModifier = btnModifier.cloneNode(true);
    const newBtnSupprimer = btnSupprimer.cloneNode(true);
    btnModifier.parentNode.replaceChild(newBtnModifier, btnModifier);
    btnSupprimer.parentNode.replaceChild(newBtnSupprimer, btnSupprimer);
    newBtnModifier.addEventListener("click", async () => {
      this.fermerMenuAction();
      
      if (sourceWeekKey && originalJour !== undefined) {
        const sourceEvents = await window.dataManager.getEvenements(sourceWeekKey);
        const eventToEdit = sourceEvents.find(e => 
          e.jour === parseInt(originalJour, 10) && 
          e.titre === eventTitre && 
          e.heure === eventHeure
        );
        
        if (eventToEdit) {
          const parts = sourceWeekKey.replace('evenements_', '').split('-');
          const mondayDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
          
          const [hh, mm] = eventToEdit.heure.split(':').map(x => parseInt(x, 10));
          const dateDebut = new Date(mondayDate);
          dateDebut.setDate(mondayDate.getDate() + eventToEdit.jour);
          dateDebut.setHours(hh, mm, 0, 0);
          
          const dureeMinutes = Math.round((parseFloat(eventToEdit.duree)) * 60);
          const dateFin = new Date(dateDebut);
          dateFin.setMinutes(dateFin.getMinutes() + dureeMinutes);
          const dateDebutStr = `${dateDebut.getDate()}/${dateDebut.getMonth() + 1}/${dateDebut.getFullYear()}`;
          const dateFinStr = `${dateFin.getDate()}/${dateFin.getMonth() + 1}/${dateFin.getFullYear()}`;
          const heureDebut = `${String(dateDebut.getHours()).padStart(2, '0')}:${String(dateDebut.getMinutes()).padStart(2, '0')}`;
          const heureFin = `${String(dateFin.getHours()).padStart(2, '0')}:${String(dateFin.getMinutes()).padStart(2, '0')}`;
          this.ouvrirModal({
            titre: eventToEdit.titre,
            dateDebutStr,
            heureDebut,
            dateFinStr,
            heureFin,
            sourceWeekKey,
            originalJour,
            heure: eventHeure
          });
        }
      }
    });
    newBtnSupprimer.addEventListener("click", async () => {
      this.fermerMenuAction();
      
      if (sourceWeekKey && originalJour !== undefined) {
        this.afficherConfirmation(
          "Confirmation de suppression",
          `Êtes-vous sûr de vouloir supprimer l'événement "${eventTitre}" ?`,
          async () => {
            const sourceEvents = await window.dataManager.getEvenements(sourceWeekKey);
            
            const eventIndex = sourceEvents.findIndex(e => 
              e.jour === parseInt(originalJour, 10) && 
              e.titre === eventTitre && 
              e.heure === eventHeure
            );
            
            if (eventIndex !== -1) {
              sourceEvents.splice(eventIndex, 1);
              await window.dataManager.setEvenements(sourceWeekKey, sourceEvents);
              
              if (sourceWeekKey === this.cleSemaineCourante) {
                this.evenements = sourceEvents;
              }
              
              await this.afficherEvenements();
            }
          }
        );
      }
    });
  }

  fermerMenuAction() {
    this.root.getElementById("menuAction").style.display = "none";
  }

  afficherConfirmation(titre, message, callback) {
    this.root.getElementById("confirmationTitre").textContent = titre;
    this.root.getElementById("confirmationMessage").textContent = message;
    const modalConfirmation = this.root.getElementById("modalConfirmation");
    const btnOui = this.root.getElementById("btnConfirmerOui");
    const btnNon = this.root.getElementById("btnConfirmerNon");
    modalConfirmation.style.display = "flex";
    btnOui.style.display = "inline-block";
    btnNon.textContent = "Non";
    btnNon.style.background = "#c1ad88";
    const newBtnOui = btnOui.cloneNode(true);
    const newBtnNon = btnNon.cloneNode(true);
    btnOui.parentNode.replaceChild(newBtnOui, btnOui);
    btnNon.parentNode.replaceChild(newBtnNon, btnNon);
    newBtnOui.addEventListener("click", () => {
      this.fermerConfirmation();
      if (callback) callback();
    });
    newBtnNon.addEventListener("click", () => {
      this.fermerConfirmation();
    });
  }

  fermerConfirmation() {
    this.root.getElementById("modalConfirmation").style.display = "none";
  }

  afficherMessage(message) {
    this.afficherConfirmation("Information", message, null);
    this.root.getElementById("btnConfirmerOui").style.display = "none";
    const btnNon = this.root.getElementById("btnConfirmerNon");
    btnNon.textContent = "OK";
    btnNon.style.background = "#c1ad88";
  }

  afficherErreur(message) {
    this.root.getElementById("messageErreur").textContent = message;
    this.root.getElementById("modalErreur").style.display = "flex";
  }

  fermerModalErreur() {
    this.root.getElementById("modalErreur").style.display = "none";
  }
}
