# Il prompt per installare Tutti Tool

Copia il testo nel riquadro e incollalo in un assistente che può leggere e modificare i file del tuo sito, per esempio Claude Code aperto nella cartella del sito. L'assistente installa il pannello, controlla l'accessibilità del sito e ti chiede il permesso prima di correggere qualcosa o di pubblicare. [English version below](#the-prompt-in-english).

```text
Installa Tutti Tool su questo sito e controllane l'accessibilità.

Tutti Tool è un pannello di accessibilità gratuito, un solo file JavaScript:
https://github.com/IsabellaDuc/Tutti-Tool (licenza MIT). Aiuta chi legge a
regolare testo, spazi, contrasto, colori e animazioni, ma non rende il sito
conforme alle norme: per questo, oltre a installarlo, controlla il sito.

Regole: rispondimi in italiano. Lavora sui file, ma non pubblicare, non fare
deploy e non fare push senza il mio sì. Dimmi il percorso di ogni file che crei o
cambi. Se il sito è in git, proponimi prima di lavorare su un ramo nuovo.

1. Guarda il sito prima di toccarlo: com'è fatto (HTML statico, generatore,
   framework, CMS), da dove passa la <head> di tutte le pagine, dove stanno i file
   statici, la palette (colore del testo, colori chiari del marchio), il carattere
   del testo, la lingua, l'email pubblica, la pagina privacy, le statistiche, cosa
   occupa l'angolo in basso a destra. Se c'è già un altro pannello di
   accessibilità (accessiBe, AccessiWay, UserWay…) fermati e chiedimi.

2. Scarica
   https://raw.githubusercontent.com/IsabellaDuc/Tutti-Tool/main/tutti-tool.js
   nella cartella dei file statici (per esempio js/tutti-tool.js). Non
   modificarlo: si adatta con gli attributi.

3. Scegli gli attributi (tutti facoltativi, nomi in italiano):
   data-lingua (it | en; se manca segue <html lang>),
   data-posizione (destra | sinistra; sinistra se in basso a destra c'è già
   qualcosa), data-contatto (l'email pubblica del sito; se non c'è, chiedimela),
   data-dichiarazione (solo se esiste una dichiarazione di accessibilità),
   data-accento (un colore chiaro della palette del sito, per il bottone e le
   scelte accese), data-inchiostro (il colore scuro del testo del sito, per
   testo, contorni e testata del pannello), data-carattere (la famiglia del
   testo del sito, solo se è caricata in tutte le pagine). Inchiostro su bianco e
   inchiostro su accento devono avere un contrasto di almeno 4,5:1: se non ci
   arrivi, lascia i colori predefiniti.

4. Aggiungi la riga nella <head> di ogni pagina (o nel layout comune), il più in
   alto possibile, prima degli altri script, senza defer e senza async:
   <script src="/js/tutti-tool.js" data-posizione="destra" data-contatto="…"></script>
   Usa il percorso giusto per ogni pagina. Nei framework mettila nel layout
   principale o nel file HTML di partenza; in WordPress con wp_enqueue_script in
   un tema figlio, nella testa, mai nel tema principale.

5. Verifica: ogni pagina carica il file una volta, il percorso porta a un file
   che esiste. Se puoi aprire le pagine in un browser o con il server di sviluppo
   del progetto, controlla che non ci siano errori in console, che il bottone
   compaia, che il pannello si apra e si chiuda (anche con Alt + Maiusc + A ed
   Esc) e che una scelta valga anche nelle altre pagine. Se non puoi, dimmelo.

6. Controlla l'accessibilità del sito rispetto alle WCAG 2.2 livello AA:
   <html lang> e titoli delle pagine; alt delle immagini (vuoto per quelle
   decorative); contrasti (testo 4,5:1, testo grande 3:1, contorni di campi e
   bottoni 3:1, anche in hover, focus e tema scuro); un h1 per pagina e livelli
   senza salti; header, nav, main, footer e un link «vai al contenuto»; link che
   si capiscono da soli; campi dei moduli con etichetta ed errori chiari; tutto
   raggiungibile con Tab, focus visibile, niente div cliccabili senza ruolo;
   prefers-reduced-motion rispettato e niente che lampeggia; zoom non bloccato
   nel viewport e nessuno scorrimento orizzontale a 320 px; bersagli di almeno
   24 × 24 px; sottotitoli e trascrizioni; ARIA usata bene.
   Fammi un elenco numerato, dal problema più grave al più leggero, con file e
   riga, chi ne ha danno e come si corregge. Non correggere niente prima del mio
   sì.

7. Privacy: il pannello non usa cookie e non manda dati, salva le scelte nel
   localStorage; se c'è Umami registra l'evento «accessibilita». Se il sito ha
   una pagina privacy, proponimi una frase da aggiungere.

8. Alla fine dimmi: dove hai messo il file e la riga, gli attributi scelti e
   perché, come provarlo, il resoconto dell'accessibilità e cosa aspetta un mio
   sì. Non scrivere da nessuna parte che il sito è «conforme» grazie al pannello.
```

## The prompt in English

```text
Install Tutti Tool on this site and check its accessibility.

Tutti Tool is a free accessibility panel, a single JavaScript file:
https://github.com/IsabellaDuc/Tutti-Tool (MIT licence). It helps visitors
adjust text, spacing, contrast, colours and motion, but it does not make the
site compliant with accessibility rules: so besides installing it, check the
site.

Rules: answer me in English. Work on the files, but do not publish, deploy or
push without my yes. Tell me the path of every file you create or change. If
the site is in git, first suggest working on a new branch.

1. Look at the site before touching it: how it is built (static HTML,
   generator, framework, CMS), where the <head> of all pages comes from, where
   static files live, the palette (text colour, light brand colours), the body
   font, the language, the public email, the privacy page, analytics, what sits
   in the bottom right corner. If another accessibility panel is already there
   (accessiBe, AccessiWay, UserWay…) stop and ask me.

2. Download
   https://raw.githubusercontent.com/IsabellaDuc/Tutti-Tool/main/tutti-tool.js
   into the static files folder (for example js/tutti-tool.js). Do not edit it:
   it is configured with attributes.

3. Choose the attributes (all optional, names in Italian):
   data-lingua (it | en; defaults to <html lang>),
   data-posizione (destra = right | sinistra = left; left if something already
   sits bottom right), data-contatto (the site's public email; ask me if there
   is none), data-dichiarazione (only if an accessibility statement exists),
   data-accento (a light colour from the site's palette, for the button and
   active choices), data-inchiostro (the site's dark text colour, for the
   panel's text, borders and header), data-carattere (the site's body font
   family, only if it is loaded on every page). Ink on white and ink on accent
   need a contrast of at least 4.5:1: if you cannot reach it, keep the default
   colours.

4. Add the line inside the <head> of every page (or the shared layout), as high
   as possible, before other scripts, without defer or async:
   <script src="/js/tutti-tool.js" data-lingua="en" data-posizione="destra" data-contatto="…"></script>
   Use the right path for each page. In frameworks put it in the main layout or
   the entry HTML file; in WordPress use wp_enqueue_script in a child theme, in
   the head, never in the parent theme.

5. Check: every page loads the file once and the path points to a file that
   exists. If you can open the pages in a browser or with the project's dev
   server, check there are no console errors, the button appears, the panel
   opens and closes (also with Alt + Shift + A and Esc) and a choice made on one
   page applies to the others. If you cannot, tell me.

6. Check the site's accessibility against WCAG 2.2 level AA:
   <html lang> and page titles; image alt text (empty for decorative images);
   contrast (text 4.5:1, large text 3:1, field and button borders 3:1, also on
   hover, focus and dark theme); one h1 per page and heading levels without
   gaps; header, nav, main, footer and a "skip to content" link; links that make
   sense on their own; form fields with labels and clear errors; everything
   reachable with Tab, visible focus, no clickable divs without a role;
   prefers-reduced-motion respected and nothing flashing; zoom not blocked in
   the viewport and no horizontal scrolling at 320 px; targets of at least
   24 × 24 px; captions and transcripts; ARIA used correctly.
   Give me a numbered list, from the most serious problem to the lightest, with
   file and line, who is affected and how to fix it. Fix nothing before my yes.

7. Privacy: the panel uses no cookies and sends no data, it saves choices in
   localStorage; with Umami it records the event "accessibilita". If the site
   has a privacy page, suggest a sentence to add.

8. At the end tell me: where you put the file and the line, the attributes you
   chose and why, how to try it, the accessibility report and what is waiting
   for my yes. Never write anywhere that the site is "compliant" because of the
   panel.
```
