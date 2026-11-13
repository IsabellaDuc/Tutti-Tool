# I prompt per installare Tutti widget

Due prompt, per due situazioni. [English version](PROMPT.en.md).

1. **[Per la chat](#1-per-la-chat)**: per chi usa un'intelligenza artificiale nel browser (ChatGPT, Claude, Gemini, Copilot) e non è del mestiere. L'assistente ti fa due o tre domande, capisce com'è fatto il tuo sito e ti accompagna un passo alla volta: il plugin per WordPress, la riga da incollare su Wix o Squarespace, oppure l'email per chi ti gestisce il sito.
2. **[Per un assistente che lavora sui file del sito](#2-per-un-assistente-che-lavora-sui-file-del-sito)**: per chi ha i file del sito sul computer e usa un assistente che li può modificare (Claude Code, Cursor, Copilot nell'editor). Installa il pannello, lo prova e controlla l'accessibilità del sito.

Come si usa: clicca sul simbolo «copia» in alto a destra del riquadro, apri una chat nuova, incolla e invia.

## 1. Per la chat

```text
Aiutami a mettere Tutti widget sul mio sito. Non sono del mestiere: guidami tu,
un passo alla volta.

Tutti widget è un pannello di accessibilità gratuito
(https://github.com/IsabellaDuc/Tutti-widget): sul sito compare un bottone
rotondo in un angolo in basso, e chi visita regola testo, colori e animazioni.
Aiuta chi legge, ma non rende il sito "conforme" alle norme
sull'accessibilità: non dirlo e non scriverlo mai.

COME PARLARMI
- Nel primo messaggio dimmi il piano in una frase: faremo tre cose (mettere il
  pannello, controllare che funzioni, capire cosa migliorare nel sito), in
  tutto una ventina di minuti. Poi fammi la prima domanda.
- Messaggi brevi. Un passo alla volta: dopo ogni passo fermati e aspetta che
  ti dica "fatto" o che ti descriva cosa vedo.
- Parole semplici. Se ti serve un termine tecnico, spiegalo in una frase la
  prima volta. Non dare per scontato se sono uomo o donna.
- Dimmi dove cliccare con i nomi dei menu come li vedo io. Se non sei sicuro di
  come si chiama un menu, dillo e chiedimi di descriverti cosa vedo. Se non
  trovo un bottone, prima aiutami a cercarlo (in alto, accanto al titolo, in
  un menu "Avanzate"); solo dopo concludi che non c'è.
- Tutto quello che devo copiare (la riga di codice, un'email, una frase) dammelo
  in un riquadro a parte, in testo semplice: niente asterischi, grassetti o
  altri simboli, perché li incollerei così come sono. Le email tienile corte.
- Non chiedermi mai password, codici o accessi, e non chiedermi di incollarli
  qui.
- Se qualcosa va storto, dimmi con calma come tornare com'era prima.

1. PRIMA LE DOMANDE, una per volta, al massimo tre:
   a. l'indirizzo del sito;
   b. chi lo gestisce: io, oppure una persona o un'agenzia esterna;
   c. con cosa è fatto. Se non lo so: se puoi aprire l'indirizzo, scoprilo tu;
      altrimenti chiedimi da dove entro per modificarlo (se l'indirizzo
      contiene "wp-admin" è WordPress; se entro da wix.com, squarespace.com,
      webflow.com o shopify.com è quella piattaforma).

2. POI SCEGLI LA STRADA e dimmela in una frase.

   A. WordPress e posso entrare nella bacheca: il plugin gratuito.
      Guidami così: scarica
      https://github.com/IsabellaDuc/Tutti-widget/raw/main/wordpress/tutti-widget.zip
      senza aprirlo; nella bacheca Plugin > Aggiungi nuovo > Carica plugin >
      Scegli file > Installa ora > Attiva; poi Impostazioni > Tutti widget:
      angolo del bottone, email per le segnalazioni, colori solo se li voglio.
      Salva. "Carica plugin" è un bottone in alto, accanto al titolo "Aggiungi
      plugin": se proprio non c'è, il mio piano non permette plugin (succede
      su WordPress.com), e si passa alla strada C. Se nella lista dei plugin
      c'è un plugin di cache (WP Super Cache, W3 Total Cache, WP Rocket,
      LiteSpeed…), Tutti widget prova a svuotarla da solo; se il bottone non
      compare, guidami a svuotarla a mano.

   B. Wix, Squarespace, Webflow, Shopify o un altro servizio con un campo per
      il codice personalizzato nella testa (head) delle pagine: una riga da
      incollare, che prepari tu con i miei dati:
      <script src="https://cdn.jsdelivr.net/gh/IsabellaDuc/Tutti-widget@v0.4.0/tutti-widget.js" integrity="sha384-VmNPDQyzdxbkot4eKuRVy/aQ64gJfS1874nnDt7AwlQKXcF/2uhycfaG0ViNZvRP" crossorigin="anonymous" data-posizione="destra" data-contatto="EMAIL"></script>
      Cambia solo data-posizione e data-contatto, mai src e integrity. Dammi
      la riga in un riquadro da copiare, poi guidami a incollarla in un punto
      che valga per tutte le pagine, nella testa:
      - Wix: Impostazioni > Codice personalizzato > Aggiungi codice
        personalizzato, "Tutte le pagine", posizione "Head" (serve un piano
        Premium con dominio collegato);
      - Squarespace: pannello Code Injection, campo Header (piani Core, Plus,
        Advanced);
      - Webflow: Site settings > Custom code > Head code, poi pubblica (piano a
        pagamento);
      - Shopify: Negozio online > Temi > "…" > Duplica (copia di sicurezza),
        poi "…" > Modifica codice > layout/theme.liquid, subito sotto <head>.
      Avvisami che così il file arriva da jsDelivr, un servizio esterno che
      vede l'indirizzo IP di chi visita: va detto nell'informativa privacy.

   C. Il sito lo gestisce qualcun altro, oppure non posso entrare, oppure il
      piano non lo permette: scrivimi un'email breve e cortese per chi lo
      gestisce, da copiare e mandare. Dentro: cosa chiedo e perché, il link
      https://github.com/IsabellaDuc/Tutti-widget, il plugin se è WordPress
      oppure la riga della strada B, l'angolo e l'email che ho scelto, la
      richiesta di dirmi quando è fatto e di segnalarmi anche i problemi di
      accessibilità del sito.

3. LE SCELTE, spiegate semplici:
   - angolo: destra, oppure sinistra se in basso a destra c'è già una chat, un
     bottone di WhatsApp o il "torna su";
   - email per le segnalazioni: una email pubblica del sito (chiedimela);
   - colori: di solito si lasciano come sono. Se li voglio uguali al sito:
     data-accento è un colore chiaro del sito, data-inchiostro il colore del
     testo; calcola il contrasto con la formula WCAG: almeno 4,5:1 tra i due e
     tra l'inchiostro e il bianco, altrimenti lascia i predefiniti.

4. CONTROLLIAMO CHE FUNZIONI: dimmi di aprire il sito in una finestra in
   incognito, cercare il bottone rotondo nell'angolo in basso, aprirlo,
   provare "Testo più grande", chiudere e ricaricare. Se il bottone non c'è,
   le cause più comuni sono: la cache (si svuota dal plugin di cache o
   dall'hosting), il codice messo nel "body" invece che nella "head", il
   piano che non pubblica il codice personalizzato, la pagina non ripubblicata.

5. IL SITO È ACCESSIBILE? Anche se ti dico che è tutto a posto, proponimi
   questo passo (posso dire di no). Spiegami in due frasi che il pannello non
   sistema il sito. Poi, se puoi aprire il mio sito, dimmi i tre-cinque
   problemi più importanti che vedi, in parole semplici e dicendo chi ne ha
   danno.
   Se non puoi, proponimi WAVE (https://wave.webaim.org): scrivo l'indirizzo,
   ti dico cosa vedo e tu me lo spieghi: bastano i numeri e i tre-cinque
   problemi più importanti, senza passare voce per voce se non te lo chiedo.
   Preparami un elenco breve da girare a chi gestisce il sito, senza
   promettere che basta per essere "a norma".

6. ALLA FINE un riepilogo corto: cosa abbiamo fatto, come verificarlo, cosa
   resta da fare e da chi, e se serve la frase per l'informativa privacy.
```

## 2. Per un assistente che lavora sui file del sito

Per un assistente che può leggere e modificare i file del tuo sito, per esempio Claude Code aperto nella cartella del sito. L'assistente installa il pannello, lo prova nel browser, controlla l'accessibilità del sito e ti chiede il permesso prima di correggere qualcosa o di pubblicare.

```text
Installa Tutti widget su questo sito e controllane l'accessibilità.

Tutti widget è un pannello di accessibilità gratuito, un solo file JavaScript:
https://github.com/IsabellaDuc/Tutti-widget (licenza MIT). Aiuta chi legge a
regolare testo, spazi, contrasto, colori e animazioni, ma non rende il sito
conforme alle norme: per questo, oltre a installarlo, controlla il sito. Sono
due parti dello stesso lavoro: falle tutte e due, per intero, senza chiedermi
se fare il controllo.

Regole: rispondimi in italiano, in modo semplice (potrei non essere del
mestiere: spiega i termini tecnici la prima volta). Lavora sui file, ma non
pubblicare, non fare deploy e non fare push senza il mio sì. Dimmi il percorso
di ogni file che crei o cambi. Se il sito è in git, proponimi prima di lavorare
su un ramo nuovo.

1. Guarda il sito prima di toccarlo: com'è fatto (HTML statico, generatore,
   framework, CMS), da dove passa la <head> di tutte le pagine, dove stanno i
   file statici, la palette (colore del testo, colori chiari del marchio), il
   carattere del testo, la lingua, l'email pubblica, la pagina privacy, le
   statistiche, cosa occupa l'angolo in basso a destra. Se c'è già un altro
   pannello di accessibilità (accessiBe, AccessiWay, UserWay…) fermati e
   chiedimi. Se è WordPress, usa il plugin del repository
   (wordpress/tutti-widget.zip) invece di toccare il tema.

2. Scarica
   https://raw.githubusercontent.com/IsabellaDuc/Tutti-widget/main/tutti-widget.js
   nella cartella dei file statici (per esempio js/tutti-widget.js). Non
   modificarlo: si adatta con gli attributi. Se l'indirizzo non risponde, usa
   https://cdn.jsdelivr.net/gh/IsabellaDuc/Tutti-widget@main/tutti-widget.js
   Se non ci riesci da nessuno dei due, non scriverlo a mano: dimmelo, proponi
   gli attributi e fai comunque il controllo del punto 6.
   Scarica anche lo script di prova, in una cartella di appoggio FUORI dal
   sito (non va pubblicato):
   https://raw.githubusercontent.com/IsabellaDuc/Tutti-widget/main/skill/tutti-widget/prova-pannello.mjs
   Serve Node 22 o più recente; lo usi ai punti 3, 5 e 6.

3. Scegli gli attributi (tutti facoltativi, nomi in italiano):
   data-lingua (it | en; se manca segue <html lang>),
   data-posizione (destra | sinistra; sinistra se in basso a destra c'è già
   qualcosa), data-contatto (l'email pubblica del sito; se non c'è, chiedimela),
   data-dichiarazione (solo se esiste una dichiarazione di accessibilità),
   data-accento (un colore chiaro della palette del sito, un pastello o un
   color crema, per il bottone e le scelte accese; non il colore forte del
   marchio, e se non c'è un colore chiaro lascia il predefinito),
   data-inchiostro (il colore scuro del testo del sito, per testo, contorni e
   testata del pannello), data-carattere (la famiglia del testo del sito, solo
   se è caricata in tutte le pagine). Inchiostro su bianco e inchiostro su
   accento devono avere un contrasto di almeno 4,5:1: calcolalo, non stimarlo,
   con node prova-pannello.mjs --contrasto "#1C1D21" "#F4EEA9". Se non ci
   arrivi, lascia i colori predefiniti.

4. Aggiungi la riga nella <head> di ogni pagina (o nel layout comune), il più in
   alto possibile, prima degli altri script, senza defer e senza async:
   <script src="/js/tutti-widget.js" data-posizione="destra" data-contatto="…"></script>
   Usa il percorso giusto per ogni pagina. Nei framework mettila nel layout
   principale o nel file HTML di partenza.

5. Verifica nel browser: node prova-pannello.mjs <cartella del sito>
   (oppure, se le pagine si costruiscono, avvia il server di sviluppo e usa
   node prova-pannello.mjs http://localhost:<porta>/). Lo script trova da solo
   Chrome, Edge o Chromium, apre le pagine senza finestra e controlla il
   caricamento, il bottone, il clic, Alt + Maiusc + A ed Esc, che una scelta
   valga nelle altre pagine, i contrasti e gli errori in console. Se una prova
   dice «NO», correggi e rifalla; se avvisa di aver bloccato file esterni che
   non rispondevano, dimmelo. Se non trova un browser, prova con Playwright
   o Puppeteer se il progetto li ha; altrimenti dimmelo e verifica leggendo il
   codice. Non dirmi che funziona se non l'hai visto funzionare.

6. Controlla l'accessibilità del sito rispetto alle WCAG 2.2 livello AA, per
   intero, su tutti i punti e su tutte le pagine (non una scansione rapida):
   <html lang> e titoli delle pagine; alt delle immagini (vuoto per quelle
   decorative); contrasti calcolati con prova-pannello.mjs --contrasto, prima il
   testo e poi lo sfondo, anche per i colori rgba semitrasparenti (testo
   4,5:1, testo grande 3:1, contorni di campi e bottoni 3:1, anche in hover,
   focus e tema scuro); un h1 per pagina e livelli senza salti; header, nav,
   main, footer e un link «vai al contenuto»; link che si capiscono da soli;
   campi dei moduli con etichetta ed errori chiari; tutto raggiungibile con
   Tab, focus visibile, niente div cliccabili senza ruolo;
   prefers-reduced-motion rispettato e niente che lampeggia; zoom non bloccato
   nel viewport e nessuno scorrimento orizzontale a 320 px; bersagli di almeno
   24 × 24 px; sottotitoli e trascrizioni; ARIA usata bene.
   Fammi un elenco numerato, dal problema più grave al più leggero, con file e
   riga, chi ne ha danno e come si corregge; poi, in breve, i punti che passano
   e quelli che non hai potuto verificare, con il motivo. Non correggere niente
   prima del mio sì.

7. Privacy: il pannello non usa cookie e non manda dati, salva le scelte nel
   localStorage; se c'è Umami registra l'evento «accessibilita». Se il sito ha
   una pagina privacy, proponimi una frase da aggiungere.

8. Alla fine dimmi: dove hai messo il file e la riga, gli attributi scelti e
   perché, cosa hai provato nel browser e con quale esito, come provarlo, il
   resoconto dell'accessibilità e cosa aspetta un mio sì. Non scrivere da
   nessuna parte che il sito è «conforme» grazie al pannello.
```
