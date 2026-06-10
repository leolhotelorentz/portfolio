class DateUtils {
  static obtenirLundi(date) {
    const d = new Date(date);
    const jour = d.getDay();
    const decalage = (jour === 0 ? -6 : 1 - jour);
    d.setDate(d.getDate() + decalage);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  static dateToKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  static getFlatpickrLocale() {
    return {
      firstDayOfWeek: 1,
      weekdays: {
        shorthand: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
        longhand: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
      },
      months: {
        shorthand: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
        longhand: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
      }
    };
  }
}
