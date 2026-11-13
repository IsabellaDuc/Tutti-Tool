# Cosa cambia · Changelog

## 0.4.0 · 13 novembre 2026

1. **Nome nuovo: Tutti widget.** Fino alla 0.3 il pannello si chiamava Tutti Tool. Cambiano il nome del repository (`IsabellaDuc/Tutti-widget`; GitHub rimanda dal vecchio indirizzo), il file (`tutti-widget.js`), il plugin (`wordpress/tutti-widget.zip`) e la skill (`skill/tutti-widget/`). *New name: Tutti widget (formerly Tutti Tool); repository, file, plugin and skill renamed.*
2. **Chi lo ha già non perde niente.** Le righe con `@v0.3.0` continuano a funzionare. Le scelte di chi visita restano: la chiave del salvataggio nel browser è ancora `tutti-tool`. Il plugin nuovo copia le impostazioni di Tutti Tool e, se trova ancora attivo il plugin di prima, non mette un secondo bottone e chiede di toglierlo. *Nothing breaks: `@v0.3.0` lines keep working, visitors keep their choices (storage key still `tutti-tool`), the plugin copies Tutti Tool's settings and avoids a double button.*
3. Il pannello cambia solo nel nome in fondo («Tutti widget · Tutti prompti») e nell'intestazione. *Panel: only the name at the bottom and the header change.*

## 0.3.0 · 30 settembre 2026

1. **Plugin per WordPress** (`wordpress/tutti-tool.zip`): si carica dalla bacheca, si attiva, si regola in Impostazioni → Tutti Tool. Il pannello è servito dal sito stesso; i colori con un contrasto troppo basso vengono rifiutati. *WordPress plugin: upload, activate, set it up in Settings → Tutti Tool.*
2. **Prompt per la chat** (`PROMPT.md`, `PROMPT.en.md`): per chi usa un'IA nel browser e non è del mestiere; guida passo passo per WordPress, Wix, Squarespace, Webflow, Shopify, o prepara l'email per chi gestisce il sito. *A chat prompt for non-technical users.*
3. **Una riga da incollare** con jsDelivr, versione fissa e hash `integrity`, per le piattaforme senza accesso ai file. *A pinned jsDelivr line with SRI for hosted platforms.*
4. **`prova-pannello.mjs`**: prova il pannello in Chrome, Edge o Chromium senza finestra e calcola i contrasti (anche `rgba()`). *Headless test script and contrast calculator.*
5. **Skill e prompt più rigorosi**, dopo un collaudo su sette siti in un container: controllo di accessibilità sempre completo, prova nel browser, contrasti calcolati, accento chiaro. La skill funziona anche in una chat senza accesso ai file. *Stricter skill and prompt; the skill also works in a chat without file access.*
6. **`esempio/index.html`**: una pagina per provare il pannello. *An example page.*
7. `tutti-tool.js`: cambia solo l'intestazione (versione ed esempio). *Header only.*

## 0.2.0 · 29 settembre 2026

Prima versione pubblica: il pannello, il README in italiano e in inglese, il prompt e la skill. *First public version.*
