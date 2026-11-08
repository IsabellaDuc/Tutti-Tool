# Tutti Tool

Un pannello di accessibilità gratuito per siti web, fatto da [Tutti prompti](https://tuttiprompti.it). Sul sito compare un bottone rotondo in un angolo in basso: chi visita lo apre e adatta la pagina a come legge e naviga, con il testo più grande, più spazio tra le righe, più contrasto, un carattere leggibile, le animazioni ferme, la pagina letta ad alta voce.

[Read in English](README.en.md) · Lo vedi al lavoro su [tuttiprompti.it](https://tuttiprompti.it), il bottone in basso a sinistra.

> Tutti Tool aiuta chi legge, ma **non rende un sito conforme** alle norme sull'accessibilità (WCAG, European Accessibility Act) e non va presentato così. Un sito accessibile si ottiene sistemando il sito; per questo i prompt qui sotto, oltre a installare il pannello, ti aiutano a capire cosa correggere.

## Scegli la tua strada

Non serve essere del mestiere. Trova il tuo caso:

1. **Ho un sito WordPress e posso entrare nella bacheca** → [il plugin](#1-wordpress-il-plugin), cinque clic.
2. **Il mio sito è su Wix, Squarespace, Webflow o Shopify** → [una riga da incollare](#2-wix-squarespace-webflow-shopify-una-riga-da-incollare).
3. **Il sito lo gestisce qualcun altro** (un'agenzia, un collaboratore) → [un'email pronta da mandare](#3-il-sito-lo-gestisce-qualcun-altro-unemail-pronta).
4. **Preferisco farmi guidare da un'intelligenza artificiale** (ChatGPT, Claude, Gemini, Copilot, nel browser) → copia il [prompt per la chat](PROMPT.md#1-per-la-chat): ti fa due o tre domande e ti accompagna passo per passo.
5. **Lavoro sui file del sito** (sviluppo, o un assistente come Claude Code o Cursor) → [per chi sviluppa](#per-chi-sviluppa).

### 1. WordPress: il plugin

1. Scarica [tutti-tool.zip](https://github.com/IsabellaDuc/Tutti-Tool/raw/main/wordpress/tutti-tool.zip). Non aprirlo: WordPress lo vuole così com'è.
2. Nella bacheca di WordPress: **Plugin → Aggiungi nuovo → Carica plugin**.
3. **Scegli file**, seleziona `tutti-tool.zip`, poi **Installa ora** e **Attiva**.
4. Vai in **Impostazioni → Tutti Tool**: scegli l'angolo del bottone e l'email per le segnalazioni. I colori puoi lasciarli come sono. Salva.
5. Apri il sito: il bottone è nell'angolo in basso. Se non lo vedi, svuota la cache (il plugin ci prova già da solo con i plugin di cache più diffusi; di solito c'è un bottone «Svuota cache» in alto nella bacheca) e ricarica la pagina.

Il pannello viene servito dal tuo sito stesso: nessun servizio esterno. Se non vedi la voce «Carica plugin», il tuo piano non permette di installare plugin (succede su WordPress.com con i piani più economici): passa alla strada 3 o chiedi a chi ti ha fatto il sito.

### 2. Wix, Squarespace, Webflow, Shopify: una riga da incollare

Queste piattaforme hanno un campo per il «codice personalizzato» che finisce nella testa di tutte le pagine. Di solito serve un piano a pagamento. Ecco la riga; cambia solo l'email:

```html
<script src="https://cdn.jsdelivr.net/gh/IsabellaDuc/Tutti-Tool@v0.3.0/tutti-tool.js" integrity="sha384-3gy4KXgul4X5dtWZvoL87DpyGwRYKhOT2CpFLBPgMSHdYi7Xj4wch2jtLgQX/gp2" crossorigin="anonymous" data-posizione="destra" data-contatto="info@tuosito.it"></script>
```

Dove incollarla (i nomi dei menu cambiano un po' nel tempo: se non li trovi, cerca «codice personalizzato» o «custom code» nell'aiuto della piattaforma):

1. **Wix**: Impostazioni → Codice personalizzato → Aggiungi codice personalizzato. Scegli «Tutte le pagine» e posizionalo in «Head». Serve un piano Premium con un dominio collegato.
2. **Squarespace**: il pannello «Code Injection» (Inserimento di codice), campo **Header**. Piani Core, Plus o Advanced.
3. **Webflow**: Site settings → Custom code → **Head code**, poi pubblica il sito. Serve un piano a pagamento.
4. **Shopify**: Negozio online → Temi → sul tema attivo «…» → **Duplica** (è la tua copia di sicurezza) → di nuovo «…» → Modifica codice → `layout/theme.liquid`: incolla la riga subito sotto `<head>` e salva.

Due cose da sapere:

1. Non cambiare `src` e `integrity`: `integrity` garantisce che il file sia esattamente questo e non un altro.
2. Con questa strada il file arriva da jsDelivr, un servizio esterno che vede l'indirizzo IP di chi visita (come succede con i caratteri di Google o i video incorporati). Va citato nell'informativa privacy; una frase pronta è in [Privacy](#privacy).

### 3. Il sito lo gestisce qualcun altro: un'email pronta

Copia, completa le parti tra parentesi quadre e manda:

> Oggetto: Un pannello di accessibilità sul sito
>
> Ciao [nome],
> vorrei aggiungere al sito [indirizzo del sito] Tutti Tool, un pannello di accessibilità gratuito e open source: https://github.com/IsabellaDuc/Tutti-Tool
>
> - Se il sito è WordPress, basta il plugin: https://github.com/IsabellaDuc/Tutti-Tool/raw/main/wordpress/tutti-tool.zip (Impostazioni → Tutti Tool: angolo [destra/sinistra], email [la nostra email pubblica]).
> - Altrimenti è una riga nella testa di tutte le pagine, con le istruzioni nel README del repository.
>
> Già che ci sei, puoi dirmi anche quali problemi di accessibilità ha il sito (contrasti, testi alternativi delle immagini, uso da tastiera)? Il repository ha un prompt che aiuta a fare questo controllo.
> Grazie, dimmi quando è fatto così lo provo.
>
> [firma]

Se vuoi un'email scritta su misura, usa il [prompt per la chat](PROMPT.md#1-per-la-chat): la prepara lui.

## Cosa trovi nel pannello

1. **Sei profili pronti**: Movimento ridotto, Vista debole, Concentrazione, Lettura facile, Lettura comoda, Tastiera. Ognuno accende un gruppo di regolazioni, che si possono poi cambiare una per una.
2. **Testo**: dimensione, grandezza della pagina, spazio tra righe, lettere e parole, carattere leggibile, titoli e link in evidenza, lente sul testo, allineamento.
3. **Colori**: contrasto scuro, chiaro o più alto; colori più vivi, più tenui o in bianco e nero; colore del testo, dei titoli e dello sfondo.
4. **Per orientarsi**: ferma le animazioni, silenzia i suoni, nascondi le immagini, guida e fascia di lettura, cursore grande, lettura ad alta voce con la voce del dispositivo, modalità lettura, un menu «Vai a…» con i titoli e le zone della pagina.
5. **Il resto**: italiano e inglese, chiaro e scuro, la scorciatoia Alt + Maiusc + A, «Ripristina tutto». Le scelte restano nel browser di chi visita e valgono in tutte le pagine del sito.

Non ha un «profilo per lettori di schermo»: chi usa un lettore di schermo ha già il suo strumento, e cambiare la pagina al posto suo rischia di peggiorare le cose.

## Privacy

Il pannello non usa cookie e non manda dati: le scelte di chi visita restano nel suo browser (`localStorage`). Se sul sito c'è [Umami](https://umami.is), registra quali funzioni si usano (evento `accessibilita`), con le regole di Umami.

Una frase per l'informativa privacy, se usi la riga da incollare (strada 2):

> Il pannello di accessibilità Tutti Tool viene caricato da jsDelivr (cdn.jsdelivr.net), che riceve l'indirizzo IP di chi visita per consegnare il file. Il pannello non usa cookie: le scelte di visualizzazione restano nel browser di chi visita.

Con il plugin per WordPress o con il file sul tuo sito il servizio esterno non c'è; il plugin aggiunge la sua frase nella guida all'informativa di WordPress (Impostazioni → Privacy).

## Per chi sviluppa

### Installarlo a mano

1. Copia [tutti-tool.js](tutti-tool.js) tra i file del sito, per esempio in `js/`. È un solo file, senza librerie.
2. In ogni pagina (o nel layout comune), dentro `<head>` e **prima degli altri script**, senza `defer` né `async`:

```html
<script src="/js/tutti-tool.js" data-posizione="destra" data-contatto="info@esempio.it"></script>
```

Deve partire prima degli altri script perché «Ferma le animazioni» valga anche per le animazioni fatte in JavaScript. Puoi provarlo subito aprendo [esempio/index.html](esempio/index.html) nel browser.

| Attributo | Cosa fa | Se manca |
|---|---|---|
| `data-lingua` | `it` o `en` | segue `<html lang>` |
| `data-posizione` | `destra` o `sinistra`, l'angolo in basso del bottone | `destra` |
| `data-contatto` | l'email per le segnalazioni, in fondo al pannello | nessuna email |
| `data-dichiarazione` | l'indirizzo della dichiarazione di accessibilità | niente bottone |
| `data-accento` | il colore chiaro del bottone e delle scelte accese | `#F4EEA9` |
| `data-inchiostro` | il colore scuro di testo, contorni e testata del pannello | `#1C1D21` |
| `data-carattere` | la famiglia di caratteri del pannello | `"Source Sans 3"` e i caratteri di sistema |
| `data-chiave` | il nome con cui le scelte si salvano nel browser | `tutti-tool` |
| `data-movimento` | `no` per non toccare `matchMedia` (vedi sotto) | `si` |

L'accento deve restare chiaro e l'inchiostro scuro, con un contrasto di almeno 4,5:1 tra i due e tra l'inchiostro e il bianco.

### Con un assistente che lavora sui file

1. **Prompt**: [PROMPT.md](PROMPT.md#2-per-un-assistente-che-lavora-sui-file-del-sito), il secondo. Installa il pannello, lo prova nel browser, controlla l'accessibilità del sito (WCAG 2.2 AA) e fa un resoconto, senza correggere niente prima del tuo sì.
2. **Skill per Claude**: copia la cartella [skill/tutti-tool](skill/tutti-tool) in `~/.claude/skills/` (o in `.claude/skills/` nel progetto), poi chiedi «installa Tutti Tool su questo sito». La skill funziona anche in una chat senza accesso ai file: in quel caso fa da guida, come il prompt per la chat.
3. **Prova automatica**: [skill/tutti-tool/prova-pannello.mjs](skill/tutti-tool/prova-pannello.mjs) (Node 22 o più recente, nessuna libreria) apre le pagine in Chrome, Edge o Chromium senza finestra e controlla caricamento, bottone, clic, tastiera, scelte che passano da una pagina all'altra, contrasti, errori in console: `node prova-pannello.mjs <cartella del sito>` oppure `node prova-pannello.mjs http://localhost:5173/`. Con `--contrasto "#1C1D21" "#F4EEA9"` calcola il contrasto tra due colori (anche `rgba()`).

### Come funziona

1. Il pannello vive in uno Shadow DOM attaccato a `<html>`: i fogli di stile del sito non lo toccano e le regolazioni della pagina non toccano lui.
2. Le regolazioni della pagina sono un foglio di stile che il pannello riscrive a ogni scelta. La dimensione del testo si calcola elemento per elemento, così funziona anche sui siti scritti in pixel.
3. «Ferma le animazioni» ferma le animazioni CSS e i video, e fa rispondere «sì» agli script che chiedono al browser `prefers-reduced-motion`: le animazioni in JavaScript che rispettano quella preferenza si fermano, del tutto dal caricamento successivo della pagina.
4. La lettura ad alta voce usa la sintesi vocale del browser: niente servizi esterni.

### Cosa c'è nel repository

| Percorso | Cosa |
|---|---|
| `tutti-tool.js` | il pannello: l'unico file che serve al sito |
| `wordpress/tutti-tool.zip` | il plugin per WordPress, pronto da caricare |
| `wordpress/tutti-tool/` | il sorgente del plugin (con una copia di `tutti-tool.js`) |
| `PROMPT.md`, `PROMPT.en.md` | i prompt: per la chat e per un assistente che lavora sui file |
| `skill/tutti-tool/` | la skill per Claude, la sua guida per la chat e lo script di prova |
| `esempio/index.html` | una pagina per provare il pannello |
| `CHANGELOG.md` | cosa cambia da una versione all'altra |

Le versioni si fissano con i tag (`v0.3.0`): la riga con jsDelivr e l'hash `integrity` puntano sempre a una versione precisa, mai a `main`.

## Licenza e contatti

MIT: puoi usarlo, modificarlo e ridistribuirlo, anche per lavoro, lasciando il nome dell'autrice. Vedi [LICENSE](LICENSE).

Fatto da Isabella Ducros per [Tutti prompti](https://tuttiprompti.it), corsi sull'IA per chi comincia. Segnalazioni e proposte: le [issue](https://github.com/IsabellaDuc/Tutti-Tool/issues) di questo repository, o scrivi@tuttiprompti.it.
