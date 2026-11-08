/* Tutti Tool 0.3.0, il pannello di accessibilità di Tutti prompti (30 settembre 2026).
   https://github.com/IsabellaDuc/Tutti-Tool · licenza MIT.
   Un bottone fisso in un angolo apre un pannello laterale con cui chi visita
   adatta il sito a come legge e naviga: sei profili pronti, testo, colori,
   strumenti per orientarsi. Le scelte restano in questo browser (localStorage).
   Funziona su qualunque sito con una riga, meglio in testa alla pagina, prima
   degli altri script:
     <script src="tutti-tool.js" data-posizione="sinistra"
             data-contatto="info@esempio.it" data-dichiarazione="/accessibilita.html"></script>
   Attributi facoltativi: data-lingua (it | en; se manca segue <html lang>),
   data-posizione (destra | sinistra), data-dichiarazione (indirizzo della
   dichiarazione di accessibilità; se manca il bottone non c'è), data-contatto
   (email per le segnalazioni), data-chiave (nome del salvataggio, predefinito
   «tutti-tool»), data-movimento="no" (non tocca matchMedia, vedi sotto).
   Per adattare il pannello al sito che lo ospita: data-accento (il colore di
   bottone e scelte accese, predefinito la vaniglia #F4EEA9), data-inchiostro
   (il colore scuro di testo, contorni e testata, predefinito il carbone
   #1C1D21), data-carattere (la famiglia del testo del pannello, predefinita
   "Source Sans 3" con i caratteri di sistema come riserva). L'accento deve
   restare chiaro e l'inchiostro scuro: sopra l'accento si scrive in inchiostro.
   Com'è fatto:
   - il pannello sta in uno Shadow DOM attaccato a <html>, fuori da <body>: i
     fogli del sito non lo toccano e le regolazioni della pagina non toccano lui;
   - le regolazioni della pagina sono un solo foglio di stile, riscritto a ogni
     cambio (<style id="tp-accessibilita-stili">), più tre cose che il CSS da solo
     non sa fare: la dimensione del testo (misurata elemento per elemento, così
     vale anche sui siti in px), l'audio muto, le animazioni fatte in JavaScript;
   - «Ferma le animazioni» fa rispondere «sì» a chi chiede al browser
     prefers-reduced-motion da JavaScript (matchMedia): gli script del sito che
     già rispettano quella preferenza (il cielo e il sole di Tutti prompti) si
     fermano da soli, del tutto dal caricamento successivo;
   - niente dati mandati altrove. Se sul sito c'è Umami, conta quali funzioni
     si usano (evento «accessibilita»), senza cookie come il resto.
   Cosa NON fa, di proposito: non riscrive il codice della pagina per i lettori
   di schermo e non promette la conformità alle norme. Quella si ottiene
   sistemando il sito; questo pannello è un aiuto in più per chi legge. */
(function () {
  'use strict';
  if (window.__tpAccessibilita) return;
  window.__tpAccessibilita = true;

  var html = document.documentElement;
  var script = document.currentScript;
  function attr(n, d) { var v = script && script.getAttribute('data-' + n); return v == null || v === '' ? d : v; }
  var CONF = {
    lingua: attr('lingua', /^en/i.test(html.lang || '') ? 'en' : 'it'),
    posizione: attr('posizione', 'destra') === 'sinistra' ? 'sinistra' : 'destra',
    dichiarazione: attr('dichiarazione', ''),
    contatto: attr('contatto', ''),
    chiave: attr('chiave', 'tutti-tool'),
    movimento: attr('movimento', 'si') !== 'no',
    accento: attr('accento', ''),
    inchiostro: attr('inchiostro', ''),
    carattere: attr('carattere', '')
  };

  /* ---------- 1. Le parole, in italiano e in inglese ----------------------- */
  var TESTI = {
    it: {
      apri: 'Apri le regolazioni di accessibilità', chiudi: 'Chiudi il pannello', titolo: 'Accessibilità',
      sotto: 'Adatta questo sito a come leggi e navighi. Le scelte restano in questo browser.',
      ripristina: 'Ripristina tutto', dichiarazione: 'Dichiarazione', nascondi: 'Nascondi il bottone', altraLingua: 'English',
      sezProfili: 'Profili', sezTesto: 'Testo', sezColori: 'Colori', sezOrientarsi: 'Orientarsi', sezVai: 'Vai a…',
      profili: {
        epilessia: ['Movimento ridotto', 'Ferma animazioni e suoni, attenua i colori. Per chi soffre lampi e movimento, anche con l\'epilessia fotosensibile.'],
        ipovisione: ['Vista debole', 'Testo più grande, contrasto più alto, carattere leggibile, link e focus ben visibili.'],
        concentrazione: ['Concentrazione', 'Una fascia di lettura che scurisce il resto della pagina, senza animazioni né suoni. Utile con l\'ADHD.'],
        lettura: ['Lettura facile', 'Carattere leggibile, più spazio, testo allineato a sinistra, titoli e link in evidenza. Utile con la dislessia.'],
        comoda: ['Lettura comoda', 'Testo grande, contrasto più alto, guida di lettura, cursore grande e niente animazioni.'],
        tastiera: ['Tastiera', 'Focus sempre visibile e tasti rapidi: H i titoli, Z le zone della pagina, F i moduli, G le immagini. Con Maiusc si torna indietro.']
      },
      no: 'No', si: 'Sì',
      passi: { testo: 'Dimensione del testo', scala: 'Grandezza della pagina', interlinea: 'Spazio tra le righe', lettere: 'Spazio tra le lettere', parole: 'Spazio tra le parole' },
      comeIlSito: 'Come il sito', meno: 'Diminuisci', piu: 'Aumenta', livelli: ['Come il sito', 'Un po\'', 'Di più', 'Molto'],
      carattere: 'Carattere leggibile', titoli: 'Titoli in evidenza', link: 'Link in evidenza', lente: 'Lente sul testo',
      allinea: 'Allineamento', allinee: { '': 'Come il sito', left: 'A sinistra', center: 'Al centro', right: 'A destra' },
      contrasto: 'Contrasto', contrasti: { scuro: 'Scuro', chiaro: 'Chiaro', elevato: 'Più alto' },
      saturazione: 'Colori', saturazioni: { alta: 'Più vivi', bassa: 'Più tenui', mono: 'Bianco e nero' },
      coloreTesto: 'Colore del testo', coloreTitoli: 'Colore dei titoli', coloreSfondo: 'Colore dello sfondo',
      nomiColori: ['carbone', 'bianco', 'vaniglia', 'grigio-lilla', 'malva', 'blu', 'verde', 'rosso'],
      fermo: 'Ferma le animazioni', muto: 'Silenzia i suoni', immagini: 'Nascondi le immagini', guida: 'Guida di lettura',
      maschera: 'Fascia di lettura', passaggio: 'Evidenzia sotto il mouse', fuoco: 'Evidenzia il focus', voce: 'Leggi al clic',
      cursore: 'Cursore grande', cursori: { nero: 'Nero', bianco: 'Bianco' },
      modoLettura: 'Modalità lettura', leggiPagina: 'Leggi la pagina ad alta voce', fermaLettura: 'Ferma la lettura',
      chiudiLettura: 'Chiudi la modalità lettura',
      vaiScegli: 'Scegli un punto della pagina', vaiTitoli: 'Titoli', vaiZone: 'Zone della pagina',
      zone: { header: 'Testata', nav: 'Navigazione', main: 'Contenuto principale', aside: 'Contenuto a lato', footer: 'Piè di pagina', form: 'Modulo', search: 'Ricerca', section: 'Sezione' },
      nota: 'Queste regolazioni cambiano come vedi il sito tu, in questo browser. Non sostituiscono un sito fatto bene: se qualcosa non funziona, scrivi a ',
      notaSenza: 'Queste regolazioni cambiano come vedi il sito tu, in questo browser. Non sostituiscono un sito fatto bene.',
      scorciatoia: 'Apri e chiudi questo pannello con Alt + Maiusc + A.',
      attivo: 'attivato', spento: 'disattivato', tuttoRipristinato: 'Tutte le regolazioni sono tornate come il sito.',
      nascosto: 'Bottone nascosto per questa visita. Per riaprire il pannello: Alt + Maiusc + A.',
      nonVoce: 'Questo browser non sa leggere ad alta voce.', nienteDaLeggere: 'Non trovo testo da leggere.',
      ricarica: 'Alcune animazioni si fermano del tutto quando ricarichi la pagina.',
      tipi: { h: 'Titolo', z: 'Zona', f: 'Campo', g: 'Immagine' },
      nessuno_: { h: 'Nessun titolo in questa pagina.', z: 'Nessuna zona segnata in questa pagina.', f: 'Nessun modulo in questa pagina.', g: 'Nessuna immagine in questa pagina.' },
      di: 'di', senzaNome: 'senza nome'
    },
    en: {
      apri: 'Open accessibility settings', chiudi: 'Close the panel', titolo: 'Accessibility',
      sotto: 'Adapt this site to the way you read and browse. Your choices stay in this browser.',
      ripristina: 'Reset all', dichiarazione: 'Statement', nascondi: 'Hide the button', altraLingua: 'Italiano',
      sezProfili: 'Profiles', sezTesto: 'Text', sezColori: 'Colours', sezOrientarsi: 'Finding your way', sezVai: 'Go to…',
      profili: {
        epilessia: ['Reduced motion', 'Stops animations and sounds, softens colours. For people bothered by flashes and motion, including photosensitive epilepsy.'],
        ipovisione: ['Low vision', 'Larger text, higher contrast, a readable typeface, clearly visible links and focus.'],
        concentrazione: ['Focus', 'A reading band that dims the rest of the page, with no animations or sounds. Helpful with ADHD.'],
        lettura: ['Easy reading', 'Readable typeface, more space, left-aligned text, highlighted headings and links. Helpful with dyslexia.'],
        comoda: ['Comfortable reading', 'Large text, higher contrast, reading guide, big cursor and no animations.'],
        tastiera: ['Keyboard', 'Always-visible focus and quick keys: H headings, Z page regions, F form fields, G images. Add Shift to go back.']
      },
      no: 'Off', si: 'On',
      passi: { testo: 'Text size', scala: 'Page size', interlinea: 'Line spacing', lettere: 'Letter spacing', parole: 'Word spacing' },
      comeIlSito: 'As the site', meno: 'Decrease', piu: 'Increase', livelli: ['As the site', 'A little', 'More', 'A lot'],
      carattere: 'Readable typeface', titoli: 'Highlight headings', link: 'Highlight links', lente: 'Text magnifier',
      allinea: 'Alignment', allinee: { '': 'As the site', left: 'Left', center: 'Centre', right: 'Right' },
      contrasto: 'Contrast', contrasti: { scuro: 'Dark', chiaro: 'Light', elevato: 'Higher' },
      saturazione: 'Colours', saturazioni: { alta: 'Brighter', bassa: 'Softer', mono: 'Black and white' },
      coloreTesto: 'Text colour', coloreTitoli: 'Heading colour', coloreSfondo: 'Background colour',
      nomiColori: ['charcoal', 'white', 'vanilla', 'lilac grey', 'mauve', 'blue', 'green', 'red'],
      fermo: 'Stop animations', muto: 'Mute sounds', immagini: 'Hide images', guida: 'Reading guide',
      maschera: 'Reading band', passaggio: 'Highlight on hover', fuoco: 'Highlight focus', voce: 'Read on click',
      cursore: 'Big cursor', cursori: { nero: 'Black', bianco: 'White' },
      modoLettura: 'Reading mode', leggiPagina: 'Read the page aloud', fermaLettura: 'Stop reading',
      chiudiLettura: 'Close reading mode',
      vaiScegli: 'Choose a place on the page', vaiTitoli: 'Headings', vaiZone: 'Page regions',
      zone: { header: 'Header', nav: 'Navigation', main: 'Main content', aside: 'Side content', footer: 'Footer', form: 'Form', search: 'Search', section: 'Section' },
      nota: 'These settings change how you see the site, in this browser. They do not replace a well-made site: if something does not work, write to ',
      notaSenza: 'These settings change how you see the site, in this browser. They do not replace a well-made site.',
      scorciatoia: 'Open and close this panel with Alt + Shift + A.',
      attivo: 'on', spento: 'off', tuttoRipristinato: 'All settings are back to the site defaults.',
      nascosto: 'Button hidden for this visit. To reopen the panel: Alt + Shift + A.',
      nonVoce: 'This browser cannot read aloud.', nienteDaLeggere: 'No text to read here.',
      ricarica: 'Some animations stop completely when you reload the page.',
      tipi: { h: 'Heading', z: 'Region', f: 'Field', g: 'Image' },
      nessuno_: { h: 'No headings on this page.', z: 'No marked regions on this page.', f: 'No form fields on this page.', g: 'No images on this page.' },
      di: 'of', senzaNome: 'unnamed'
    }
  };
  var lingua = TESTI[CONF.lingua] ? CONF.lingua : 'it';
  function T() { return TESTI[lingua]; }

  /* ---------- 2. Lo stato ----------------------------------------------------
     «manuale» sono le scelte fatte a mano (una chiave assente = non scelta);
     «profili» quelli accesi. Quello che vale (eff) è: la scelta a mano se c'è,
     altrimenti il massimo dei profili accesi, altrimenti il sito com'è. */
  var BASE = {
    testo: 0, scala: 0, interlinea: 0, lettere: 0, parole: 0, carattere: false, allinea: '', titoli: false, link: false, lente: false,
    contrasto: '', saturazione: '', coloreTesto: '', coloreTitoli: '', coloreSfondo: '',
    fermo: false, muto: false, immagini: false, guida: false, maschera: false, passaggio: false, fuoco: false, cursore: '', voce: false, tastiera: false
  };
  var PROFILI = {
    epilessia: { fermo: true, saturazione: 'bassa', muto: true },
    ipovisione: { testo: 2, carattere: true, interlinea: 1, contrasto: 'elevato', fuoco: true, link: true },
    concentrazione: { maschera: true, fermo: true, muto: true },
    lettura: { carattere: true, interlinea: 2, lettere: 1, parole: 1, allinea: 'left', titoli: true, link: true },
    comoda: { testo: 3, interlinea: 1, contrasto: 'elevato', guida: true, fermo: true, cursore: 'nero', link: true, fuoco: true },
    tastiera: { tastiera: true, fuoco: true }
  };
  var LIVELLI = {
    testo: [1, 1.1, 1.2, 1.35, 1.5, 1.7], scala: [1, 1.1, 1.2, 1.35, 1.5],
    interlinea: [0, 1.8, 2.1, 2.4], lettere: [0, 0.06, 0.12, 0.18], parole: [0, 0.16, 0.3, 0.45]
  };
  var COLORI = ['#1C1D21', '#FFFFFF', '#F4EEA9', '#716A76', '#8C768F', '#0B4F8A', '#1E6B3A', '#A4262C'];

  var stato = { manuale: {}, profili: {} };
  try {
    var salvato = JSON.parse(localStorage.getItem(CONF.chiave) || 'null');
    if (salvato && typeof salvato === 'object') stato = { manuale: salvato.manuale || {}, profili: salvato.profili || {} };
  } catch (e) { /* niente salvataggio: si parte dal sito com'è */ }
  function salva() { try { localStorage.setItem(CONF.chiave, JSON.stringify(stato)); } catch (e) { /* vale per questa pagina */ } }

  function calcola() {
    var e = {};
    Object.keys(BASE).forEach(function (k) {
      if (Object.prototype.hasOwnProperty.call(stato.manuale, k)) { e[k] = stato.manuale[k]; return; }
      var v = BASE[k];
      Object.keys(PROFILI).forEach(function (p) {
        if (!stato.profili[p] || !Object.prototype.hasOwnProperty.call(PROFILI[p], k)) return;
        var w = PROFILI[p][k];
        if (typeof v === 'number') v = Math.max(v, w);
        else if (typeof v === 'boolean') v = v || w;
        else if (!v) v = w;
      });
      e[k] = v;
    });
    return e;
  }
  var eff = calcola();

  /* ---------- 3. prefers-reduced-motion da JavaScript ----------------------- */
  var mqlFinte = [];
  if (CONF.movimento && window.matchMedia) {
    var mmVero = window.matchMedia.bind(window);
    window.matchMedia = function (q) {
      var reale = mmVero(q);
      if (!/prefers-reduced-motion/i.test(String(q))) return reale;
      var vuole = /reduce/i.test(q) && !/no-preference/i.test(q);
      var ascolta = [];
      var finta = {
        media: reale.media, onchange: null,
        get matches() { return eff.fermo ? vuole : reale.matches; },
        addEventListener: function (t, f) { if (t === 'change' && f) ascolta.push(f); },
        removeEventListener: function (t, f) { var i = ascolta.indexOf(f); if (i >= 0) ascolta.splice(i, 1); },
        addListener: function (f) { if (f) ascolta.push(f); },
        removeListener: function (f) { var i = ascolta.indexOf(f); if (i >= 0) ascolta.splice(i, 1); },
        dispatchEvent: function () { return true; },
        avvisa: function () {
          var ev = { type: 'change', matches: finta.matches, media: finta.media };
          ascolta.slice().forEach(function (f) { try { if (typeof f === 'function') f.call(finta, ev); else if (f.handleEvent) f.handleEvent(ev); } catch (err) { /* lo script del sito */ } });
          if (typeof finta.onchange === 'function') { try { finta.onchange(ev); } catch (err) { /* idem */ } }
        }
      };
      if (reale.addEventListener) reale.addEventListener('change', finta.avvisa); else if (reale.addListener) reale.addListener(finta.avvisa);
      mqlFinte.push(finta);
      return finta;
    };
  }

  /* ---------- 4. Il foglio di stile delle regolazioni ------------------------ */
  var NON_GRAFICA = ':not(svg):not(svg *):not(img):not(video):not(canvas):not(picture)';
  var ICONE_FONT = ':not(i):not([class*="icon"]):not([class*="Icon"]):not([class*="fa-"]):not(.material-icons):not(.material-symbols-outlined)';
  var TITOLI = 'h1, h2, h3, h4, h5, h6, [role="heading"]';
  function cursoreSvg(riempi, bordo) {
    var s = '<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44"><path d="M5 3 L5 36 L13.5 28 L19.5 41 L25.5 38.3 L19.5 25.5 L31 25.5 Z" fill="' + riempi + '" stroke="' + bordo + '" stroke-width="2.6" stroke-linejoin="round"/></svg>';
    return 'url("data:image/svg+xml,' + encodeURIComponent(s) + '") 5 3, auto';
  }

  function foglio() {
    var r = [];
    var filtri = [];
    if (eff.contrasto === 'elevato') filtri.push('contrast(1.35)');
    if (eff.saturazione === 'alta') filtri.push('saturate(1.8)');
    if (eff.saturazione === 'bassa') filtri.push('saturate(0.4)');
    if (eff.saturazione === 'mono') filtri.push('grayscale(1)');
    if (filtri.length) r.push('html { filter: ' + filtri.join(' ') + ' !important; }');

    if (LIVELLI.scala[eff.scala] > 1) r.push('body > *:not([data-tp-acc-fisso]) { zoom: ' + LIVELLI.scala[eff.scala] + ' !important; }');
    if (eff.interlinea) r.push('body *' + NON_GRAFICA + ' { line-height: ' + LIVELLI.interlinea[eff.interlinea] + ' !important; }');
    if (eff.lettere) r.push('body *' + NON_GRAFICA + ' { letter-spacing: ' + LIVELLI.lettere[eff.lettere] + 'em !important; }');
    if (eff.parole) r.push('body *' + NON_GRAFICA + ' { word-spacing: ' + LIVELLI.parole[eff.parole] + 'em !important; }');
    if (eff.carattere) r.push('body, body *' + NON_GRAFICA + ICONE_FONT + ' { font-family: Verdana, "Atkinson Hyperlegible", Tahoma, "Segoe UI", sans-serif !important; font-style: normal !important; }');
    if (eff.allinea) r.push('body *' + NON_GRAFICA + ' { text-align: ' + eff.allinea + ' !important; hyphens: manual !important; }');
    if (eff.titoli) r.push('body :is(' + TITOLI + ') { outline: 3px solid #8C768F !important; outline-offset: 4px !important; }');
    if (eff.link) r.push('body a[href] { text-decoration: underline !important; text-decoration-thickness: 2px !important; text-underline-offset: 0.18em !important; background-color: #F4EEA9 !important; color: #1C1D21 !important; outline: 2px solid #1C1D21 !important; outline-offset: 1px !important; } body a[href] * { color: #1C1D21 !important; }');

    if (eff.contrasto === 'scuro') r.push(
      'html, body { background: #141416 !important; }',
      'body *' + NON_GRAFICA + ' { background-color: #141416 !important; color: #F2F0EC !important; border-color: rgba(242,240,236,0.45) !important; text-shadow: none !important; }',
      'body a[href], body a[href] * { color: #F4EEA9 !important; }');
    if (eff.contrasto === 'chiaro') r.push(
      'html, body { background: #FFFFFF !important; }',
      'body *' + NON_GRAFICA + ' { background-color: #FFFFFF !important; color: #1C1D21 !important; border-color: rgba(28,29,33,0.5) !important; text-shadow: none !important; }',
      'body a[href], body a[href] * { color: #4B2D63 !important; }');
    if (eff.coloreSfondo) r.push('html, body { background: ' + eff.coloreSfondo + ' !important; } body *' + NON_GRAFICA + ' { background-color: ' + eff.coloreSfondo + ' !important; }');
    if (eff.coloreTesto) r.push('body *' + NON_GRAFICA + ':not(h1):not(h2):not(h3):not(h4):not(h5):not(h6) { color: ' + eff.coloreTesto + ' !important; }');
    if (eff.coloreTitoli) r.push('body :is(' + TITOLI + '), body :is(' + TITOLI + ') * { color: ' + eff.coloreTitoli + ' !important; }');

    if (eff.fermo) r.push(
      'html { scroll-behavior: auto !important; }',
      'body *, body *::before, body *::after { animation-duration: 0.001ms !important; animation-delay: 0s !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; transition-delay: 0s !important; scroll-behavior: auto !important; }');
    if (eff.immagini) r.push(
      'body img, body picture, body video, body canvas, body [role="img"]:not(svg), body svg image { visibility: hidden !important; }',
      'body, body * { background-image: none !important; }');
    if (eff.passaggio) r.push('body *:hover:not(:has(*:hover)) { outline: 3px dashed #8C768F !important; outline-offset: 2px !important; }');
    if (eff.fuoco) r.push('body :focus, body :focus-visible { outline: 3px solid #1C1D21 !important; outline-offset: 2px !important; box-shadow: 0 0 0 7px #F4EEA9 !important; }');
    if (eff.cursore) {
      var c = eff.cursore === 'bianco' ? cursoreSvg('#FFFFFF', '#1C1D21') : cursoreSvg('#1C1D21', '#FFFFFF');
      r.push('html, body, body * { cursor: ' + c + ' !important; }');
    }
    // Il blocco che la voce sta leggendo: sempre, così resta anche se la lettura parte senza altre regolazioni.
    r.push('.tp-acc-legge { background-color: #F4EEA9 !important; color: #1C1D21 !important; outline: 3px solid #1C1D21 !important; outline-offset: 3px !important; }');
    return r.join('\n');
  }

  var stile = null;
  function scriviFoglio() {
    if (!stile) {
      stile = document.createElement('style');
      stile.id = 'tp-accessibilita-stili';
    }
    stile.textContent = foglio();
    // In fondo alla testa, dopo i fogli del sito, così a pari forza vince.
    var dove = document.head || html;
    if (stile.parentNode !== dove || stile !== dove.lastElementChild) dove.appendChild(stile);
  }
  scriviFoglio();

  /* ---------- 5. La dimensione del testo, elemento per elemento ------------- */
  var SALTA = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEMPLATE: 1, BR: 1, IMG: 1, VIDEO: 1, CANVAS: 1, IFRAME: 1, PICTURE: 1, SOURCE: 1, LINK: 1, META: 1 };
  var toccati = new Map();
  var fattoreAttuale = 1;
  function ripristinaTesti() {
    toccati.forEach(function (o, el) { if (o.v) el.style.setProperty('font-size', o.v, o.p); else el.style.removeProperty('font-size'); });
    toccati.clear();
  }
  function misuraTesti() {
    if (!document.body) return;
    var f = LIVELLI.testo[eff.testo] || 1;
    ripristinaTesti();
    fattoreAttuale = f;
    if (f === 1) return;
    var tutti = document.body.getElementsByTagName('*');
    var lista = [];
    for (var i = 0; i < tutti.length; i++) {
      var el = tutti[i];
      if (SALTA[el.tagName] || el instanceof SVGElement) continue;
      var px = parseFloat(getComputedStyle(el).fontSize);
      if (px) lista.push([el, px]);
    }
    // Prima si misura tutto, poi si scrive: scrivendo un padre cambierebbe la misura dei figli.
    lista.forEach(function (x) {
      var el = x[0];
      toccati.set(el, { v: el.style.getPropertyValue('font-size'), p: el.style.getPropertyPriority('font-size') });
      el.style.setProperty('font-size', (x[1] * f).toFixed(2) + 'px', 'important');
    });
  }
  function segnaFissi() {
    if (!document.body) return;
    [].forEach.call(document.body.children, function (el) {
      if (getComputedStyle(el).position === 'fixed') el.setAttribute('data-tp-acc-fisso', ''); else el.removeAttribute('data-tp-acc-fisso');
    });
  }

  /* ---------- 6. Suoni e animazioni fatte in JavaScript ---------------------- */
  var zittiti = new Set();
  function applicaMuto() {
    document.querySelectorAll('audio, video').forEach(function (m) {
      if (eff.muto && !m.muted) { m.muted = true; zittiti.add(m); }
    });
    if (!eff.muto) { zittiti.forEach(function (m) { m.muted = false; }); zittiti.clear(); }
  }
  var eraFermo = eff.fermo;
  function applicaFermo(avvisaCanvas) {
    if (eff.fermo) {
      document.querySelectorAll('video').forEach(function (v) { if (!v.paused && (v.autoplay || v.loop)) v.pause(); });
      if (document.getAnimations) document.getAnimations().forEach(function (a) { try { if (a.playState === 'running') a.pause(); } catch (e) { /* niente */ } });
    } else if (document.getAnimations) {
      document.getAnimations().forEach(function (a) { try { if (a.playState === 'paused') a.play(); } catch (e) { /* niente */ } });
    }
    if (eraFermo !== eff.fermo) {
      mqlFinte.forEach(function (m) { m.avvisa(); });
      if (avvisaCanvas && eff.fermo && document.querySelector('canvas')) annuncia(T().ricarica, true);
    }
    eraFermo = eff.fermo;
  }

  /* ---------- 7. Il pannello -------------------------------------------------- */
  var ICONE = {
    accesso: '<circle cx="12" cy="12" r="10.2"/><circle cx="12" cy="6.9" r="1.4" fill="currentColor" stroke="none"/><path d="M6.8 9.4c1.7.5 3.4.8 5.2.8s3.5-.3 5.2-.8M12 10.2v3.6M12 13.8l-2.6 4.6M12 13.8l2.6 4.6"/>',
    chiudi: '<path d="M6 6l12 12M18 6 6 18"/>',
    ripristina: '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.2v4.3h4.3"/>',
    documento: '<path d="M6 3.5h8l4 4v13H6zM14 3.5v4h4M9 12h6M9 15.5h6"/>',
    nascondi: '<path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z"/><circle cx="12" cy="12" r="2.5"/><path d="M4 4l16 16"/>',
    lingua: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 3.6 5.4 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.4-3.6-8.5S9.5 6.1 12 3.5z"/>',
    carattere: '<path d="M3.5 19 8.8 5h1.2L15.3 19M5.6 14.2h7.6"/><path d="M16.5 12.3c.6-.6 1.4-.9 2.2-.9 1.5 0 2.3.9 2.3 2.4V19m0-3.4c-.9-.2-4.6-.5-4.6 1.6 0 1.8 3.5 1.9 4.6-.4"/>',
    titoli: '<path d="M4.5 5v14M12.5 5v14M4.5 12h8M16.5 9.5l2.5-2V19"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    lente: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.3 15.3 20.5 20.5M7.8 10.5h5.4M10.5 7.8v5.4"/>',
    scuro: '<path d="M19.5 14.6A8 8 0 0 1 9.4 4.5a8 8 0 1 0 10.1 10.1Z"/>',
    chiaro: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M5.3 18.7 7 17M17 7l1.7-1.7"/>',
    elevato: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17a8.5 8.5 0 0 0 0-17z" fill="currentColor"/>',
    alta: '<path d="M12 3.5s6 6.3 6 10.5a6 6 0 0 1-12 0c0-4.2 6-10.5 6-10.5z" fill="currentColor"/>',
    bassa: '<path d="M12 3.5s6 6.3 6 10.5a6 6 0 0 1-12 0c0-4.2 6-10.5 6-10.5z"/>',
    mono: '<path d="M12 3.5s6 6.3 6 10.5a6 6 0 0 1-12 0c0-4.2 6-10.5 6-10.5z"/><path d="M12 3.5V20a6 6 0 0 1-6-6c0-4.2 6-10.5 6-10.5z" fill="currentColor"/>',
    fermo: '<circle cx="12" cy="12" r="8.5"/><path d="M10 8.7v6.6M14 8.7v6.6"/>',
    muto: '<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M15.5 9.5l5 5M20.5 9.5l-5 5"/>',
    immagini: '<rect x="3.5" y="5" width="17" height="14"/><path d="M3.5 15.5l4.5-4.5 4 4 2.5-2.5 6 6M3 3l18 18"/>',
    guida: '<path d="M3 6.5h18M3 17.5h18"/><rect x="3" y="10" width="18" height="4"/>',
    maschera: '<rect x="3.5" y="4" width="17" height="16"/><path d="M3.5 9.5h17M3.5 14.5h17"/><path d="M3.5 4h17v5.5h-17zM3.5 14.5h17V20h-17z" fill="currentColor" opacity=".35"/>',
    passaggio: '<path d="M6 3l12 8.5-5.2 1.2 3 6-2.4 1.2-3-6L6 18z"/>',
    fuoco: '<rect x="3.5" y="3.5" width="17" height="17" stroke-dasharray="3 2.6"/><rect x="8" y="8" width="8" height="8"/>',
    voce: '<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
    lettura: '<path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13"/>',
    nero: '<path d="M6 3v16l4.2-3.9 3 6.3 2.9-1.3-2.9-6.2h5.6z" fill="currentColor"/>',
    bianco: '<path d="M6 3v16l4.2-3.9 3 6.3 2.9-1.3-2.9-6.2h5.6z"/>',
    left: '<path d="M4 6h16M4 10h10M4 14h16M4 18h10"/>',
    center: '<path d="M4 6h16M7 10h10M4 14h16M7 18h10"/>',
    right: '<path d="M4 6h16M10 10h10M4 14h16M10 18h10"/>',
    come: '<path d="M4 6h16M4 10h16M4 14h16M4 18h16"/>',
    meno: '<path d="M6 12h12"/>', piu: '<path d="M6 12h12M12 6v12"/>'
  };
  function icona(n, cls) {
    return '<svg class="' + (cls || 'ic') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + ICONE[n] + '</svg>';
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var CSS_PANNELLO = [
    ':host { all: initial; }',
    '.w { --fondo: #FFFFFF; --carbone: #1C1D21; --testo: var(--carbone); --testo-2: #716A76; --vaniglia: #F4EEA9; --malva: #8C768F; --lilla: #CBC1CD; --linea: rgba(28,29,33,0.22); --filo: 1.5px;',
    '  font-family: var(--carattere, "Source Sans 3", "Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif); font-size: 16px; line-height: 1.45; color: var(--testo); -webkit-font-smoothing: antialiased; }',
    '.w.scuro { --fondo: #1C1D21; --testo: #F2F0EC; --testo-2: #BDB4C2; --linea: rgba(242,240,236,0.25); }',
    '.w *, .w *::before, .w *::after { box-sizing: border-box; }',
    'button, select { font: inherit; color: inherit; }',
    'button { cursor: pointer; }',
    '.w :focus-visible { outline: 3px solid var(--testo); outline-offset: 2px; }',
    '.ic { width: 1.35em; height: 1.35em; flex: none; }',
    /* il bottone nell'angolo: vaniglia, contorno carbone, e dietro una forma carbone fuori registro che torna a registro al passaggio */
    '.apri { position: fixed; bottom: 1.25rem; width: 3.5rem; height: 3.5rem; display: grid; place-items: center; padding: 0; background: var(--vaniglia); color: var(--carbone); border: 2px solid var(--carbone); box-shadow: 5px 5px 0 0 var(--carbone); z-index: 2147483000; transition: box-shadow 120ms ease, transform 120ms ease; }',
    '.w.scuro .apri { box-shadow: 5px 5px 0 0 var(--lilla); }',
    '.apri:hover, .apri:focus-visible { box-shadow: 0 0 0 0 var(--carbone); transform: translate(3px, 3px); }',
    '.apri .ic { width: 2.1rem; height: 2.1rem; stroke-width: 1.5; }',
    '.destra .apri { right: 1.25rem; } .sinistra .apri { left: 1.25rem; }',
    '.apri[hidden] { display: none; }',
    /* il pannello */
    '.pannello { position: fixed; top: 0; bottom: 0; width: min(27rem, 100vw); background: var(--fondo); color: var(--testo); overflow-y: auto; overscroll-behavior: contain; z-index: 2147483001; display: none; }',
    '.destra .pannello { right: 0; border-left: 2px solid var(--testo); } .sinistra .pannello { left: 0; border-right: 2px solid var(--testo); }',
    '.aperto .pannello { display: block; }',
    '.testa { position: sticky; top: 0; z-index: 2; background: var(--carbone); color: #F2F0EC; padding: 1rem 1.1rem 0.9rem; }',
    '.w.scuro .testa { border-bottom: 1px solid var(--linea); }',
    '.riga-titolo { display: flex; align-items: center; gap: 0.6rem; }',
    'h2.titolo { flex: 1; margin: 0; font-family: "Source Serif 4", Georgia, serif; font-weight: 600; font-size: 1.55rem; line-height: 1.1; color: #F2F0EC; }',
    'h2.titolo:focus { outline: none; }',
    '.titolo .sole { display: inline-block; width: 0.62em; height: 0.62em; margin-left: 0.3em; background: var(--vaniglia); border-radius: 50%; vertical-align: 0.08em; }',
    '.chiudi { display: grid; place-items: center; width: 2.6rem; height: 2.6rem; padding: 0; background: transparent; color: #F2F0EC; border: 1.5px solid rgba(242,240,236,0.5); }',
    '.chiudi:hover { background: var(--vaniglia); color: var(--carbone); border-color: var(--vaniglia); }',
    '.testa :focus-visible { outline-color: var(--vaniglia); }',
    '.sotto { margin: 0.45rem 0 0.8rem; font-size: 0.92rem; color: #D9D4DC; }',
    '.azioni-testa { display: flex; flex-wrap: wrap; gap: 0.4rem; }',
    '.azioni-testa button, .azioni-testa a { display: inline-flex; align-items: center; gap: 0.35rem; min-height: 2.25rem; padding: 0.3rem 0.65rem; background: transparent; color: #F2F0EC; border: 1.5px solid rgba(242,240,236,0.5); font-size: 0.88rem; font-weight: 600; text-decoration: none; }',
    '.azioni-testa button:hover, .azioni-testa a:hover { background: var(--vaniglia); color: var(--carbone); border-color: var(--vaniglia); }',
    '.azioni-testa .ic { width: 1.1em; height: 1.1em; }',
    '.corpo { padding: 0.4rem 1.1rem 1.6rem; }',
    'section { padding: 1.1rem 0 0.2rem; border-top: 1px solid var(--linea); margin-top: 0.9rem; }',
    'section:first-child { border-top: 0; margin-top: 0; }',
    'h3 { margin: 0 0 0.75rem; font-family: "Source Serif 4", Georgia, serif; font-weight: 600; font-size: 1.2rem; color: var(--testo); }',
    'h4 { margin: 0.9rem 0 0.45rem; font-size: 0.9rem; font-weight: 600; color: var(--testo-2); text-transform: none; }',
    /* i profili: righe con l\'interruttore No | Sì */
    '.profilo { display: flex; align-items: center; gap: 0.9rem; width: 100%; margin: 0 0 0.5rem; padding: 0.7rem 0.75rem; text-align: left; background: var(--fondo); border: var(--filo) solid var(--testo); }',
    '.profilo:hover { background: rgba(244,238,169,0.35); }',
    '.w.scuro .profilo:hover { background: rgba(244,238,169,0.12); }',
    '.profilo[aria-checked="true"] { background: var(--vaniglia); color: var(--carbone); box-shadow: 4px 4px 0 0 var(--malva); }',
    '.p-testo { flex: 1; min-width: 0; }',
    '.p-nome { display: block; font-weight: 700; font-size: 1.02rem; }',
    '.p-desc { display: block; margin-top: 0.1rem; font-size: 0.87rem; line-height: 1.4; color: var(--testo-2); }',
    '.profilo[aria-checked="true"] .p-desc { color: #3E3A44; }',
    '.p-sw { flex: none; display: flex; border: var(--filo) solid currentColor; font-size: 0.8rem; font-weight: 700; }',
    '.p-sw span { padding: 0.2rem 0.45rem; min-width: 2.2rem; text-align: center; }',
    '.profilo[aria-checked="false"] .p-sw span:first-child { background: var(--testo); color: var(--fondo); }',
    '.profilo[aria-checked="true"] .p-sw span:last-child { background: var(--carbone); color: var(--vaniglia); }',
    /* le tessere */
    '.griglia { display: grid; grid-template-columns: repeat(auto-fill, minmax(7.4rem, 1fr)); gap: 0.5rem; }',
    '.griglia.due { grid-template-columns: repeat(2, 1fr); }',
    '.tessera { display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; gap: 0.5rem; min-height: 5rem; padding: 0.6rem 0.65rem; text-align: left; background: var(--fondo); border: var(--filo) solid var(--testo); font-size: 0.92rem; font-weight: 600; line-height: 1.25; }',
    '.tessera:hover { background: rgba(244,238,169,0.35); }',
    '.w.scuro .tessera:hover { background: rgba(244,238,169,0.12); }',
    '.tessera[aria-pressed="true"] { background: var(--vaniglia); color: var(--carbone); box-shadow: 4px 4px 0 0 var(--malva); }',
    '.tessera .ic { width: 1.6em; height: 1.6em; }',
    '.tessera.larga { grid-column: 1 / -1; flex-direction: row; align-items: center; justify-content: flex-start; min-height: 3rem; }',
    /* i passi − valore + */
    '.passi { display: flex; align-items: center; gap: 0.5rem; padding: 0.55rem 0; border-bottom: 1px solid var(--linea); }',
    '.passi:last-of-type { border-bottom: 0; }',
    '.passi-nome { flex: 1; font-weight: 600; font-size: 0.95rem; }',
    '.passi button { display: grid; place-items: center; width: 2.4rem; height: 2.4rem; padding: 0; background: var(--fondo); border: var(--filo) solid var(--testo); }',
    '.passi button:hover:not(:disabled) { background: var(--vaniglia); color: var(--carbone); }',
    '.passi button:disabled { opacity: 0.35; cursor: default; }',
    '.passi output { min-width: 6.2rem; text-align: center; font-size: 0.9rem; font-variant-numeric: tabular-nums; }',
    '.passi output.cambiato { font-weight: 700; background: var(--vaniglia); color: var(--carbone); padding: 0.15rem 0.3rem; }',
    /* allineamento e cursore: una fila di scelte */
    '.fila { display: grid; grid-template-columns: repeat(4, 1fr); border: var(--filo) solid var(--testo); }',
    '.fila.tre { grid-template-columns: repeat(3, 1fr); }',
    '.fila button { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; padding: 0.5rem 0.2rem; background: var(--fondo); border: 0; border-left: var(--filo) solid var(--testo); font-size: 0.82rem; font-weight: 600; }',
    '.fila button:first-child { border-left: 0; }',
    '.fila button:hover { background: rgba(244,238,169,0.35); }',
    '.fila button[aria-pressed="true"] { background: var(--vaniglia); color: var(--carbone); }',
    /* i colori */
    '.colori { margin: 0.2rem 0 0.7rem; }',
    '.campioni { display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center; }',
    '.campione { width: 2.1rem; height: 2.1rem; padding: 0; border: var(--filo) solid var(--testo); }',
    '.campione[aria-pressed="true"] { outline: 3px solid var(--testo); outline-offset: 2px; }',
    '.campione.nessuno { width: auto; padding: 0 0.6rem; background: var(--fondo); font-size: 0.85rem; font-weight: 600; }',
    /* le azioni grandi */
    '.azione { display: flex; align-items: center; gap: 0.6rem; width: 100%; margin: 0.5rem 0 0; padding: 0.75rem 0.8rem; background: var(--carbone); color: #F2F0EC; border: var(--filo) solid var(--carbone); font-weight: 600; text-align: left; }',
    '.w.scuro .azione { background: #F2F0EC; color: var(--carbone); border-color: #F2F0EC; }',
    '.azione:hover { background: var(--vaniglia); color: var(--carbone); border-color: var(--carbone); }',
    '.vai { width: 100%; min-height: 2.8rem; padding: 0.4rem 0.6rem; background: var(--fondo); border: var(--filo) solid var(--testo); border-radius: 0; font-size: 0.95rem; }',
    '.piede { margin-top: 1.2rem; padding-top: 1rem; border-top: 1px solid var(--linea); font-size: 0.87rem; color: var(--testo-2); }',
    '.piede p { margin: 0 0 0.5rem; }',
    '.piede a { color: var(--testo); }',
    'kbd { font-family: inherit; font-weight: 700; }',
    /* gli strumenti sulla pagina */
    '.guida { position: fixed; left: 0; right: 0; top: 0; height: 14px; margin-top: -7px; background: rgba(244,238,169,0.5); border-top: 2px solid var(--carbone); border-bottom: 2px solid var(--carbone); pointer-events: none; z-index: 2147482990; display: none; }',
    '.velo { position: fixed; left: 0; right: 0; background: rgba(28,29,33,0.72); pointer-events: none; z-index: 2147482990; display: none; }',
    '.velo.su { top: 0; } .velo.giu { bottom: 0; }',
    '.lente { position: fixed; max-width: min(34rem, calc(100vw - 2rem)); padding: 0.6rem 0.85rem; background: var(--carbone); color: #F2F0EC; border: 2px solid var(--vaniglia); font-size: 1.7rem; line-height: 1.3; font-weight: 500; pointer-events: none; z-index: 2147482995; display: none; overflow-wrap: anywhere; }',
    '.avviso { position: fixed; left: 50%; bottom: 5.5rem; transform: translateX(-50%); max-width: min(30rem, calc(100vw - 2rem)); padding: 0.7rem 1rem; background: var(--carbone); color: #F2F0EC; border: 2px solid var(--vaniglia); font-size: 1rem; font-weight: 600; z-index: 2147483002; display: none; }',
    '.avviso.visto { display: block; }',
    '.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }',
    /* la modalità lettura */
    '.lettura { position: fixed; inset: 0; overflow-y: auto; background: #FBFAF4; color: #1C1D21; z-index: 2147483003; display: none; }',
    '.w.scuro .lettura { background: #1C1D21; color: #F2F0EC; }',
    '.lettura.vista { display: block; }',
    '.lettura-barra { position: sticky; top: 0; display: flex; justify-content: flex-end; padding: 0.8rem 1rem; background: inherit; border-bottom: 1px solid var(--linea); }',
    '.lettura-barra button { display: inline-flex; align-items: center; gap: 0.4rem; min-height: 2.6rem; padding: 0.3rem 0.8rem; background: var(--vaniglia); color: var(--carbone); border: 2px solid var(--carbone); font-weight: 700; }',
    '.lettura-testo { max-width: 40rem; margin: 0 auto; padding: 2rem 1.25rem 5rem; font-size: 1.3rem; line-height: 1.75; }',
    '.lettura-testo h1, .lettura-testo h2, .lettura-testo h3, .lettura-testo h4 { font-family: "Source Serif 4", Georgia, serif; line-height: 1.2; margin: 1.6em 0 0.5em; }',
    '.lettura-testo h1 { font-size: 2.1rem; margin-top: 0; } .lettura-testo h2 { font-size: 1.7rem; } .lettura-testo h3, .lettura-testo h4 { font-size: 1.35rem; }',
    '.lettura-testo p { margin: 0 0 1em; } .lettura-testo ul { padding-left: 1.2em; } .lettura-testo li { margin-bottom: 0.4em; }',
    '.lettura-testo .alt { font-style: italic; color: var(--testo-2); }',
    '.lettura-testo a { color: inherit; text-decoration-thickness: 2px; }',
    '@media (max-width: 30em) { .pannello { width: 100vw; border: 0 !important; } .apri { bottom: 1rem; } .destra .apri { right: 1rem; } .sinistra .apri { left: 1rem; } }',
    '@media (prefers-reduced-motion: reduce) { .apri { transition: none; } }',
    '@media print { .w { display: none; } }'
  ].join('\n');

  var ospite, radice, w, pannello, bottone, avviso, vivo, guida, veloSu, veloGiu, lente, lettura;
  var aperto = false;

  function temaScuro() {
    var a = html.getAttribute('data-aspetto') || html.getAttribute('data-theme') || '';
    if (a === 'scuro' || a === 'dark' || html.classList.contains('dark')) return true;
    if (a === 'chiaro' || a === 'light') return false;
    return !!(window.matchMedia && matchMediaVero('(prefers-color-scheme: dark)').matches);
  }
  function matchMediaVero(q) { return (typeof mmVero === 'function' ? mmVero : window.matchMedia.bind(window))(q); }

  function tessera(k, v, testo, ic, larga) {
    return '<button type="button" class="tessera' + (larga ? ' larga' : '') + '" data-k="' + k + '"' + (v != null ? ' data-v="' + v + '"' : '') + ' aria-pressed="false">' + icona(ic) + '<span>' + esc(testo) + '</span></button>';
  }
  function passi(k) {
    var t = T();
    var id = 'tp-acc-p-' + k;
    return '<div class="passi"><span class="passi-nome" id="' + id + '">' + esc(t.passi[k]) + '</span>' +
      '<button type="button" data-meno="' + k + '" aria-label="' + esc(t.meno + ': ' + t.passi[k]) + '">' + icona('meno') + '</button>' +
      '<output data-val="' + k + '" aria-labelledby="' + id + '" aria-live="polite"></output>' +
      '<button type="button" data-piu="' + k + '" aria-label="' + esc(t.piu + ': ' + t.passi[k]) + '">' + icona('piu') + '</button></div>';
  }
  function colori(k) {
    var t = T();
    var id = 'tp-acc-c-' + k;
    var h = '<div class="colori" role="group" aria-labelledby="' + id + '"><h4 id="' + id + '">' + esc(t[k]) + '</h4><div class="campioni">';
    COLORI.forEach(function (c, i) { h += '<button type="button" class="campione" data-k="' + k + '" data-v="' + c + '" aria-pressed="false" aria-label="' + esc(t.nomiColori[i]) + '" title="' + esc(t.nomiColori[i]) + '" style="background:' + c + '"></button>'; });
    return h + '<button type="button" class="campione nessuno" data-k="' + k + '" data-v="" aria-pressed="false">' + esc(t.comeIlSito) + '</button></div></div>';
  }

  function disegnaPannello() {
    var t = T();
    var h = '<div class="testa"><div class="riga-titolo"><h2 class="titolo" id="tp-acc-titolo" tabindex="-1">' + esc(t.titolo) + '<span class="sole" aria-hidden="true"></span></h2>' +
      '<button type="button" class="chiudi" data-azione="chiudi" aria-label="' + esc(t.chiudi) + '">' + icona('chiudi') + '</button></div>' +
      '<p class="sotto">' + esc(t.sotto) + '</p><div class="azioni-testa">' +
      '<button type="button" data-azione="ripristina">' + icona('ripristina') + esc(t.ripristina) + '</button>' +
      (CONF.dichiarazione ? '<a href="' + esc(CONF.dichiarazione) + '">' + icona('documento') + esc(t.dichiarazione) + '</a>' : '') +
      '<button type="button" data-azione="nascondi">' + icona('nascondi') + esc(t.nascondi) + '</button>' +
      '<button type="button" data-azione="lingua" lang="' + (lingua === 'it' ? 'en' : 'it') + '">' + icona('lingua') + esc(t.altraLingua) + '</button>' +
      '</div></div><div class="corpo">';

    h += '<section aria-labelledby="tp-acc-s1"><h3 id="tp-acc-s1">' + esc(t.sezProfili) + '</h3>';
    Object.keys(PROFILI).forEach(function (p) {
      h += '<button type="button" class="profilo" role="switch" aria-checked="false" data-p="' + p + '"><span class="p-testo"><span class="p-nome">' + esc(t.profili[p][0]) + '</span><span class="p-desc">' + esc(t.profili[p][1]) + '</span></span>' +
        '<span class="p-sw" aria-hidden="true"><span>' + esc(t.no) + '</span><span>' + esc(t.si) + '</span></span></button>';
    });
    h += '</section>';

    h += '<section aria-labelledby="tp-acc-s2"><h3 id="tp-acc-s2">' + esc(t.sezTesto) + '</h3>' +
      passi('testo') + passi('scala') + passi('interlinea') + passi('lettere') + passi('parole') +
      '<div class="griglia" style="margin-top:0.8rem">' + tessera('carattere', null, t.carattere, 'carattere') + tessera('titoli', null, t.titoli, 'titoli') +
      tessera('link', null, t.link, 'link') + tessera('lente', null, t.lente, 'lente') + '</div>' +
      '<h4 id="tp-acc-al">' + esc(t.allinea) + '</h4><div class="fila" role="group" aria-labelledby="tp-acc-al">';
    ['', 'left', 'center', 'right'].forEach(function (v) { h += '<button type="button" data-k="allinea" data-v="' + v + '" aria-pressed="false">' + icona(v || 'come') + esc(t.allinee[v]) + '</button>'; });
    h += '</div></section>';

    h += '<section aria-labelledby="tp-acc-s3"><h3 id="tp-acc-s3">' + esc(t.sezColori) + '</h3>' +
      '<h4 id="tp-acc-co">' + esc(t.contrasto) + '</h4><div class="griglia due" role="group" aria-labelledby="tp-acc-co">' +
      tessera('contrasto', '', t.comeIlSito, 'ripristina') + tessera('contrasto', 'scuro', t.contrasti.scuro, 'scuro') + tessera('contrasto', 'chiaro', t.contrasti.chiaro, 'chiaro') + tessera('contrasto', 'elevato', t.contrasti.elevato, 'elevato') + '</div>' +
      '<h4 id="tp-acc-sa">' + esc(t.saturazione) + '</h4><div class="griglia due" role="group" aria-labelledby="tp-acc-sa">' +
      tessera('saturazione', '', t.comeIlSito, 'ripristina') + tessera('saturazione', 'alta', t.saturazioni.alta, 'alta') + tessera('saturazione', 'bassa', t.saturazioni.bassa, 'bassa') + tessera('saturazione', 'mono', t.saturazioni.mono, 'mono') + '</div>' +
      colori('coloreTesto') + colori('coloreTitoli') + colori('coloreSfondo') + '</section>';

    h += '<section aria-labelledby="tp-acc-s4"><h3 id="tp-acc-s4">' + esc(t.sezOrientarsi) + '</h3><div class="griglia">' +
      tessera('fermo', null, t.fermo, 'fermo') + tessera('muto', null, t.muto, 'muto') + tessera('immagini', null, t.immagini, 'immagini') +
      tessera('guida', null, t.guida, 'guida') + tessera('maschera', null, t.maschera, 'maschera') + tessera('passaggio', null, t.passaggio, 'passaggio') +
      tessera('fuoco', null, t.fuoco, 'fuoco') + tessera('voce', null, t.voce, 'voce') + '</div>' +
      '<h4 id="tp-acc-cu">' + esc(t.cursore) + '</h4><div class="fila tre" role="group" aria-labelledby="tp-acc-cu">' +
      '<button type="button" data-k="cursore" data-v="" aria-pressed="false">' + icona('passaggio') + esc(t.allinee['']) + '</button>' +
      '<button type="button" data-k="cursore" data-v="nero" aria-pressed="false">' + icona('nero') + esc(t.cursori.nero) + '</button>' +
      '<button type="button" data-k="cursore" data-v="bianco" aria-pressed="false">' + icona('bianco') + esc(t.cursori.bianco) + '</button></div>' +
      '<button type="button" class="azione" data-azione="lettura">' + icona('lettura') + esc(t.modoLettura) + '</button>' +
      '<button type="button" class="azione" data-azione="leggi">' + icona('voce') + '<span>' + esc(t.leggiPagina) + '</span></button>' +
      '</section>';

    h += '<section aria-labelledby="tp-acc-s5"><h3 id="tp-acc-s5"><label for="tp-acc-vai">' + esc(t.sezVai) + '</label></h3><select class="vai" id="tp-acc-vai"></select></section>';

    h += '<div class="piede"><p>' + (CONF.contatto ? esc(t.nota) + '<a href="mailto:' + esc(CONF.contatto) + '">' + esc(CONF.contatto) + '</a>.' : esc(t.notaSenza)) + '</p>' +
      '<p>' + esc(t.scorciatoia) + '</p><p>Tutti Tool · Tutti prompti</p></div></div>';

    pannello.innerHTML = h;
    pannello.setAttribute('aria-label', t.titolo);
    bottone.setAttribute('aria-label', t.apri);
    bottone.title = t.apri;
    lettura.querySelector('.lettura-barra button').lastChild.textContent = t.chiudiLettura;
    aggiornaPannello();
  }

  function valorePasso(k, i) {
    var t = T();
    if (!i) return t.comeIlSito;
    if (k === 'testo' || k === 'scala') return '+' + Math.round((LIVELLI[k][i] - 1) * 100) + '%';
    return t.livelli[i];
  }

  function aggiornaPannello() {
    if (!pannello) return;
    pannello.querySelectorAll('[data-p]').forEach(function (b) { b.setAttribute('aria-checked', stato.profili[b.getAttribute('data-p')] ? 'true' : 'false'); });
    pannello.querySelectorAll('[data-k]').forEach(function (b) {
      var k = b.getAttribute('data-k');
      var on = b.hasAttribute('data-v') ? String(eff[k]) === b.getAttribute('data-v') : !!eff[k];
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    Object.keys(LIVELLI).forEach(function (k) {
      var o = pannello.querySelector('[data-val="' + k + '"]');
      if (!o) return;
      o.textContent = valorePasso(k, eff[k]);
      o.classList.toggle('cambiato', eff[k] > 0);
      pannello.querySelector('[data-meno="' + k + '"]').disabled = eff[k] <= 0;
      pannello.querySelector('[data-piu="' + k + '"]').disabled = eff[k] >= LIVELLI[k].length - 1;
    });
    var leggi = pannello.querySelector('[data-azione="leggi"] span');
    if (leggi) leggi.textContent = inLettura ? T().fermaLettura : T().leggiPagina;
  }

  function annuncia(testo, visibile) {
    if (!vivo) return;
    vivo.textContent = '';
    setTimeout(function () { vivo.textContent = testo; }, 30);
    if (visibile) {
      avviso.textContent = testo;
      avviso.classList.add('visto');
      clearTimeout(annuncia.t);
      annuncia.t = setTimeout(function () { avviso.classList.remove('visto'); }, 4200);
    }
  }
  function conta(dati) { try { if (window.umami && typeof window.umami.track === 'function') window.umami.track('accessibilita', dati); } catch (e) { /* niente statistiche */ } }

  function nomeControllo(b) {
    var t = T();
    if (b.hasAttribute('data-p')) return t.profili[b.getAttribute('data-p')][0];
    var s = b.querySelector('span');
    return (s ? s.textContent : b.getAttribute('aria-label')) || '';
  }

  function cambia(k, v) {
    stato.manuale[k] = v;
    if (v === BASE[k] && !Object.keys(PROFILI).some(function (p) { return stato.profili[p] && Object.prototype.hasOwnProperty.call(PROFILI[p], k); })) delete stato.manuale[k];
    applica(true);
  }

  function clic(ev) {
    var b = ev.target.closest('button, [data-azione]');
    if (!b || !pannello.contains(b)) return;
    var t = T();
    if (b.hasAttribute('data-p')) {
      var p = b.getAttribute('data-p');
      stato.profili[p] = !stato.profili[p];
      if (!stato.profili[p]) delete stato.profili[p];
      else Object.keys(PROFILI[p]).forEach(function (k) { delete stato.manuale[k]; });
      applica(true);
      annuncia(nomeControllo(b) + ': ' + (stato.profili[p] ? t.attivo : t.spento));
      conta({ profilo: p, acceso: !!stato.profili[p] });
      return;
    }
    if (b.hasAttribute('data-k')) {
      var k = b.getAttribute('data-k');
      var v;
      if (b.hasAttribute('data-v')) { v = b.getAttribute('data-v'); if (v !== '' && String(eff[k]) === v && k !== 'allinea' && k !== 'cursore') v = ''; }
      else v = !eff[k];
      cambia(k, v);
      var ora = b.hasAttribute('data-v') ? String(eff[k]) === b.getAttribute('data-v') : !!eff[k];
      annuncia(nomeControllo(b) + ': ' + (ora ? t.attivo : t.spento));
      conta({ funzione: k + (b.hasAttribute('data-v') && v ? ':' + v : ''), acceso: ora });
      return;
    }
    var passo = b.getAttribute('data-piu') || b.getAttribute('data-meno');
    if (passo) {
      var n = Math.max(0, Math.min(LIVELLI[passo].length - 1, eff[passo] + (b.hasAttribute('data-piu') ? 1 : -1)));
      cambia(passo, n);
      conta({ funzione: passo, livello: n });
      return;
    }
    var azione = b.getAttribute('data-azione');
    if (azione === 'chiudi') chiudiPannello(true);
    else if (azione === 'ripristina') {
      stato = { manuale: {}, profili: {} };
      fermaVoce();
      applica(true);
      annuncia(t.tuttoRipristinato, true);
      conta({ funzione: 'ripristina' });
    } else if (azione === 'nascondi') {
      try { sessionStorage.setItem(CONF.chiave + '-nascosto', '1'); } catch (e) { /* solo per ora */ }
      chiudiPannello(false);
      bottone.hidden = true;
      annuncia(t.nascosto, true);
      conta({ funzione: 'nascondi' });
    } else if (azione === 'lingua') {
      lingua = lingua === 'it' ? 'en' : 'it';
      disegnaPannello();
      riempiVai();
      pannello.querySelector('[data-azione="lingua"]').focus();
    } else if (azione === 'lettura') {
      apriLettura();
      conta({ funzione: 'lettura' });
    } else if (azione === 'leggi') {
      if (inLettura) fermaVoce(); else leggiPagina();
      aggiornaPannello();
      conta({ funzione: 'leggi' });
    }
  }

  function apriPannello() {
    aperto = true;
    w.classList.add('aperto');
    bottone.setAttribute('aria-expanded', 'true');
    riempiVai();
    pannello.querySelector('#tp-acc-titolo').focus();
    conta({ funzione: 'apri' });
  }
  function chiudiPannello(rimettiFuoco) {
    aperto = false;
    w.classList.remove('aperto');
    bottone.setAttribute('aria-expanded', 'false');
    if (rimettiFuoco && !bottone.hidden) bottone.focus();
  }

  /* ---------- 8. Vai a…: titoli e zone della pagina ------------------------- */
  var ZONE = 'header, nav, main, aside, footer, form[aria-label], form[aria-labelledby], section[aria-label], section[aria-labelledby], [role="banner"], [role="navigation"], [role="main"], [role="complementary"], [role="contentinfo"], [role="search"]';
  var SALTI = {
    h: TITOLI,
    z: ZONE,
    f: 'input:not([type="hidden"]), select, textarea, button',
    g: 'img, svg[role="img"], [role="img"], picture, figure, video'
  };
  function visibile(el) {
    if (!el.getClientRects().length) return false;
    var s = getComputedStyle(el);
    return s.visibility !== 'hidden' && s.display !== 'none';
  }
  function testoDi(el, max) {
    var s = (el.getAttribute('aria-label') || el.getAttribute('alt') || el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
    return s.length > max ? s.slice(0, max - 1) + '…' : s;
  }
  function nomeZona(el) {
    var t = T();
    var ruoli = { banner: 'header', navigation: 'nav', main: 'main', complementary: 'aside', contentinfo: 'footer', search: 'search' };
    var r = el.getAttribute('role');
    var tipo = (r && ruoli[r]) || el.tagName.toLowerCase();
    var nome = el.getAttribute('aria-label');
    var per = el.getAttribute('aria-labelledby');
    if (!nome && per) { var l = document.getElementById(per.split(' ')[0]); if (l) nome = testoDi(l, 50); }
    return (t.zone[tipo] || tipo) + (nome ? ': ' + nome : '');
  }
  var perVai = [];
  function riempiVai() {
    var sel = pannello && pannello.querySelector('#tp-acc-vai');
    if (!sel || !document.body) return;
    var t = T();
    perVai = [];
    var h = '<option value="">' + esc(t.vaiScegli) + '</option><optgroup label="' + esc(t.vaiTitoli) + '">';
    [].filter.call(document.body.querySelectorAll(TITOLI), visibile).forEach(function (el) {
      var liv = parseInt((el.tagName.match(/\d/) || [el.getAttribute('aria-level') || 2])[0], 10);
      h += '<option value="' + perVai.length + '">' + ' '.repeat(Math.max(0, liv - 1) * 2) + esc(testoDi(el, 70) || t.senzaNome) + '</option>';
      perVai.push(el);
    });
    h += '</optgroup><optgroup label="' + esc(t.vaiZone) + '">';
    [].filter.call(document.body.querySelectorAll(ZONE), visibile).forEach(function (el) {
      h += '<option value="' + perVai.length + '">' + esc(nomeZona(el)) + '</option>';
      perVai.push(el);
    });
    sel.innerHTML = h + '</optgroup>';
  }
  function vaiA(el) {
    if (!el.matches('a[href], button, input, select, textarea, [tabindex]')) el.setAttribute('tabindex', '-1');
    el.scrollIntoView({ block: 'center', behavior: 'auto' });
    el.focus({ preventScroll: true });
  }

  /* ---------- 9. La tastiera: H, Z, F, G --------------------------------------- */
  var ultimoSalto = null;
  function salta(tipo, indietro) {
    var t = T();
    var lista = [].filter.call(document.body.querySelectorAll(SALTI[tipo]), visibile);
    if (!lista.length) { annuncia(t.nessuno_[tipo], true); return; }
    var rif = document.activeElement && document.activeElement !== document.body ? document.activeElement : (ultimoSalto && document.contains(ultimoSalto) ? ultimoSalto : null);
    var i;
    if (!rif) i = indietro ? lista.length - 1 : 0;
    else {
      var pos = lista.indexOf(rif);
      if (pos >= 0) i = pos + (indietro ? -1 : 1);
      else if (!indietro) {
        i = 0;
        for (var j = 0; j < lista.length; j++) if (rif.compareDocumentPosition(lista[j]) & Node.DOCUMENT_POSITION_FOLLOWING) { i = j; break; }
      } else {
        i = lista.length - 1;
        for (var q = lista.length - 1; q >= 0; q--) if (rif.compareDocumentPosition(lista[q]) & Node.DOCUMENT_POSITION_PRECEDING) { i = q; break; }
      }
    }
    i = (i + lista.length) % lista.length;
    var el = lista[i];
    ultimoSalto = el;
    vaiA(el);
    annuncia(t.tipi[tipo] + ' ' + (i + 1) + ' ' + t.di + ' ' + lista.length + (tipo === 'z' ? ': ' + nomeZona(el) : (testoDi(el, 60) ? ': ' + testoDi(el, 60) : '')), true);
  }
  function tasti(ev) {
    if (ev.altKey && ev.shiftKey && ev.code === 'KeyA') {
      ev.preventDefault();
      bottone.hidden = false;
      try { sessionStorage.removeItem(CONF.chiave + '-nascosto'); } catch (e) { /* niente */ }
      if (aperto) chiudiPannello(true); else apriPannello();
      return;
    }
    if (ev.key === 'Escape') {
      if (lettura.classList.contains('vista')) { chiudiLettura(); return; }
      if (aperto) { chiudiPannello(true); return; }
      if (inLettura) { fermaVoce(); aggiornaPannello(); }
    }
    if (!eff.tastiera || ev.ctrlKey || ev.metaKey || ev.altKey || aperto) return;
    var dentro = ev.composedPath ? ev.composedPath()[0] : ev.target;
    if (dentro && (dentro.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(dentro.tagName))) return;
    var tipo = { KeyH: 'h', KeyZ: 'z', KeyF: 'f', KeyG: 'g' }[ev.code];
    if (!tipo) return;
    ev.preventDefault();
    salta(tipo, ev.shiftKey);
  }

  /* ---------- 10. Guida, fascia, lente -------------------------------------- */
  var yPuntatore = window.innerHeight / 2, puntatoreTarget = null, xPuntatore = 0, rafPuntatore = 0;
  function muovi(ev) {
    var p = ev.touches ? ev.touches[0] : ev;
    if (!p) return;
    yPuntatore = p.clientY; xPuntatore = p.clientX; puntatoreTarget = ev.target;
    if (!rafPuntatore) rafPuntatore = requestAnimationFrame(disegnaStrumenti);
  }
  function disegnaStrumenti() {
    rafPuntatore = 0;
    guida.style.display = eff.guida ? 'block' : 'none';
    if (eff.guida) guida.style.transform = 'translateY(' + yPuntatore + 'px)';
    var alta = 70;
    veloSu.style.display = veloGiu.style.display = eff.maschera ? 'block' : 'none';
    if (eff.maschera) {
      veloSu.style.height = Math.max(0, yPuntatore - alta) + 'px';
      veloGiu.style.height = Math.max(0, window.innerHeight - yPuntatore - alta) + 'px';
    }
    var testo = '';
    if (eff.lente && puntatoreTarget && puntatoreTarget !== ospite && puntatoreTarget.closest && document.body.contains(puntatoreTarget)) {
      var blocco = puntatoreTarget.closest('p, li, h1, h2, h3, h4, h5, h6, a, button, label, td, th, dt, dd, figcaption, blockquote, summary, span, small, strong, em') || puntatoreTarget;
      if (blocco !== document.body) testo = testoDi(blocco, 260);
      if (!testo && puntatoreTarget.alt) testo = puntatoreTarget.alt;
    }
    if (testo) {
      lente.textContent = testo;
      lente.style.display = 'block';
      var r = lente.getBoundingClientRect();
      var x = Math.min(Math.max(8, xPuntatore + 18), window.innerWidth - r.width - 8);
      var y = yPuntatore + 26;
      if (y + r.height > window.innerHeight - 8) y = Math.max(8, yPuntatore - r.height - 20);
      lente.style.left = x + 'px'; lente.style.top = y + 'px';
    } else lente.style.display = 'none';
  }

  /* ---------- 11. La voce --------------------------------------------------- */
  var sintesi = window.speechSynthesis || null;
  var coda = [], leggendo = null, giro = 0, inLettura = false;
  var BLOCCHI = 'h1, h2, h3, h4, h5, h6, p, li, blockquote, figcaption, dt, dd, td, th, summary';
  function voceGiusta() {
    if (!sintesi) return null;
    var pref = lingua === 'en' ? 'en' : 'it';
    var voci = sintesi.getVoices().filter(function (v) { return (v.lang || '').toLowerCase().indexOf(pref) === 0; });
    return voci.filter(function (v) { return /natural|google|online/i.test(v.name); })[0] || voci[0] || null;
  }
  function radiceTesto() { return document.querySelector('main, [role="main"], article') || document.body; }
  function blocchiDa(radiceT) {
    var tutti = [].filter.call(radiceT.querySelectorAll(BLOCCHI), visibile);
    return tutti.filter(function (el) { var su = el.parentElement && el.parentElement.closest(BLOCCHI); return !su || !radiceT.contains(su) || tutti.indexOf(su) < 0; });
  }
  function leggi(blocchi, scorri) {
    fermaVoce();
    if (!sintesi) { annuncia(T().nonVoce, true); return; }
    coda = blocchi.slice();
    if (!coda.length) { annuncia(T().nienteDaLeggere, true); return; }
    inLettura = true;
    prossimo(++giro, scorri);
  }
  function prossimo(g, scorri) {
    if (g !== giro) return;
    if (leggendo) leggendo.classList.remove('tp-acc-legge');
    leggendo = null;
    var b = coda.shift();
    if (!b) { inLettura = false; aggiornaPannello(); return; }
    var testo = testoDi(b, 100000);
    if (!testo) { prossimo(g, scorri); return; }
    leggendo = b;
    b.classList.add('tp-acc-legge');
    if (scorri) b.scrollIntoView({ block: 'center', behavior: 'auto' });
    var u = new SpeechSynthesisUtterance(testo);
    u.lang = lingua === 'en' ? 'en-GB' : 'it-IT';
    var v = voceGiusta(); if (v) u.voice = v;
    u.onend = function () { prossimo(g, scorri); };
    u.onerror = function () { if (g === giro) { coda = []; prossimo(g, scorri); } };
    sintesi.speak(u);
    aggiornaPannello();
  }
  function fermaVoce() {
    giro++;
    coda = [];
    inLettura = false;
    if (sintesi) sintesi.cancel();
    if (leggendo) { leggendo.classList.remove('tp-acc-legge'); leggendo = null; }
  }
  function leggiPagina() {
    var sel = window.getSelection && String(window.getSelection()).trim();
    if (sel) {
      fermaVoce();
      if (!sintesi) { annuncia(T().nonVoce, true); return; }
      var u = new SpeechSynthesisUtterance(sel);
      u.lang = lingua === 'en' ? 'en-GB' : 'it-IT';
      var v = voceGiusta(); if (v) u.voice = v;
      var g = ++giro;
      inLettura = true;
      u.onend = u.onerror = function () { if (g === giro) { inLettura = false; aggiornaPannello(); } };
      sintesi.speak(u);
      return;
    }
    leggi(blocchiDa(radiceTesto()), true);
  }
  function clicPagina(ev) {
    if (!eff.voce || !document.body.contains(ev.target)) return;
    var b = ev.target.closest(BLOCCHI + ', a, button, label');
    if (b) leggi([b], false);
  }

  /* ---------- 12. La modalità lettura --------------------------------------- */
  var fuocoPrima = null;
  function apriLettura() {
    var r = radiceTesto();
    var dove = lettura.querySelector('.lettura-testo');
    dove.innerHTML = '';
    var sel = 'h1, h2, h3, h4, h5, h6, p, li, blockquote, figcaption, dt, dd, img[alt]';
    [].filter.call(r.querySelectorAll(sel), function (el) {
      if (!visibile(el) && el.tagName !== 'IMG') return false;
      if (el.closest('nav, [role="navigation"], [aria-hidden="true"]')) return false;
      var su = el.parentElement && el.parentElement.closest('p, li, blockquote, figcaption, dt, dd');
      return !su || !r.contains(su);
    }).forEach(function (el) {
      var tag = el.tagName.toLowerCase();
      var n;
      if (tag === 'img') {
        if (!el.alt.trim()) return;
        n = document.createElement('p'); n.className = 'alt'; n.textContent = '[' + el.alt.trim() + ']';
      } else {
        n = document.createElement(/^h\d$/.test(tag) ? tag : tag === 'li' ? 'li' : 'p');
        [].forEach.call(el.childNodes, function (c) { copiaTesto(c, n); });
        if (!n.textContent.trim()) return;
      }
      if (tag === 'li') {
        var ul = dove.lastElementChild && dove.lastElementChild.tagName === 'UL' ? dove.lastElementChild : dove.appendChild(document.createElement('ul'));
        ul.appendChild(n);
      } else dove.appendChild(n);
    });
    if (!dove.firstChild) { annuncia(T().nienteDaLeggere, true); return; }
    fuocoPrima = aperto ? pannello.querySelector('[data-azione="lettura"]') : null;
    chiudiPannello(false);
    lettura.classList.add('vista');
    lettura.scrollTop = 0;
    lettura.querySelector('.lettura-barra button').focus();
  }
  function copiaTesto(nodo, dentro) {
    if (nodo.nodeType === 3) { dentro.appendChild(document.createTextNode(nodo.textContent)); return; }
    if (nodo.nodeType !== 1 || nodo instanceof SVGElement || /^(SCRIPT|STYLE|BUTTON|svg)$/i.test(nodo.tagName) || nodo.getAttribute('aria-hidden') === 'true') return;
    if (nodo.tagName === 'A' && nodo.getAttribute('href')) {
      var a = document.createElement('a');
      a.href = nodo.href;
      a.textContent = (nodo.innerText || nodo.textContent).trim();
      dentro.appendChild(a);
      return;
    }
    if (nodo.tagName === 'BR') { dentro.appendChild(document.createElement('br')); return; }
    [].forEach.call(nodo.childNodes, function (c) { copiaTesto(c, dentro); });
  }
  function chiudiLettura() {
    lettura.classList.remove('vista');
    if (fuocoPrima) { apriPannello(); var b = pannello.querySelector('[data-azione="lettura"]'); if (b) b.focus(); }
    else if (!bottone.hidden) bottone.focus();
    fuocoPrima = null;
  }

  /* ---------- 13. Applica tutto --------------------------------------------- */
  var pronto = false;
  function applica(daUtente) {
    eff = calcola();
    if (daUtente) salva();
    scriviFoglio();
    if (!pronto) return;
    if (LIVELLI.scala[eff.scala] > 1) segnaFissi();
    if ((LIVELLI.testo[eff.testo] || 1) !== fattoreAttuale) misuraTesti();
    applicaMuto();
    applicaFermo(daUtente);
    if (!eff.voce && !inLettura && leggendo) fermaVoce();
    disegnaStrumenti();
    aggiornaPannello();
  }

  var attesaMutazioni = 0;
  function dopoMutazioni() {
    clearTimeout(attesaMutazioni);
    attesaMutazioni = setTimeout(function () {
      if (fattoreAttuale !== 1) misuraTesti();
      if (eff.muto) applicaMuto();
      if (LIVELLI.scala[eff.scala] > 1) segnaFissi();
    }, 250);
  }

  function avvia() {
    if (pronto) return;
    ospite = document.createElement('div');
    ospite.id = 'tp-accessibilita';
    // Fuori da <body>: i fogli del sito, lo zoom e il testo ingrandito non lo toccano.
    html.appendChild(ospite);
    radice = ospite.attachShadow({ mode: 'open' });
    radice.innerHTML = '<style>' + CSS_PANNELLO + '</style>' +
      '<div class="w ' + CONF.posizione + '">' +
      '<button type="button" class="apri" aria-expanded="false" aria-controls="tp-acc-pannello">' + icona('accesso') + '</button>' +
      '<div class="pannello" id="tp-acc-pannello" role="dialog" aria-modal="false"></div>' +
      '<div class="guida" aria-hidden="true"></div><div class="velo su" aria-hidden="true"></div><div class="velo giu" aria-hidden="true"></div>' +
      '<div class="lente" aria-hidden="true"></div><div class="avviso" aria-hidden="true"></div><div class="sr" role="status" aria-live="polite"></div>' +
      '<div class="lettura" role="dialog" aria-modal="true" aria-labelledby="tp-acc-lt"><div class="lettura-barra"><span class="sr" id="tp-acc-lt"></span><button type="button">' + icona('chiudi') + '<span></span></button></div><article class="lettura-testo"></article></div>' +
      '</div>';
    w = radice.querySelector('.w');
    if (CONF.accento) w.style.setProperty('--vaniglia', CONF.accento);
    if (CONF.inchiostro) w.style.setProperty('--carbone', CONF.inchiostro);
    if (CONF.carattere) w.style.setProperty('--carattere', CONF.carattere);
    bottone = radice.querySelector('.apri');
    pannello = radice.querySelector('.pannello');
    guida = radice.querySelector('.guida');
    veloSu = radice.querySelector('.velo.su');
    veloGiu = radice.querySelector('.velo.giu');
    lente = radice.querySelector('.lente');
    avviso = radice.querySelector('.avviso');
    vivo = radice.querySelector('[role="status"]');
    lettura = radice.querySelector('.lettura');
    lettura.querySelector('#tp-acc-lt').textContent = TESTI[lingua].modoLettura;
    lettura.querySelector('.lettura-barra button').addEventListener('click', chiudiLettura);

    try { if (sessionStorage.getItem(CONF.chiave + '-nascosto')) bottone.hidden = true; } catch (e) { /* niente */ }
    bottone.addEventListener('click', function () { if (aperto) chiudiPannello(true); else apriPannello(); });
    pannello.addEventListener('click', clic);
    pannello.addEventListener('change', function (ev) {
      if (ev.target.id !== 'tp-acc-vai' || ev.target.value === '') return;
      var el = perVai[+ev.target.value];
      ev.target.value = '';
      if (!el) return;
      chiudiPannello(false);
      vaiA(el);
    });
    disegnaPannello();

    function tema() { w.classList.toggle('scuro', temaScuro()); }
    tema();
    new MutationObserver(tema).observe(html, { attributes: true, attributeFilter: ['data-aspetto', 'data-theme', 'class'] });
    if (window.matchMedia) { var mq = matchMediaVero('(prefers-color-scheme: dark)'); if (mq.addEventListener) mq.addEventListener('change', tema); }

    document.addEventListener('keydown', tasti, true);
    window.addEventListener('pointermove', muovi, { passive: true });
    window.addEventListener('touchmove', muovi, { passive: true });
    document.addEventListener('click', clicPagina, true);
    var attesaMisura = 0;
    window.addEventListener('resize', function () {
      clearTimeout(attesaMisura);
      attesaMisura = setTimeout(function () { if (fattoreAttuale !== 1) misuraTesti(); disegnaStrumenti(); }, 250);
    });
    new MutationObserver(dopoMutazioni).observe(document.body, { childList: true, subtree: true });
    if (sintesi && sintesi.addEventListener) sintesi.addEventListener('voiceschanged', function () { /* le voci arrivano dopo: voceGiusta le rilegge */ });

    pronto = true;
    fattoreAttuale = 1;
    applica(false);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', avvia);
  else avvia();
})();
