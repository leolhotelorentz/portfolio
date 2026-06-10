class PlanningComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.init();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
      <style>
        ${this.getStyles()}
      </style>
      <div class="planning-wrapper">
        <h1 class="titre">Planning</h1>

        <div class="BarreSemaine">
          <div class="PremierEtage">
            <button id="SemainePrece">←</button>
            <span class="SemaineTexte">Semaine du 1 au 7</span>
            <button id="SemaineProch">→</button>
          </div>

          <div class="EvenementsBoutons">
            <button id="AjoutEvenement">Ajouter un évènement</button>
            <button id="VoirEvenement">Voir les évènements</button>
            <button id="ToggleVue">Vue ouvrée</button>
            <button id="OuvrirCalendrier">Ouvrir le calendrier</button>
          </div>
        </div>

        <div class="table-container">
          <table class="Planning">
            <thead>
              <tr>
                <th>Heure</th>
                <th>Lundi</th>
                <th>Mardi</th>
                <th>Mercredi</th>
                <th>Jeudi</th>
                <th>Vendredi</th>
                <th>Samedi</th>
                <th>Dimanche</th>
              </tr>
            </thead>
            <tbody id="table-body"></tbody>
          </table>
          <div id="eventsOverlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: auto; z-index: 1;"></div>
        </div>

        <div style="text-align: center; margin-top: 20px; margin-bottom: 10px;">
          <button id="SupprimerTout" class="btn-supprimer-tout">Supprimer tous les événements</button>
        </div>

        <div id="menuAction" class="modal">
          <div class="modal-content" style="max-width: 300px; padding: 20px;">
            <span class="close-menu">&times;</span>
            <h3 style="margin-top: 0; margin-bottom: 20px; text-align: center;">Action</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <button id="btnModifier" class="btn-action" style="padding: 12px; cursor: pointer; background: #c1ad88; color: white; border: none; border-radius: 4px; font-size: 14px;">Modifier</button>
              <button id="btnSupprimer" class="btn-action" style="padding: 12px; cursor: pointer; background: #e74c3c; color: white; border: none; border-radius: 4px; font-size: 14px;">Supprimer</button>
            </div>
          </div>
        </div>

        <div id="modalConfirmation" class="modal">
          <div class="modal-content" style="max-width: 400px; padding: 25px;">
            <h3 id="confirmationTitre" style="margin-top: 0; margin-bottom: 15px; text-align: center;">Confirmation</h3>
            <p id="confirmationMessage" style="text-align: center; margin-bottom: 20px; line-height: 1.5;"></p>
            <div style="display: flex; gap: 10px; justify-content: center;">
              <button id="btnConfirmerOui" style="padding: 10px 20px; cursor: pointer; background: #e74c3c; color: white; border: none; border-radius: 4px; font-size: 14px; min-width: 80px;">Oui</button>
              <button id="btnConfirmerNon" style="padding: 10px 20px; cursor: pointer; background: #95a5a6; color: white; border: none; border-radius: 4px; font-size: 14px; min-width: 80px;">Non</button>
            </div>
          </div>
        </div>

        <div id="modalListeEvenements" class="modal">
          <div class="modal-content" style="max-width: 600px; max-height: 80vh; overflow-y: auto; padding: 25px;">
            <span class="close-liste">&times;</span>
            <h2 style="margin-top: 0; margin-bottom: 20px; text-align: center;">Événements à venir</h2>
            <div id="listeEvenementsContenu" style="text-align: left;"></div>
          </div>
        </div>

        <div id="modalEvenement" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Ajouter un évènement</h2>
            <form id="formEvenement">
              <label for="titre">Libellé :</label>
              <input type="text" id="titre" placeholder="Ex : Réunion, Rendez-vous, etc." required>

              <label for="dateDebut">Début :</label>
              <div style="display: flex; gap: 10px; align-items: center;">
                <input type="text" id="dateDebut" placeholder="Sélectionner une date" required readonly style="flex: 1; cursor: pointer;">
                <input type="time" id="heureDebut" required style="flex: 1;">
              </div>

              <label for="dateFin">Fin :</label>
              <div style="display: flex; gap: 10px; align-items: center;">
                <input type="text" id="dateFin" placeholder="Sélectionner une date" required readonly style="flex: 1; cursor: pointer;">
                <input type="time" id="heureFin" required style="flex: 1;">
              </div>

              <button type="submit" class="btn-ajouter">Ajouter</button>
            </form>
          </div>
        </div>

        <div id="modalErreur" class="modal">
          <div class="modal-content" style="max-width: 400px; padding: 25px;">
            <span class="close-erreur">&times;</span>
            <h2 style="margin-top: 0; margin-bottom: 20px; text-align: center; color: #e74c3c;">Erreur</h2>
            <p id="messageErreur" style="text-align: center; margin-bottom: 20px; line-height: 1.5; color: #2c3e50;"></p>
            <div style="display: flex; justify-content: center;">
              <button id="btnFermerErreur" style="padding: 10px 20px; cursor: pointer; background: #c1ad88; color: white; border: none; border-radius: 6px; font-size: 14px; min-width: 80px;">OK</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getStyles() {
    return `
      :host {
        display: block;
        width: 100%;
        font-family: Arial, sans-serif;
      }
      
      .planning-wrapper {
        margin: 60px 40px;
        padding-top: 1px;
        padding-bottom: 1px;
        background-color: rgba(128, 128, 128, 0.062);
        color: #2c3e50;
      }
      
      * {
        font-family: Arial, sans-serif;
      }

      .titre {
        font-weight: bold;
        text-align: center;
        color: #2c3e50;
        margin-top: 10px;
        margin-bottom: 0px;
      }

      .BarreSemaine {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        background: #c1ad88;
        border-radius: 6px;
        width: 100%;
        box-sizing: border-box;
      }

      .PremierEtage {
        width: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
      }

      .SemaineTexte {
        font-weight: 700;
        color: #fff;
        text-align: center;
        font-size: 16px;
        margin: 0 24px;
      }

      .EvenementsBoutons {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin: 0;
      }

      .BarreSemaine button {
        border: none;
        padding: 6px 10px;
        border-radius: 5px;
        cursor: pointer;
        background: white;
      }

      .btn-supprimer-tout {
        background: #e74c3c;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: background 0.3s;
      }

      .btn-supprimer-tout:hover {
        background: #c0392b;
      }

      .table-container {
        max-height: 500px;
        overflow: auto;
        border: 1px solid #ccc;
        border-radius: 5px;
        position: relative;
        margin-top: 0;
      }

      .Planning {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
      }

      .Planning th,
      .Planning td {
        border: 1px solid #ccc;
        padding: 16px 8px;
        text-align: center;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-height: 48px;
        background: white;
      }

      .Planning thead th {
        background: #c1ad88;
        color: #fff;
        font-weight: 600;
        position: sticky;
        top: 0;
        z-index: 3;
      }

      .Planning thead th:first-child {
        width: 60px;
        height: 36px;
        padding: 6px;
        background: #c1ad88;
        color: #fff;
      }

      .Planning td:first-child {
        width: 60px;
        height: 36px;
        padding: 6px;
        background: #f4f6f7;
        font-weight: bold;
        position: sticky;
        left: 0;
        z-index: 2;
      }

      .Planning tbody tr:nth-child(even) {
        background-color: #fafafa;
      }

      .Planning tbody tr:hover {
        background-color: #f4efe0;
      }

      .modal {
        display: none;
        position: fixed;
        z-index: 10;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.4);
        justify-content: center;
        align-items: center;
      }

      .modal-content {
        background-color: #fff;
        padding: 24px;
        border-radius: 10px;
        width: 320px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        animation: apparition 0.3s ease;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      @keyframes apparition {
        from {opacity: 0; transform: scale(0.95);}
        to {opacity: 1; transform: scale(1);}
      }

      .modal-content h2, .modal-content h3 {
        margin: 0 0 8px 0;
        color: #2c3e50;
        text-align: center;
      }

      .modal-content label {
        font-weight: bold;
        font-size: 14px;
      }

      .modal-content input, 
      .modal-content select {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 6px;
        width: 100%;
        box-sizing: border-box;
      }

      .btn-ajouter, .btn-action {
        background-color: #c1ad88;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 6px;
        cursor: pointer;
      }

      .btn-ajouter:hover, .btn-action:hover {
        background-color: #a79367;
      }

      .close, .close-menu, .close-liste, .close-erreur {
        color: #aaa;
        font-size: 24px;
        cursor: pointer;
        align-self: flex-end;
        user-select: none;
      }

      .close:hover, .close-menu:hover, .close-liste:hover, .close-erreur:hover {
        color: #333;
      }

      .event-block {
        position: absolute;
        border-radius: 6px;
        padding: 4px;
        font-size: 12px;
        pointer-events: auto;
        cursor: pointer;
        overflow: hidden;
        box-sizing: border-box;
      }

      .event-resize-handle-top,
      .event-resize-handle-bottom {
        position: absolute;
        left: 0;
        right: 0;
        height: 10px;
        cursor: ns-resize;
        z-index: 10;
      }

      .event-resize-handle-top {
        top: 0;
      }

      .event-resize-handle-bottom {
        bottom: 0;
      }
    `;
  }

  async init() {
    this.createTableRows();
    this.initManagers();
  }

  createTableRows() {
    const tbody = this.shadowRoot.getElementById("table-body");
    for (let h = 0; h < 24; h++) {
      const tr = document.createElement("tr");
      const heure = String(h).padStart(2, "0") + ":00";
      tr.innerHTML = `<td>${heure}</td>` + "<td></td>".repeat(7);
      tbody.appendChild(tr);
    }
  }

  initManagers() {
    if (!window.dataManager) {
      window.dataManager = new DataManager();
    }
    
    const dateManager = new DateManager(this.shadowRoot);
    const eventManager = new EventMouseManager(this.shadowRoot);
    const viewManager = new ViewManager(this.shadowRoot);

    eventManager.initListeners();
    eventManager.initFormCalendars();

    const btnSupprimer = this.shadowRoot.getElementById('SupprimerTout');
    btnSupprimer.addEventListener('click', () => {
      eventManager.supprimerTousLesEvenements();
    });
  }
}

customElements.define('planning-component', PlanningComponent);
