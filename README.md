# Tutti Tool

Un pannello di accessibilità gratuito per siti web, fatto da [Tutti prompti](https://tuttiprompti.it). Chi visita il sito apre un bottone in un angolo e adatta la pagina a come legge e naviga: testo più grande, più spazio tra le righe, contrasto, un carattere leggibile, animazioni ferme, una guida di lettura, la pagina letta ad alta voce.

[Read in English](README.en.md) · Lo vedi al lavoro su [tuttiprompti.it](https://tuttiprompti.it), il bottone in basso a sinistra.

## Cosa trovi nel pannello

1. **Sei profili pronti**: Movimento ridotto, Vista debole, Concentrazione, Lettura facile, Lettura comoda, Tastiera. Ognuno accende un gruppo di regolazioni, che si possono poi cambiare una per una.
2. **Testo**: dimensione, grandezza della pagina, spazio tra righe, lettere e parole, carattere leggibile, titoli e link in evidenza, lente sul testo, allineamento.
3. **Colori**: contrasto scuro, chiaro o più alto; colori più vivi, più tenui o in bianco e nero; colore del testo, dei titoli e dello sfondo.
4. **Per orientarsi**: ferma le animazioni, silenzia i suoni, nascondi le immagini, guida e fascia di lettura, cursore grande, lettura ad alta voce con la voce del dispositivo, modalità lettura, un menu «Vai a…» con i titoli e le zone della pagina, tasti rapidi.
5. **Il resto**: italiano e inglese, chiaro e scuro, la scorciatoia Alt + Maiusc + A per aprirlo, «Ripristina tutto». Le scelte restano nel browser di chi visita e valgono in tutte le pagine del sito.

## Cosa non fa

Tutti Tool aiuta chi legge, ma non rende un sito conforme alle norme sull'accessibilità (WCAG, European Accessibility Act) e non va presentato così. Un sito accessibile si ottiene sistemando il sito: testi alternativi alle immagini, contrasti sufficienti, titoli in ordine, moduli con le etichette, tutto usabile da tastiera. Per questo il prompt e la skill qui sotto, oltre a installare il pannello, controllano il sito e dicono che cosa va corretto.

Non ha un «profilo per lettori di schermo»: chi usa un lettore di schermo ha già il suo strumento, e cambiare la pagina al posto suo rischia di peggiorare le cose.

## Installarlo con un'IA

Apri [PROMPT.md](PROMPT.md), copia il prompt e incollalo in un assistente che può leggere e modificare i file del tuo sito (per esempio Claude Code, aperto nella cartella del sito). Il prompt scarica il pannello, lo adatta ai colori del sito, lo installa, controlla l'accessibilità del sito e ti fa un resoconto.

Se usi Claude Code spesso, puoi installare la skill: copia la cartella [skill/tutti-tool](skill/tutti-tool) in `~/.claude/skills/` (sul computer) oppure in `.claude/skills/` dentro il progetto. Poi basta chiedere «installa Tutti Tool su questo sito».

## Installarlo a mano

1. Scarica [tutti-tool.js](tutti-tool.js) e mettilo tra i file del sito, per esempio in `js/`.
2. In ogni pagina, dentro `<head>` e prima degli altri script, aggiungi:

```html
<script src="js/tutti-tool.js" data-posizione="destra" data-contatto="tuaemail@esempio.it"></script>
```

Tutti gli attributi sono facoltativi:

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

L'accento deve restare chiaro e l'inchiostro scuro, perché sopra l'accento il pannello scrive con l'inchiostro.

## Come funziona

1. È un solo file JavaScript, senza librerie. Il pannello vive in uno Shadow DOM attaccato a `<html>`: i fogli di stile del sito non lo toccano.
2. Le regolazioni della pagina sono un foglio di stile che il pannello riscrive a ogni scelta. La dimensione del testo si calcola elemento per elemento, così funziona anche sui siti scritti in pixel.
3. «Ferma le animazioni» ferma le animazioni CSS e i video, e fa rispondere «sì» agli script che chiedono al browser `prefers-reduced-motion`: le animazioni fatte in JavaScript che rispettano quella preferenza si fermano, del tutto dal caricamento successivo della pagina.
4. La lettura ad alta voce usa la sintesi vocale del browser: niente servizi esterni.

## Privacy

Il pannello non manda dati a nessuno e non usa cookie. Le scelte restano nel `localStorage` del browser di chi visita. Se sul sito c'è [Umami](https://umami.is), il pannello registra quali funzioni si usano (evento `accessibilita`), con le regole di Umami.

## Licenza

MIT: puoi usarlo, modificarlo e ridistribuirlo, anche per lavoro, lasciando il nome dell'autrice. Vedi [LICENSE](LICENSE).

Fatto da Isabella Ducros per [Tutti prompti](https://tuttiprompti.it), corsi sull'IA per chi comincia. Segnalazioni e proposte: le [issue](https://github.com/IsabellaDuc/Tutti-Tool/issues) di questo repository, o scrivi@tuttiprompti.it.
