---
name: tutti-tool
description: Installa Tutti Tool, il pannello di accessibilità gratuito di Tutti prompti, su un sito web e controlla l'accessibilità vera del sito (WCAG 2.2 AA), con un resoconto di cosa correggere. Usala quando qualcuno chiede di installare Tutti Tool, di aggiungere un pannello o un widget di accessibilità a un sito, di rendere un sito più accessibile, o di controllarne l'accessibilità. Installs Tutti Tool, a free accessibility panel, on a website and audits the site's real accessibility (WCAG 2.2 AA); use it for "install Tutti Tool", "add an accessibility widget/panel/overlay", "make this site accessible", "accessibility check".
---

# Tutti Tool: installare il pannello e controllare il sito

Tutti Tool è un solo file JavaScript (https://github.com/IsabellaDuc/Tutti-Tool, licenza MIT). Aggiunge a un sito un bottone e un pannello con cui chi visita adatta la pagina: testo, spazi, contrasto, colori, animazioni, lettura ad alta voce. Aiuta chi legge, ma **non rende il sito conforme** alle norme: per questo il lavoro ha due parti, installare il pannello e controllare il sito.

Rispondi nella lingua di chi ti scrive. Lavora sui file del sito, ma **non pubblicare, non fare deploy e non fare push** senza un sì esplicito di chi ti ha chiesto il lavoro. Di ogni file che crei o cambi di' il percorso.

## 1. Guarda il sito prima di toccarlo

1. Come è fatto: HTML statico, un generatore (Jekyll, Hugo, Eleventy, Astro…), un framework (Next.js, Nuxt, SvelteKit, React con Vite…), un CMS (WordPress…). Trova il punto da cui passa la `<head>` di tutte le pagine: un layout, un template, oppure pagina per pagina.
2. Dove stanno i file serviti così come sono: la radice del sito, `public/`, `static/`, `assets/`.
3. Se c'è già un pannello di accessibilità (accessiBe, AccessiWay, UserWay, EqualWeb e simili): fermati e chiedi. Due pannelli insieme si pestano i piedi.
4. Palette e caratteri: il colore del testo, i colori chiari del marchio, il carattere del testo (e se è caricato in tutte le pagine).
5. Cosa occupa l'angolo in basso a destra: chat, cookie, «torna su». In quel caso il pannello va a sinistra.
6. Lingua delle pagine (`<html lang>`), email pubblica di contatto, pagina privacy, dichiarazione di accessibilità, statistiche (Umami, Google Analytics, altro).
7. Se il sito è in git, controlla lo stato e proponi di lavorare su un ramo nuovo.

## 2. Scarica il pannello

Scarica https://raw.githubusercontent.com/IsabellaDuc/Tutti-Tool/main/tutti-tool.js nella cartella dei file statici, per esempio `js/tutti-tool.js` o `public/js/tutti-tool.js`. Non modificare il file: si adatta con gli attributi.

## 3. Scegli gli attributi

Tutti facoltativi; i nomi sono in italiano.

1. `data-lingua`: `it` o `en`. Se manca segue `<html lang>`; mettilo solo se serve.
2. `data-posizione`: `destra` (predefinito) o `sinistra`.
3. `data-contatto`: l'email per le segnalazioni. Usa quella pubblica del sito; se non c'è, chiedila.
4. `data-dichiarazione`: l'indirizzo della dichiarazione di accessibilità, solo se esiste.
5. `data-accento`: un colore **chiaro** della palette del sito, per il bottone e le scelte accese (predefinito `#F4EEA9`).
6. `data-inchiostro`: il colore **scuro** del testo del sito, per testo, contorni e testata del pannello (predefinito `#1C1D21`). Controlla i contrasti: inchiostro su bianco e inchiostro su accento almeno 4,5:1. Se non ci arrivi, lascia i predefiniti.
7. `data-carattere`: la famiglia del testo del sito, solo se è caricata in tutte le pagine (per esempio `'"Lato", sans-serif'`).
8. `data-chiave` e `data-movimento` di solito non servono.

## 4. Installa

Aggiungi una riga nella `<head>` di ogni pagina, **il più in alto possibile e prima degli altri script**, senza `defer` e senza `async`: deve partire prima degli altri script perché «Ferma le animazioni» valga anche per loro.

```html
<script src="/js/tutti-tool.js" data-posizione="destra" data-contatto="info@esempio.it"></script>
```

1. HTML statico: in ogni pagina, con il percorso giusto per la profondità della cartella (`js/…`, `../js/…`) oppure dalla radice (`/js/…`) se il sito sta alla radice del dominio.
2. Generatori: nel layout di base.
3. Next.js: il file in `public/js/`, la riga in `app/layout` (o `pages/_document`) come `<script>` normale nella `<head>`, oppure con `next/script` e `strategy="beforeInteractive"`.
4. Altri framework: nel file HTML di partenza (`index.html`, `app.html`) o nel layout principale.
5. WordPress: con `wp_enqueue_script` in un tema figlio o in un piccolo plugin, nella testa (non nel piè di pagina), passando gli attributi con il filtro `script_loader_tag`. Mai nel tema principale.

## 5. Verifica l'installazione

1. Ogni pagina carica il file una volta sola e il percorso porta a un file che esiste.
2. Se puoi aprire le pagine in un browser (anche senza finestra) o con il server di sviluppo del progetto: nessun errore in console, il bottone c'è, il pannello si apre e si chiude (anche con Alt + Maiusc + A ed Esc), una scelta fatta in una pagina vale anche nelle altre.
3. Se non puoi aprire un browser, dillo e verifica leggendo il codice.

## 6. Controlla l'accessibilità del sito

Il pannello non corregge i problemi del sito. Controlla il sito rispetto alle WCAG 2.2, livello AA, leggendo HTML e CSS (e, se puoi, le pagine aperte nel browser):

1. `<html lang>` presente e giusto; titoli delle pagine diversi tra loro.
2. Immagini con `alt` sensato; `alt=""` per quelle decorative; icone e SVG con un nome se sono l'unico contenuto di un link o di un bottone.
3. Contrasti: testo normale 4,5:1, testo grande 3:1, contorni di campi e bottoni 3:1. Calcolali dai colori del CSS, anche negli stati hover e focus e nel tema scuro se c'è.
4. Titoli: un `h1` per pagina, livelli senza salti.
5. Zone: `header`, `nav`, `main`, `footer`; un link «vai al contenuto» all'inizio.
6. Link che si capiscono da soli (niente «clicca qui»); i link che aprono una nuova scheda lo dicono.
7. Moduli: ogni campo ha la sua etichetta, gli errori si leggono e dicono come correggere, `autocomplete` sui dati personali.
8. Tastiera: tutto quello che si clicca si raggiunge col tasto Tab, nell'ordine giusto; il focus si vede (nessun `outline: none` senza sostituto); niente `div` cliccabili senza ruolo e tasti; nessuna trappola.
9. Movimento: `prefers-reduced-motion` rispettato; niente che lampeggia più di tre volte al secondo; ciò che parte da solo si può fermare.
10. Zoom e riflusso: niente `user-scalable=no` o `maximum-scale` nel viewport; a 320 px di larghezza nessuno scorrimento orizzontale; con le spaziature del criterio 1.4.12 il testo non si taglia.
11. Bersagli: bottoni e link piccoli almeno 24 × 24 px o ben distanziati.
12. Video con sottotitoli, audio con trascrizione.
13. ARIA: niente ruoli o attributi sbagliati, niente `aria-hidden` su elementi che ricevono il focus.

Fai un resoconto con un elenco numerato, dal problema più grave al più leggero. Per ciascuno: dove (file e riga), chi ne ha danno, come si corregge. **Non correggere niente prima del sì**; poi correggi solo quello che è stato approvato.

## 7. Privacy

Il pannello non usa cookie e non manda dati: salva le scelte nel `localStorage` di chi visita. Se c'è Umami registra quali funzioni si usano (evento `accessibilita`). Se il sito ha una pagina privacy, proponi una frase da aggiungere; la decisione è di chi gestisce il sito.

## 8. Resoconto finale

1. Dove hai messo il file e in quali pagine o layout hai aggiunto la riga.
2. Gli attributi scelti e perché (colori con i loro contrasti).
3. Come provarlo: il bottone nell'angolo, Alt + Maiusc + A.
4. Il resoconto dell'accessibilità del sito e cosa aspetta un sì.
5. Un promemoria: con il pannello il sito diventa più comodo da leggere, non «conforme». Non scriverlo nella dichiarazione di accessibilità né altrove.
