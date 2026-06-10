class EventDisplayManager extends EventManager {

  static PALETTE = [
    '#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9',
    '#BBDEFB', '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9'
  ];


  genererHashCouleur(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = ((h << 5) - h) + s.charCodeAt(i);
      h |= 0;
    }
    return h;
  }

  assombrirCouleur(hex, percent) {
    const num = parseInt(hex.slice(1), 16);
    let r = (num >> 16) & 0xFF;
    let g = (num >> 8) & 0xFF;
    let b = num & 0xFF;
    const factor = 1 - percent / 100;
    r = Math.max(0, Math.min(255, Math.round(r * factor)));
    g = Math.max(0, Math.min(255, Math.round(g * factor)));
    b = Math.max(0, Math.min(255, Math.round(b * factor)));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  creerSegmentsEvenement(evenementsToDisplay, ths, lignes) {
    const allSegments = [];
    const minutesParJour = 24 * 60;

    evenementsToDisplay.forEach((ev, idx) => {
      const [hh, mm] = (ev.heure || "00:00").split(":").map(x => parseInt(x, 10));
      const minutesDebut = hh * 60 + mm;
      const duree = Math.round((parseFloat(ev.duree || 1)) * 60); 
      let mondayDate = null;
      if (this.cleSemaineCourante) {
        const parts = this.cleSemaineCourante.replace('evenements_', '').split('-');
        mondayDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      } else if (window.dateActuelle) {
        mondayDate = DateUtils.obtenirLundi(window.dateActuelle);
       } else {
        mondayDate = DateUtils.obtenirLundi(new Date());
      }

      const overallStart = new Date(mondayDate);
      overallStart.setDate(mondayDate.getDate() + ev.jour);
      overallStart.setHours(hh, mm, 0, 0);

      const overallEnd = new Date(overallStart);
      overallEnd.setMinutes(overallEnd.getMinutes() + duree);

      const spansMultipleDays = overallStart.toDateString() !== overallEnd.toDateString();

      const formatDate = (d) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
      const formatTime = (d) => `${d.getHours()}h ${String(d.getMinutes()).padStart(2, '0')}`;
      const formatDateTime = (d) => `${formatDate(d)} à ${formatTime(d)}`;
      let minutesRestantes = duree;
      let jourActuel = ev.jour;
      let minutesDebutSegment = minutesDebut;
      while (minutesRestantes > 0) {
        if (jourActuel > 6) break;
        if (jourActuel < 0) {
          const minutesJusquaMinuit = minutesParJour - minutesDebutSegment;
          const minutesSegment = Math.min(minutesRestantes, minutesJusquaMinuit);
          minutesRestantes -= minutesSegment;
          jourActuel++;
          minutesDebutSegment = 0;
          continue;
        }
        const minutesJusquaMinuit = minutesParJour - minutesDebutSegment;
        const minutesSegment = Math.min(minutesRestantes, minutesJusquaMinuit);

        const colIndex = jourActuel + 1;
        const th = ths[colIndex];
        if (!th) {
          minutesRestantes -= minutesSegment;
          jourActuel++;
          minutesDebutSegment = 0;
          continue;
        }
        if (th.offsetWidth === 0 || th.style.display === 'none') {
          minutesRestantes -= minutesSegment;
          jourActuel++;
          minutesDebutSegment = 0;
          continue;
        }
        const segStartHour = Math.floor(minutesDebutSegment / 60);
        const segEndMinutes = minutesDebutSegment + minutesSegment;
        const segEndHour = Math.floor(segEndMinutes / 60);
        let adjustedMinutesDebut = minutesDebutSegment;
        let adjustedMinutesSegment = minutesSegment;
        if (segStartHour < 8 && lignes[segStartHour] && lignes[segStartHour].style.display === 'none') {
          const minutesTo8h = 8 * 60 - minutesDebutSegment;
          if (minutesTo8h >= minutesSegment) {
            minutesRestantes -= minutesSegment;
            jourActuel++;
            minutesDebutSegment = 0;
            continue;
          }
          adjustedMinutesDebut = 8 * 60;
          adjustedMinutesSegment = minutesSegment - minutesTo8h;
        }
        const ligne18Plus = lignes[Math.min(18, lignes.length - 1)];
        if ((segEndHour >= 19 || (segEndHour === 18 && segEndMinutes > 18 * 60)) && ligne18Plus && ligne18Plus.style.display === 'none') {
          const minutesAfter18h = segEndMinutes - (18 * 60);
          if (minutesAfter18h >= adjustedMinutesSegment) {
            minutesRestantes -= minutesSegment;
            jourActuel++;
            minutesDebutSegment = 0;
            continue;
          }
          adjustedMinutesSegment -= minutesAfter18h;
        }
        allSegments.push({
          eventIndex: idx,
          jour: jourActuel,
          adjustedMinutesDebut,
          adjustedMinutesSegment,
          th,
          ev,
          isFirstSegment: jourActuel === ev.jour,
          spansMultipleDays,
          overallStart,
          overallEnd,
          formatDate,
          formatTime,
          formatDateTime,
          mondayDate,
          minutesDebutSegment,
          minutesSegment
        });
        minutesRestantes -= minutesSegment;
        jourActuel++;
        minutesDebutSegment = 0;
      }
    });

    return allSegments;
  }

  calculerPositionsSegments(allSegments) {
    const segmentsByDay = {};
    allSegments.forEach(seg => {
      const key = seg.jour;
      if (!segmentsByDay[key]) segmentsByDay[key] = [];
      segmentsByDay[key].push(seg);
    });
    Object.keys(segmentsByDay).forEach(jour => {
      const segs = segmentsByDay[jour];
      segs.sort((a, b) => {
        if (a.adjustedMinutesDebut !== b.adjustedMinutesDebut) {
          return a.adjustedMinutesDebut - b.adjustedMinutesDebut;
        }
        return b.adjustedMinutesSegment - a.adjustedMinutesSegment;
      });
      segs.forEach(seg => {
        seg.column = -1;
        seg.maxOverlapping = 1;
      });
      segs.forEach((seg, i) => {
        const endSeg = seg.adjustedMinutesDebut + seg.adjustedMinutesSegment;
        const overlaps = [];
        for (let j = 0; j < segs.length; j++) {
          if (i === j) continue;
          const other = segs[j];
          const endOther = other.adjustedMinutesDebut + other.adjustedMinutesSegment;
          if (!(endSeg <= other.adjustedMinutesDebut || endOther <= seg.adjustedMinutesDebut)) {
            overlaps.push(other);
          }
        }
        const usedColumns = new Set(overlaps.map(o => o.column).filter(c => c >= 0));
        let col = 0;
        while (usedColumns.has(col)) {
          col++;
        }
        seg.column = col;
        const allOverlapping = [seg, ...overlaps];
        const maxCol = Math.max(...allOverlapping.map(s => s.column >= 0 ? s.column : 0)) + 1;
        allOverlapping.forEach(s => {
          s.maxOverlapping = Math.max(s.maxOverlapping || 1, maxCol);
        });
      });
    });
  }

  creerBlocEvenement(seg, container, lignes, rowHeight, tbodyTop, overlay) {
    const { th, ev, adjustedMinutesDebut, adjustedMinutesSegment, eventIndex, isFirstSegment, 
            spansMultipleDays, overallStart, overallEnd, formatDate, formatTime, formatDateTime,
            mondayDate, minutesDebutSegment, minutesSegment, column, maxOverlapping } = seg;

    const thRect = th.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const colWidth = (thRect.width - 6) / (maxOverlapping || 1);
    const left = thRect.left - containerRect.left + 2 + (column || 0) * colWidth;
    const width = Math.max(20, colWidth - 2);
    let topOffset = adjustedMinutesDebut;
    const adjustedStartHour = Math.floor(adjustedMinutesDebut / 60);
    let hiddenHoursBefore = 0;
    for (let h = 0; h < adjustedStartHour; h++) {
      if (lignes[h] && lignes[h].style.display === 'none') {
        hiddenHoursBefore++;
      }
    }
    topOffset = (adjustedMinutesDebut / 60 - hiddenHoursBefore) * rowHeight;
    
    const top = tbodyTop + topOffset;
    const height = Math.max(10, (adjustedMinutesSegment / 60) * rowHeight);

    const bloc = document.createElement("div");
    bloc.className = "event-block";
    bloc.style.cssText = `
      position: absolute;
      top: ${top}px;
      left: ${left}px;
      width: ${width}px;
      height: ${height}px;
      box-sizing: border-box;
      padding: 4px;
      overflow: hidden;
      cursor: pointer;
      font-size: 12px;
      font-weight: bold;
      color: #222;
    `;
    
    const colorKey = (ev.titre || '') + '|' + (ev.heure || '');
    const colorIndex = Math.abs(this.genererHashCouleur(colorKey)) % EventDisplayManager.PALETTE.length;
    const bg = EventDisplayManager.PALETTE[colorIndex];
    const borderColor = this.assombrirCouleur(bg, 18);

    bloc.style.background = bg;
    bloc.style.border = `1px solid ${borderColor}`;
    
    bloc.dataset.eventIndex = eventIndex;
    if (ev._sourceWeekKey) {
      bloc.dataset.sourceWeekKey = ev._sourceWeekKey;
      bloc.dataset.originalJour = ev._originalJour;
      bloc.dataset.eventTitre = ev.titre;
      bloc.dataset.eventHeure = ev.heure;
    }
    
    const segmentDate = new Date(mondayDate);
    segmentDate.setDate(mondayDate.getDate() + seg.jour);
    const segStartHH = Math.floor(minutesDebutSegment / 60);
    const segStartMM = minutesDebutSegment % 60;
    segmentDate.setHours(segStartHH, segStartMM, 0, 0);

    const segmentEnd = new Date(segmentDate);
    segmentEnd.setMinutes(segmentEnd.getMinutes() + minutesSegment);

    if (spansMultipleDays) {
      bloc.innerHTML = `<div style="font-weight: bold; font-size: 14px; margin-bottom: 2px;">${ev.titre}</div><div style="font-size: 11px; color: #555;">${formatDateTime(overallStart)} - ${formatDateTime(overallEnd)}</div>`;
    } else {
      bloc.innerHTML = `<div style="font-weight: bold; font-size: 14px; margin-bottom: 2px;">${ev.titre}</div><div style="font-size: 11px; color: #555;">${formatTime(segmentDate)} - ${formatTime(segmentEnd)}</div>`;
    }
    
    const resizeHandleBottom = this.creerResizeHandle("bottom", bloc, ev, seg, spansMultipleDays, overallStart);
    bloc.appendChild(resizeHandleBottom);
    
    const resizeHandleTop = this.creerResizeHandle("top", bloc, ev, seg, spansMultipleDays, overallStart);
    bloc.appendChild(resizeHandleTop);

    bloc.addEventListener("click", (e) => {
      e.stopPropagation();
      if (this.vientDeRedimensionner) {
        return;
      }
      
      const sourceWeekKey = bloc.dataset.sourceWeekKey;
      const originalJour = bloc.dataset.originalJour;
      const eventTitre = bloc.dataset.eventTitre;
      const eventHeure = bloc.dataset.eventHeure;
      this.ouvrirMenuAction(sourceWeekKey, originalJour, eventTitre, eventHeure);
    });

    overlay.appendChild(bloc);
  }

  creerResizeHandle(position, bloc, ev, seg, spansMultipleDays, overallStart) {
    const handle = document.createElement("div");
    handle.className = `event-resize-handle-${position}`;
    handle.style.cssText = `
      position: absolute;
      ${position}: 0;
      left: 0;
      right: 0;
      height: 10px;
      cursor: ns-resize;
      z-index: 10;
    `;
    
    handle.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      this.redimensionnementEnCours = position;
      this.eventBlockEnRedimensionnement = bloc;
      this.eventEnRedimensionnement = {
        sourceWeekKey: bloc.dataset.sourceWeekKey,
        originalJour: parseInt(bloc.dataset.originalJour, 10),
        titre: bloc.dataset.eventTitre,
        heure: bloc.dataset.eventHeure,
        dureeInitiale: ev.duree,
        hauteurInitiale: parseFloat(bloc.style.height),
        topInitial: parseFloat(bloc.style.top),
        jourSegment: seg.jour,
        spansMultipleDays: spansMultipleDays,
        overallStart: overallStart
      };
      this.mouseYInitial = e.clientY;
      this.hauteurInitiale = parseFloat(bloc.style.height);
      if (position === "top") {
        this.topInitial = parseFloat(bloc.style.top);
      }
    });
    
    return handle;
  }

  obtenirOverlay() {
    let overlay = this.root.getElementById("eventsOverlay");
    if (!overlay) {
      const container = this.root.querySelector(".table-container");
      if (container) {
        if (getComputedStyle(container).position === 'static') {
          container.style.position = 'relative';
        }
        overlay = document.createElement("div");
        overlay.id = "eventsOverlay";
        overlay.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:auto;z-index:1";
        container.appendChild(overlay);
      }
    }
    return overlay;
  }

  async afficherEvenements() {
    const overlay = this.obtenirOverlay();
    if (!overlay) return;

    overlay.innerHTML = "";

    const lignes = this.corpsPlanning.querySelectorAll("tr");
    if (lignes.length < 2) return;

    const container = this.root.querySelector(".table-container");
    const table = this.root.querySelector(".Planning");
    const thead = table.querySelector("thead");
    
    let firstVisibleRow = null;
    for (let i = 0; i < lignes.length; i++) {
      if (lignes[i].style.display !== 'none' && lignes[i].offsetHeight > 0) {
        firstVisibleRow = lignes[i];
        break;
      }
    }
    
    if (!firstVisibleRow) {
      return;
    }
    
    const rowHeight = firstVisibleRow.offsetHeight;
    const ths = this.root.querySelectorAll(".Planning thead th");
    const minutesParJour = 24 * 60;

    const theadHeight = thead ? thead.offsetHeight : 0;
    const tbodyTop = theadHeight;

    const evenementsToDisplay = await this.getEvenementsForWeek();
    const allSegments = this.creerSegmentsEvenement(evenementsToDisplay, ths, lignes);
    
    this.calculerPositionsSegments(allSegments);
    
    allSegments.forEach(seg => {
      this.creerBlocEvenement(seg, container, lignes, rowHeight, tbodyTop, overlay);
    });
  }

  async getEvenementsForWeek() {
    if (!this.cleSemaineCourante) return [];
    
    const parts = this.cleSemaineCourante.replace('evenements_', '').split('-');
    const mondayDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    const sundayDate = new Date(mondayDate);
    sundayDate.setDate(mondayDate.getDate() + 6);
    sundayDate.setHours(23, 59, 59, 999);
    
    const allEvents = [];
    
    const currentWeekEvents = await window.dataManager.getEvenements(this.cleSemaineCourante);
    currentWeekEvents.forEach(ev => {
      allEvents.push({
        ...ev,
        _sourceWeekKey: this.cleSemaineCourante,
        _originalJour: ev.jour
      });
    });
    
    for (let offset = -4; offset <= 4; offset++) {
      if (offset === 0) continue;
      
      const testDate = new Date(mondayDate);
      testDate.setDate(testDate.getDate() + offset * 7);
      const testKey = this.clePourSemaine(DateUtils.dateToKey(testDate));
      const weekEvents = await window.dataManager.getEvenements(testKey);
      
      weekEvents.forEach(ev => {
        const evStartDate = new Date(testDate);
        evStartDate.setDate(testDate.getDate() + ev.jour);
        const [hh, mm] = (ev.heure || "00:00").split(":").map(x => parseInt(x, 10));
        evStartDate.setHours(hh, mm, 0, 0);
        
        const dureeMinutes = Math.round((parseFloat(ev.duree || 1)) * 60);
        const evEndDate = new Date(evStartDate);
        evEndDate.setMinutes(evEndDate.getMinutes() + dureeMinutes);
        
        if (!(evEndDate < mondayDate || evStartDate > sundayDate)) {
          const daysDiff = Math.floor((evStartDate - mondayDate) / (1000 * 60 * 60 * 24));
          allEvents.push({
            ...ev,
            jour: daysDiff, 
            _originalStart: evStartDate,
            _originalEnd: evEndDate,
            _sourceWeekKey: testKey,
            _originalJour: ev.jour
          });
        }
      });
    }
    
    return allEvents;
  }
}
