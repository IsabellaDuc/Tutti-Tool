---
name: tutti-tool
description: Installa Tutti Tool, il pannello di accessibilità gratuito di Tutti prompti, su un sito web e controlla l'accessibilità vera del sito (WCAG 2.2 AA), con un resoconto di cosa correggere. Usala quando qualcuno chiede di installare Tutti Tool, di aggiungere un pannello o un widget di accessibilità a un sito, di rendere un sito più accessibile, o di controllarne l'accessibilità. Installs Tutti Tool, a free accessibility panel, on a website and audits the site's real accessibility (WCAG 2.2 AA); use it for "install Tutti Tool", "add an accessibility widget/panel/overlay", "make this site accessible", "accessibility check".
---

# Tutti Tool: installare il pannello e controllare il sito

Tutti Tool è un solo file JavaScript (https://github.com/IsabellaDuc/Tutti-Tool, licenza MIT). Aggiunge a un sito un bottone e un pannello con cui chi visita adatta la pagina: testo, spazi, contrasto, colori, animazioni, lettura ad alta voce. Aiuta chi legge, ma **non rende il sito conforme** alle norme: per questo il lavoro ha due parti, installare il pannello e controllare il sito. **Tutte e due fanno parte del lavoro, sempre**: non chiedere se fare il controllo, fallo.

Accanto a questo file c'è `prova-pannello.mjs`, uno script senza librerie (serve Node 22 o più recente) che prova il pannello in un browser senza finestra e calcola i contrasti. Si usa ai punti 3, 5 e 6.

Rispondi nella lingua di chi ti scrive, in modo semplice: chi ti scrive potrebbe non essere del mestiere, quindi spiega i termini tecnici la prima volta e non dare per scontato niente. Lavora sui file del sito, ma **non pubblicare, non fare deploy e non fare push** senza un sì esplicito di chi ti ha chiesto il lavoro. Di ogni file che crei o cambi di' il percorso. Non chiedere mai password o accessi.

## 0. Prima di tutto: puoi toccare i file del sito?

1. **Sì** (sei in un editor o in un terminale, nella cartella del sito): segui i punti da 1 a 8.
2. **No** (sei in una chat, e il sito sta altrove: WordPress, Wix, Squarespace, Shopify, un'agenzia che lo gestisce): non inventare file e non fingere di installare niente. Segui [guida-chat.md](guida-chat.md), accanto a questo file: fai due o tre domande, scegli la strada (il plugin per WordPress, una riga da incollare, un'email per chi gestisce il sito) e accompagna la persona un passo alla volta.

## 1. Guarda il sito prima di toccarlo

1. Come è fatto: HTML statico, un generatore (Jekyll, Hugo, Eleventy, Astro…), un framework (Next.js, Nuxt, SvelteKit, React con Vite…), un CMS (WordPress…). Trova il punto da cui passa la `<head>` di tutte le pagine: un layout, un template, oppure pagina per pagina.
2. Dove stanno i file serviti così come sono: la radice del sito, `public/`, `static/`, `assets/`.
3. Se c'è già un pannello di accessibilità (accessiBe, AccessiWay, UserWay, EqualWeb e simili): fermati e chiedi. Due pannelli insieme si pestano i piedi.
4. Palette e caratteri: il colore del testo, i colori chiari del marchio, il carattere del testo (e se è caricato in tutte le pagine).
5. Cosa occupa l'angolo in basso a destra: chat, cookie, «torna su». In quel caso il pannello va a sinistra.
6. Lingua delle pagine (`<html lang>`), email pubblica di contatto, pagina privacy, dichiarazione di accessibilità, statistiche (Umami, Google Analytics, altro).
7. Se il sito è in git, controlla lo stato e proponi di lavorare su un ramo nuovo.

## 2. Scarica il pannello

Scarica https://raw.githubusercontent.com/IsabellaDuc/Tutti-Tool/main/tutti-tool.js nella cartella dei file statici, per esempio `js/tutti-tool.js` o `public/js/tutti-tool.js`. Se quell'indirizzo non risponde, usa la copia su https://cdn.jsdelivr.net/gh/IsabellaDuc/Tutti-Tool@main/tutti-tool.js. Non modificare il file: si adatta con gli attributi. Se non riesci a scaricarlo da nessuno dei due, non scriverlo a mano e non aggiungere le righe: dillo, proponi gli attributi, e fai comunque il controllo di accessibilità del punto 6, che non ha bisogno del file.

## 3. Scegli gli attributi

Tutti facoltativi; i nomi sono in italiano.

1. `data-lingua`: `it` o `en`. Se manca segue `<html lang>`; mettilo solo se serve.
2. `data-posizione`: `destra` (predefinito) o `sinistra`.
3. `data-contatto`: l'email per le segnalazioni. Usa quella pubblica del sito; se non c'è, chiedila.
4. `data-dichiarazione`: l'indirizzo della dichiarazione di accessibilità, solo se esiste.
5. `data-accento`: un colore **chiaro** della palette del sito (un pastello, un color crema, un grigio chiaro), per il bottone e le scelte accese (predefinito `#F4EEA9`). Non il colore forte del marchio: un arancione, un rosso o un blu pieni non vanno bene. Se la palette non ha un colore chiaro, lascia il predefinito.
6. `data-inchiostro`: il colore **scuro** del testo del sito, per testo, contorni e testata del pannello (predefinito `#1C1D21`). Inchiostro su bianco e inchiostro su accento devono arrivare almeno a 4,5:1. **Calcola i contrasti, non stimarli**: `node <cartella di questa skill>/prova-pannello.mjs --contrasto "#1C1D21" "#F4EEA9"`. Se non ci arrivi, lascia i predefiniti.
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
5. WordPress: usa il plugin del repository, https://github.com/IsabellaDuc/Tutti-Tool/raw/main/wordpress/tutti-tool.zip (Plugin → Aggiungi nuovo → Carica plugin, oppure `wp plugin install <zip> --activate`), e scegli gli attributi in Impostazioni → Tutti Tool. Non toccare il tema.

## 5. Verifica l'installazione

1. Ogni pagina carica il file una volta sola e il percorso porta a un file che esiste.
2. **Prova le pagine nel browser**, con lo script accanto a questa skill:

   ```bash
   node <cartella di questa skill>/prova-pannello.mjs <cartella del sito>
   node <cartella di questa skill>/prova-pannello.mjs http://localhost:5173/
   ```

   La prima forma serve i file della cartella e prova tutte le pagine `.html`. La seconda prova un server già avviato, per esempio quello di sviluppo del progetto (Vite, Next.js, un generatore): usala quando le pagine si costruiscono, dopo aver avviato il server. Lo script cerca da solo Chrome, Edge o Chromium e controlla che il pannello si carichi una volta, che la riga sia nella testa prima degli altri script, che il bottone si veda e non sia coperto, che il clic, Alt + Maiusc + A ed Esc aprano e chiudano il pannello, che una scelta valga anche nelle altre pagine, i contrasti dei colori scelti e gli errori in console. Se una prova dice «NO», correggi l'installazione e rifalla. Se lo script avvisa di aver bloccato file esterni che non rispondevano, scrivilo nel resoconto.
3. Se lo script non trova un browser, guarda se nel progetto ci sono Playwright o Puppeteer e usali; se non c'è niente, dillo nel resoconto e verifica leggendo il codice. Non scrivere che il pannello funziona se non l'hai visto funzionare.

## 6. Controlla l'accessibilità del sito

Il pannello non corregge i problemi del sito. Controlla il sito rispetto alle WCAG 2.2, livello AA, leggendo HTML, CSS e JavaScript (e, se puoi, le pagine aperte nel browser). Il controllo va fatto **per intero, su tutti i punti qui sotto e su tutte le pagine**: non una scansione rapida, e senza chiedere prima se farlo.

1. `<html lang>` presente e giusto; titoli delle pagine diversi tra loro.
2. Immagini con `alt` sensato; `alt=""` per quelle decorative; icone e SVG con un nome se sono l'unico contenuto di un link o di un bottone.
3. Contrasti: testo normale 4,5:1, testo grande 3:1, contorni di campi e bottoni 3:1. Calcolali dai colori del CSS con `prova-pannello.mjs --contrasto "<testo>" "<sfondo>"`, non a occhio (accetta anche `rgb()` e `rgba()`: un testo semitrasparente si calcola posato sul suo sfondo), anche negli stati hover e focus e nel tema scuro se c'è.
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

Fai un resoconto con un elenco numerato, dal problema più grave al più leggero. Per ciascuno: dove (file e riga), chi ne ha danno, come si corregge. Poi, in breve, i punti che passano e quelli che non hai potuto verificare, con il motivo. **Non correggere niente prima del sì**; poi correggi solo quello che è stato approvato.

## 7. Privacy

Il pannello non usa cookie e non manda dati: salva le scelte nel `localStorage` di chi visita. Se c'è Umami registra quali funzioni si usano (evento `accessibilita`). Se il sito ha una pagina privacy, proponi una frase da aggiungere; la decisione è di chi gestisce il sito.

## 8. Resoconto finale

1. Dove hai messo il file e in quali pagine o layout hai aggiunto la riga.
2. Gli attributi scelti e perché (colori con i loro contrasti).
3. Cosa hai provato nel browser e con quale esito (le righe «ok» e «NO» di `prova-pannello.mjs`), oppure perché non hai potuto; poi come provarlo: il bottone nell'angolo, Alt + Maiusc + A.
4. Il resoconto dell'accessibilità del sito e cosa aspetta un sì.
5. Un promemoria: con il pannello il sito diventa più comodo da leggere, non «conforme». Non scriverlo nella dichiarazione di accessibilità né altrove.
