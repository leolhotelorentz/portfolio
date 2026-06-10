class ViewManager {
  constructor(root = document) {
    this.root = root;
    this.planning = this.root.querySelector(".Planning");
    this.vueOuvree = false;

    this.initListeners();
    this.mettreAJourVue();
  }

  initListeners() {
    this.root.getElementById("ToggleVue").addEventListener("click", () => this.toggleVue());
  }

  toggleVue() {
    this.vueOuvree = !this.vueOuvree;
    this.root.getElementById("ToggleVue").textContent = this.vueOuvree ? "Vue complète" : "Vue ouvrée";
    this.mettreAJourVue();
    setTimeout(() => {
      document.dispatchEvent(new CustomEvent("vueChange", { detail: { vueOuvree: this.vueOuvree } }));
    }, 10);
  }

  mettreAJourVue() {
    const lignes = this.planning.querySelectorAll("tbody tr");
    const entetes = this.planning.querySelectorAll("thead th");

    entetes.forEach((th, index) => {
      th.style.display = (this.vueOuvree && index > 5) ? "none" : "";
    });

    lignes.forEach(ligne => {
      ligne.querySelectorAll("td").forEach((td, index) => {
        td.style.display = (this.vueOuvree && index > 5) ? "none" : "";
      });

      const heure = parseInt(ligne.firstElementChild.textContent.split(":")[0]);
      ligne.style.display = (this.vueOuvree && (heure < 8 || heure > 17)) ? "none" : "";
    });
  }
}
