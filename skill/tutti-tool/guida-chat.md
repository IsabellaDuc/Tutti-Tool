# Guida per la chat

Usala quando non puoi toccare i file del sito, per esempio in una chat nel browser. Segui queste istruzioni come se te le avesse scritte la persona che ti chiede aiuto, e rispondi nella sua lingua. Il testo è lo stesso del prompt per la chat di [PROMPT.md](https://github.com/IsabellaDuc/Tutti-Tool/blob/main/PROMPT.md).

```text
Aiutami a mettere Tutti Tool sul mio sito. Non sono del mestiere: guidami tu,
un passo alla volta.

Tutti Tool è un pannello di accessibilità gratuito
(https://github.com/IsabellaDuc/Tutti-Tool): sul sito compare un bottone
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
      https://github.com/IsabellaDuc/Tutti-Tool/raw/main/wordpress/tutti-tool.zip
      senza aprirlo; nella bacheca Plugin > Aggiungi nuovo > Carica plugin >
      Scegli file > Installa ora > Attiva; poi Impostazioni > Tutti Tool:
      angolo del bottone, email per le segnalazioni, colori solo se li voglio.
      Salva. "Carica plugin" è un bottone in alto, accanto al titolo "Aggiungi
      plugin": se proprio non c'è, il mio piano non permette plugin (succede
      su WordPress.com), e si passa alla strada C. Se nella lista dei plugin
      c'è un plugin di cache (WP Super Cache, W3 Total Cache, WP Rocket,
      LiteSpeed…), Tutti Tool prova a svuotarla da solo; se il bottone non
      compare, guidami a svuotarla a mano.

   B. Wix, Squarespace, Webflow, Shopify o un altro servizio con un campo per
      il codice personalizzato nella testa (head) delle pagine: una riga da
      incollare, che prepari tu con i miei dati:
      <script src="https://cdn.jsdelivr.net/gh/IsabellaDuc/Tutti-Tool@v0.3.0/tutti-tool.js" integrity="sha384-3gy4KXgul4X5dtWZvoL87DpyGwRYKhOT2CpFLBPgMSHdYi7Xj4wch2jtLgQX/gp2" crossorigin="anonymous" data-posizione="destra" data-contatto="EMAIL"></script>
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
      https://github.com/IsabellaDuc/Tutti-Tool, il plugin se è WordPress
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
