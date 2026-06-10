class DateManager {
  constructor(root = document) {
    this.root = root;
    this.dateActuelle = new Date();

    this.initListeners();
    this.initCalendrier();
    this.afficherSemaine();

    window.dateActuelle = this.dateActuelle;
    window.afficherSemaine = this.afficherSemaine.bind(this);
  }

  initListeners() {
    this.root.getElementById("SemainePrece").addEventListener("click", () => this.changerSemaine(-7));
    this.root.getElementById("SemaineProch").addEventListener("click", () => this.changerSemaine(7));
  }

  initCalendrier() {
    const boutonCalendrier = this.root.getElementById("OuvrirCalendrier");

    flatpickr(boutonCalendrier, {
      allowInput: true,        
      clickOpens: true,        
      dateFormat: "Y-m-d",     
      defaultDate: this.dateActuelle,
      appendTo: this.root.querySelector('.planning-wrapper'),
      locale: DateUtils.getFlatpickrLocale(),
      onChange: (selectedDates) => {
        if (selectedDates.length > 0) {
          this.dateActuelle = selectedDates[0];
          window.dateActuelle = this.dateActuelle;
          this.afficherSemaine();
        }
      }
    });
  }

  changerSemaine(deltaJours) {
    this.dateActuelle.setDate(this.dateActuelle.getDate() + deltaJours);
    window.dateActuelle = this.dateActuelle;
    this.afficherSemaine();
  }

  formaterDate(date) {
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  capitaliser(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  obtenirEnteteJour(lundi, decalageJour) {
    const date = new Date(lundi);
    date.setDate(lundi.getDate() + decalageJour);
    const jourStr = date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric" });
    return this.capitaliser(jourStr);
  }

  afficherSemaine() {
    const lundi = DateUtils.obtenirLundi(this.dateActuelle);
    const dimanche = new Date(lundi);
    dimanche.setDate(lundi.getDate() + 6);

    this.root.querySelector(".SemaineTexte").textContent = `Semaine du ${this.formaterDate(lundi)} au ${this.formaterDate(dimanche)}`;

    const entetes = this.root.querySelectorAll(".Planning thead th");
    for (let i = 1; i <= 7; i++) {
      entetes[i].textContent = this.obtenirEnteteJour(lundi, i - 1);
    }

    document.dispatchEvent(new CustomEvent("semaineChange", {
      detail: DateUtils.dateToKey(lundi),
    }));
  }
}



